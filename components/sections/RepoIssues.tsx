import classnames from 'classnames'
import {Bug, RepoIssuesData} from 'project-reports/repo-issues'
import {useMemo} from 'react'
import {Cell, CellProps, Column, useSortBy} from 'react-table'
import DataWithFlag from '../DataWithFlag'
import IssuesTable from '../IssuesTable'
import {PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'
import tableStyles from '../Table.module.css'

type Props = PropsWithIndex<RepoIssuesData>
type LabelData = {label: string; data: Bug[]}

/**
 * Display repository issues as a table.
 *
 * @param props
 */
export default function RepoIssues(props: Props) {
  // TODO: We also need strongly-typed types for this data (e.g. nullable fields marked as such)
  // TODO: We need the repository information in the output used in https://github.com/bryanmacfarlane/project-reports-action/blob/1a1451ac97f5624e4f534d4b95a7ae1f3e202047/reports/repo-issues.ts#L71-L72
  // TODO: Implement drill-downs

  const issues = props.issues

  const columns: Array<Column<LabelData>> = useMemo(
    () => [
      {
        Header: 'Label',
        accessor: 'label',
        Cell: ({cell: {value}}) => <code>{value}</code>
      },
      {
        Header: 'Count',
        id: 'count',
        accessor: row => row.data.length,
        cellClassName: (cell: Cell<LabelData>) =>
          classnames({[tableStyles.expanded]: cell.row.isExpanded}),
        Cell: ({row, cell}: CellProps<LabelData, number>) => (
          <DataWithFlag>
            {cell.value ? (
              <span
                onClick={() => row.toggleRowExpanded()}
                className={tableStyles.expander}
              >
                {cell.value}
              </span>
            ) : null}
          </DataWithFlag>
        )
      }
    ],
    []
  )

  const data: LabelData[] = Object.entries(issues).map(
    ([label, data]) => ({
      label,
      data,
      expandContent: () => {
        return <IssuesTable issues={data} />
      }
    }),
    useSortBy
  )

  return (
    <>
      <SectionTitle index={props.index}>Issues for XXX</SectionTitle>
      <Table columns={columns} data={data} empty={<p>No issues.</p>} />
    </>
  )
}
