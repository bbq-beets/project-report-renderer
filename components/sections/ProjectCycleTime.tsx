import classnames from 'classnames'
import {ProjectCycleTimeData} from 'project-reports/project-cycle-time'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  RectangleProps,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import {PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'

type Props = PropsWithIndex<ProjectCycleTimeData>

/**
 * Display project cycle time as a table.
 *
 * @param props
 */
export default function ProjectCycleTime(props: Props) {
  const chartData = Object.entries(props.output)
    .sort(([aKey], [bKey]) => (aKey > bKey ? -1 : 1))
    .filter(([key]) => key !== 'index') // Omit the "index" prop
    .map(([date, output]) => ({
      date: new Date(date).toLocaleDateString(),
      'Average Cycle Time': round(output.averageCycleTime),
      flag: output.flag
    }))

  const domain = getDomain(
    chartData.map(datum => datum['Average Cycle Time']),
    5
  )

  return (
    <>
      <SectionTitle index={props.index} icon="🔄">
        Cycle Time
      </SectionTitle>

      <div className="overflow-x-scroll">
        <BarChart
          layout="vertical"
          width={730}
          height={chartData.length * 42} // Just based on what looks OK
          data={chartData}
          barSize={16}
          margin={{left: 34}}
        >
          <XAxis
            type="number"
            padding={{left: 0, right: 48}}
            domain={domain}
            dy={10}
            tick={{fontSize: 12}}
          />
          <YAxis
            type="category"
            dataKey="date"
            dx={-10}
            tick={{fontSize: 12}}
          />
          <CartesianGrid strokeDasharray="2 3" />
          <Tooltip cursor={{fill: '#d1d5da', opacity: 0.4}} />
          <Bar
            isAnimationActive={false} // This prevents a bug where labels do not show up.
            dataKey="Average Cycle Time"
            shape={CustomBar}
            label={{
              fontSize: '12',
              position: 'right',
              className: 'text-gray-600 fill-current'
            }}
          />
        </BarChart>
      </div>
    </>
  )
}

/**
 * Get the domain for the chart—it sets a max equal to the highest multiple of
 * `domainMaxWindow` above the maximum value.
 */
function getDomain(
  values: number[],
  domainMaxWindow: number
): [number, number] {
  const domainMax =
    Math.ceil(Math.max(...values) / domainMaxWindow) * domainMaxWindow

  return [0, domainMax]
}

function round(value: number): number {
  return Number(Math.round(Number(`${value}e2`)) + 'e-2')
}

function CustomBar(props: RectangleProps & {flag?: boolean}) {
  const className = classnames({
    'text-red-500': props.flag,
    'text-green-500': !props.flag,
    'fill-current': true
  })

  return <Rectangle {...props} className={className} />
}
