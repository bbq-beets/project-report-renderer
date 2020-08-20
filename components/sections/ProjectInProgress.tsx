import {Card, ProjectInProgressData} from 'project-reports/project-in-progress'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import {getStatusEmoji} from '../../lib/util'
import CardAssignee, {getAssignee} from '../CardAssignee'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = ProjectInProgressData

export default function ProjectInProgress(props: Props) {
  const cards = props.cards

  const lastUpdated = (card: Card) => {
    let lastUpdated = card.lastUpdatedAgo
    if (card.flagHoursLastUpdated) {
      return (lastUpdated += ' 🚩')
    }
    return lastUpdated
  }

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
        Header: 'Status',
        accessor: 'status',
        Cell: ({cell: {value}}) => getStatusEmoji(value)
      },
      {
        Header: 'Previous Status',
        accessor: 'previousStatus',
        Cell: ({cell: {value}}) => getStatusEmoji(value)
      },
      {
        Header: 'Previous Status',
        id: 'prevStatus',
        accessor: row => row.lastUpdatedAgo,
        Cell: ({row}: CellProps<Card, string>) => lastUpdated(row.original)
      },
      {
        Header: 'In Progress',
        accessor: 'inProgressSince'
      }
    ],
    []
  )

  return (
    <>
      <SectionTitle>⏳ In Progress {props.cardType}</SectionTitle>

      <p className="subtitle">
        Sorted by status and then in progress time descending
      </p>

      <Table columns={columns} data={cards} />
    </>
  )
}
