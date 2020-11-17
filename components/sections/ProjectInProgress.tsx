import { Card, ProjectInProgressData } from 'project-reports/project-in-progress'
import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'
import { getStatusEmoji } from '../../lib/util'
import CardAssignee, { getAssignee } from '../CardAssignee'
import DataWithFlag from '../DataWithFlag'
import { ProjectBaseConfig, PropsWithIndex } from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'
import TargetDate from '../TargetDate'
import TimeAgo from '../TimeAgo'

type Props = PropsWithIndex<ProjectInProgressData, ProjectBaseConfig>

/**
 * Display projects in progress as a table.
 *
 * @param props
 */
export default function ProjectInProgress(props: Props) {
  const cards = props.output.cards

  const columns = useMemo<Column<Card>[]>(
    () => [
      {
        Header: 'Assignee',
        id: 'assignee',
        accessor: row => getAssignee(row)?.login,
        Cell: ({ row }: CellProps<Card, string>) => (
          <CardAssignee card={row.original} />
        )
      },
      {
        Header: 'Title',
        id: 'title',
        accessor: row => row.title,
        Cell: ({ row, cell }: CellProps<Card, string>) => (
          <a href={row.original.html_url}>{cell.value}</a>
        )
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => getStatusEmoji(value)
      },
      {
        Header: 'Previous Status',
        accessor: 'previousStatus',
        Cell: ({ cell: { value } }) => getStatusEmoji(value)
      },
      {
        Header: 'Last Update',
        id: 'lastUpdate',
        accessor: 'lastUpdatedAt',
        sortInverted: true,
        Cell: ({ row, cell }: CellProps<Card, string>) => (
          <DataWithFlag flag={row.original.flagHoursLastUpdated}>
            {cell.value ? <TimeAgo dateTime={cell.value} /> : null}
          </DataWithFlag>
        )
      },
      {
        Header: 'In Progress',
        accessor: 'project_in_progress_at',
        sortInverted: true,
        Cell: ({ cell }) => <TimeAgo dateTime={cell.value} />
      },
      {
        Header: 'Target Date',
        accessor: 'project_target_date',
        Cell: ({ cell }) => <TargetDate targetDate={cell.value} />
      }
    ],
    []
  )

  return (
    <>
      <SectionTitle index={props.index} icon="⏳" asof={props.config._asof}>
        In Progress ({props.output.cardType})
      </SectionTitle>

      <p className="subtitle">
        Sorted by status and then in progress time descending
      </p>

      <Table
        columns={columns}
        data={cards}
        empty={<p>No issues to report on.</p>}
      />
    </>
  )
}
