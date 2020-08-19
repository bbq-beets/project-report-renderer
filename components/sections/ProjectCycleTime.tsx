import {ReportSection} from '../../lib/reports'

type Props = ReportSection['data']

export default function ProjectCycleTime(props: Props) {
  const cycleData: {[key: string]: any} = props

  const getCycleTime = (cycleTime: number) => {
    return cycleTime ? cycleTime.toFixed(2) : ''
  }

  const getLimit = (limit: number) => (limit >= 0 ? `${limit}` : '')

  return (
    <>
      <h2>Issue Count and Cycle Time</h2>

      <table>
        <thead>
          <tr>
            <th>Labels</th>
            <th>Count</th>
            <th>Cycle Time (days)</th>
            <th>Limit</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(cycleData).map(([label, data]) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{data.count}</td>
              <td>
                {getCycleTime(data.cycletime)}&nbsp;{data.flag && '🚩'}
              </td>
              <td>{getLimit(data.limit)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
