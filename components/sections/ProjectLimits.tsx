import {ReportSection} from '../../lib/reports'

type Props = ReportSection['data']

export default function ProjectLimits(props: Props) {
  const data: Record<string, any> = props.data as any
  const typeLabel = props.cardType === '*' ? '' : props.cardType

  return (
    <>
      <h2>🚢 {typeLabel} Limits</h2>

      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Count</th>
            <th>Limit</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(data).map(([stageName, stage]) => (
            <tr key={stageName}>
              <td>{stageName}</td>
              <td>
                {stage.items.length}
                {stage.flag && ' 🚩'}
              </td>
              <td>{stage.limit >= 0 ? stage.limit : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
