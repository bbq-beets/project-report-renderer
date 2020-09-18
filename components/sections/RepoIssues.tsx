import classnames from 'classnames'
import {Bug, RepoIssuesData} from 'project-reports/repo-issues'
import {useMemo} from 'react'
import {Cell, CellProps, Column, useSortBy} from 'react-table'
import DataWithFlag from '../DataWithFlag'
import IssuesTable from '../IssuesTable'
import {ProjectBaseConfig, PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'
import tableStyles from '../Table.module.css'

type Props = PropsWithIndex<RepoIssuesData, ProjectBaseConfig>
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

  const issues = props.output.issues

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

  const repoIssues = props.output.repositories.map((nwo, i, nwos) => (
    <>
      <a key={nwo} href={`https://github.com/${nwo}`} className="text-blue-400">
        {nwo}
      </a>
      {i === nwos.length - 2 ? ' and ' : i < nwos.length - 1 ? ', ' : ''}
    </>
  ))

  return (
    <>
      <SectionTitle index={props.index} asof={props.config._asof}>
        Issues for {repoIssues}
      </SectionTitle>
      <Table columns={columns} data={data} empty={<p>No issues.</p>} />
    </>
  )
}
