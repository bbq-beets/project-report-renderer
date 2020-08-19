import moment from 'moment'
import {Card, ProjectNewData} from 'project-reports/project-new'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import CardAssignee, {getAssignee} from '../CardAssignee'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = ProjectNewData

export default function ProjectNew(props: Props) {
  const cards = props.cards
  const typeLabel = props.cardType === '*' ? '' : `${props.cardType}s`

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
        Header: 'Added',
        accessor: 'project_added_at',
        Cell: ({cell: {value}}) => (
          <span suppressHydrationWarning>{moment().to(value)}</span>
        )
      }
    ],
    []
  )

  return (
    <>
      <SectionTitle>
        👋 Added {typeLabel} Last {props.daysAgo} Days
      </SectionTitle>

      <Table columns={columns} data={cards} />
    </>
  )
}
