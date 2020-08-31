import {Card, ProjectDoneData} from 'project-reports/project-done'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import CardAssignee, {getAssignee} from '../CardAssignee'
import {PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'
import TimeAgo from '../TimeAgo'

type Props = PropsWithIndex<ProjectDoneData>

/**
 * Display completed projects as a table.
 *
 * @param props
 */
export default function ProjectDone(props: Props) {
  const cards = props.cards
  const typeLabel = props.cardType === '*' ? '' : props.cardType

  const columns = useMemo<Column<Card>[]>(
    () => [
      {
        Header: 'Assignee',
        id: 'assignee',
        accessor: row => getAssignee(row)?.login,
        Cell: ({row}: CellProps<Card, string>) => (
          <CardAssignee card={row.original} />
        )
      },
      {
        Header: 'Title',
        id: 'title',
        accessor: row => row.title,
        Cell: ({row, cell}: CellProps<Card, string>) => (
          <a href={row.original.html_url}>{cell.value}</a>
        )
      },
      {
        Header: 'Completed',
        id: 'completed',
        accessor: 'project_done_at',
        sortInverted: true,
        Cell: ({cell}) => <TimeAgo dateTime={cell.value} />
      }
    ],
    []
  )

  return (
    <>
      <SectionTitle index={props.index} icon="🏁">
        Completed in Last {props.daysAgo} Days {typeLabel && `(${typeLabel})`}
      </SectionTitle>

      {cards.length ? (
        <Table columns={columns} data={cards} />
      ) : (
        `No ${props.cardType}s found`
      )}
    </>
  )
}
