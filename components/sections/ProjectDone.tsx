import moment from 'moment'
import {Card, ProjectDoneData} from 'project-reports/project-done'
import {useMemo} from 'react'
import {CellProps, Column, useTable} from 'react-table'
import CardAssignee from '../CardAssignee'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = ProjectDoneData

export default function ProjectDone(props: Props) {
  const cards = props.cards
  const typeLabel = props.cardType === '*' ? '' : props.cardType

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
        Cell: ({cell}: CellProps<Card, {href: string; title: string}>) => (
          <a href={cell.value.href}>{cell.value.title}</a>
        )
      },
      {
        Header: 'Completed',
        id: 'completed',
        accessor: 'project_done_at',
        Cell: ({cell}) => (
          <span suppressHydrationWarning>{moment().to(cell.value)}</span>
        )
      }
    ],
    []
  )

  const table = useTable({columns, data: cards})

  return (
    <>
      <SectionTitle>
        🏁 Completed {typeLabel} Last {props.daysAgo} Days
      </SectionTitle>

      {cards.length ? <Table table={table} /> : `No ${props.cardType}s found`}
    </>
  )
}
