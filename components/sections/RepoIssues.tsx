import {useMemo} from 'react'
import {Column, useTable} from 'react-table'
import {ReportSection} from '../../lib/reports'
import Table from '../Table'

type Props = ReportSection['data']

export default function RepoIssues(props: Props) {
  // TODO: We also need strongly-typed types for this data (e.g. nullable fields marked as such)
  // TODO: We need the repository information in the output used in https://github.com/bryanmacfarlane/project-reports-action/blob/1a1451ac97f5624e4f534d4b95a7ae1f3e202047/reports/repo-issues.ts#L71-L72
  // TODO: Implement drill-downs

  const issues = props.issues as any[]

  const columns: Array<Column<any>> = useMemo(
    () => [
      {
        Header: 'Label',
        accessor: 'label',
        Cell: ({cell: {value}}) => <code>{value}</code>
      },
      {
        Header: 'Count',
        accessor: (row: any) => row,
        Cell: ({data, cell: {value}}) => {
          return data
            .filter(datum => datum.data.length)
            .filter(datum => datum.label === value.label).length
        }
      }
    ],
    []
  )

  const data = Object.entries(issues).map(([label, data]) => ({
    label,
    data
  })) as any[]

  const table = useTable({columns, data})

  return (
    <>
      <h2>Issues for XXX</h2>

      <Table table={table} />
    </>
  )
}
