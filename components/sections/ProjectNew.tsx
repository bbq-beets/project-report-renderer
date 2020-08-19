import moment from 'moment'
import {useMemo} from 'react'
import {Column, useTable} from 'react-table'
import {ReportSection} from '../../lib/reports'
import CardAssignee from '../CardAssignee'
import Table from '../Table'

type Props = ReportSection['data']

export default function ProjectNew(props: Props) {
  const cards = props.cards as any[]
  const typeLabel = props.cardType === '*' ? '' : `${props.cardType}s`

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
        Header: 'Added',
        accessor: 'project_added_at',
        Cell: ({cell: {value}}) => moment().to(value)
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
