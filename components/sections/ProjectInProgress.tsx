import {Card, ProjectInProgressData} from 'project-reports/project-in-progress'
import {useMemo} from 'react'
import {CellProps, Column, useTable} from 'react-table'
import {getStatusEmoji} from '../../lib/util'
import CardAssignee from '../CardAssignee'
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
        accessor: row => row,
        Cell: ({cell}: CellProps<Card, Card>) => (
          <CardAssignee card={cell.value} />
        )
      },
      {
        Header: 'Title',
        id: 'title',
        accessor: row => ({href: row.html_url, title: row.title}),
        Cell: ({cell}: CellProps<Card, {href: string; title: string}>) => {
          return <a href={cell.value.href}>{cell.value.title}</a>
        }
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
        accessor: row => row,
        Cell: (props: CellProps<Card, Card>) => lastUpdated(props.cell.value)
      },
      {
        Header: 'In Progress',
        accessor: 'inProgressSince'
      }
    ],
    []
  )

  const table = useTable({columns, data: cards})

  return (
    <>
      <SectionTitle>⏳ In Progress {props.cardType}</SectionTitle>

      <p>Sorted by status and then in progress time descending</p>

      <Table table={table} />
    </>
  )
}
