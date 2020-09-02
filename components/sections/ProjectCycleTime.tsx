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
  const chartData = Object.entries(props)
    .sort(([aKey], [bKey]) => (aKey > bKey ? -1 : 1))
    .filter(([key]) => key !== 'index') // Omit the "index" prop
    .map(([date, output]) => ({
      date: new Date(date).toLocaleDateString(),
      'Average Cycle Time': round(output.averageCycleTime),
      flag: output.flag
    }))

  return (
    <>
      <SectionTitle index={props.index} icon="🔄">
        Cycle Time
      </SectionTitle>

      <div className="overflow-x-scroll">
        <BarChart
          layout="vertical"
          width={730}
          height={250}
          data={chartData}
          barSize={16}
          margin={{left: 34}}
        >
          <XAxis
            type="number"
            padding={{left: 0, right: 36}}
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
