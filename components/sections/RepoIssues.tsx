import {ReportSection} from '../../lib/reports'

type Props = ReportSection['data']

export default function RepoIssues(props: Props) {
  // TODO: We also need strongly-typed types for this data (e.g. nullable fields marked as such)
  // TODO: We need the repository information in the output used in https://github.com/bryanmacfarlane/project-reports-action/blob/1a1451ac97f5624e4f534d4b95a7ae1f3e202047/reports/repo-issues.ts#L71-L72
  // TODO: Implement drill-downs

  const issues = props.issues as any[]

  return (
    <>
      <h2>Issues for XXX</h2>

      <table className="TableObject">
        <thead>
          <tr>
            <th>Label</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(issues).map(([label, issue]) => (
            <tr key={issue.number}>
              <td>
                <code>{label}</code>
              </td>

              <td>{issues[label as keyof typeof issues].length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
