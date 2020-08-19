import moment from 'moment'
import {Card, ProjectNewData} from 'project-reports/project-new'
import {useMemo} from 'react'
import {CellProps, Column, useTable} from 'react-table'
import CardAssignee from '../CardAssignee'
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
        Header: 'Added',
        accessor: 'project_added_at',
        Cell: ({cell: {value}}) => (
          <span suppressHydrationWarning>{moment().to(value)}</span>
        )
      }
    ],
    []
  )

  const table = useTable({columns, data: cards})

  return (
    <>
      <h2>
        👋 Added {typeLabel} Last {props.daysAgo} Days
      </h2>

      <Table table={table} />
    </>
  )
}
