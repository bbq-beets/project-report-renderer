import {useMemo} from 'react'
import {Column, useTable} from 'react-table'
import {ReportSection} from '../../lib/reports'
import {getStatusEmoji} from '../../lib/util'
import CardAssignee from '../CardAssignee'
import Table from '../Table'

type Props = ReportSection['data']

export default function ProjectInProgress(props: Props) {
  const cards = props.cards as any[]

  const lastUpdated = (card: any) => {
    let lastUpdated = card.lastUpdatedAgo
    if (card.flagLastHoursUpdated) {
      return (lastUpdated += ' 🚩')
    }
    return lastUpdated
  }

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: 'Assignee',
        accessor: row => row,
        Cell: props => <CardAssignee card={props.cell.value} />
      },
      {
        Header: 'Title',
        accessor: (row: any) => ({href: row.html_url, title: row.title}),
        Cell: ({cell: {value}}) => {
          return <a href={value.href}>{value.title}</a>
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
        accessor: (row: any) => row,
        Cell: ({cell: {value}}) => lastUpdated(value)
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
      <h2>⏳ In Progress {props.cardType}</h2>

      <p>Sorted by status and then in progress time descending</p>

      <Table table={table} />
    </>
  )
}
