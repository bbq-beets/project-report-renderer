import {
  ProjectCycleTimeConfig,
  ProjectCycleTimeData
} from 'project-reports/project-cycle-time'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import {PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'

type Props = PropsWithIndex<ProjectCycleTimeData, ProjectCycleTimeConfig>

/**
 * Display project cycle time as a table.
 *
 * @param props
 */
export default function ProjectCycleTime(props: Props) {
  const chartData = Object.entries(props.output)
    .sort(([aKey], [bKey]) => (aKey < bKey ? -1 : 1))
    .map(([date, output]) => ({
      date: new Date(date).toLocaleDateString(),
      Average: round(output.averageCycleTime),
      '80th Percentile': round(output.eightiethCycleTime),
      limit: props.config.limit,
      flag: output.flag
    }))

  return (
    <>
      <SectionTitle index={props.index} icon="🔄">
        {props.config['report-on-label']} Cycle Time
      </SectionTitle>

      <div className="mb-8 pb-2">
        Rolling {props.config['window-days']} day window
      </div>

      <div className="overflow-x-scroll">
        <ComposedChart
          width={730}
          height={chartData.length * 100} // Just based on what looks OK
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" interval="preserveEnd" />
          <YAxis interval="preserveEnd" />
          <Tooltip />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="Average"
            stroke="#8884d8"
            activeDot={{
              r: 8
            }}
          />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="80th Percentile"
            stroke="#82ca9d"
            activeDot={{
              r: 8
            }}
          />
          <Area
            type="monotone"
            dataKey="limit"
            fill="#dddddd"
            stroke="#8884d8"
          />
        </ComposedChart>
      </div>
    </>
  )
}

function round(value: number): number {
  return Number(Math.round(Number(`${value}e2`)) + 'e-2')
}
