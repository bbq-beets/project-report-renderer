import {Card, ProjectNewData} from 'project-reports/project-new'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import CardAssignee, {getAssignee} from '../CardAssignee'
import {PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'
import TimeAgo from '../TimeAgo'

type Props = PropsWithIndex<ProjectNewData>

export default function ProjectNew(props: Props) {
  const cards = props.cards
  const typeLabel = props.cardType === '*' ? '' : `${props.cardType}`

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
        sortInverted: true,
        Cell: ({cell}) => <TimeAgo dateTime={cell.value} />
      }
    ],
    []
  )

  return (
    <>
      <SectionTitle index={props.index} icon="👋">
        Added in Last {props.daysAgo} Days {typeLabel && `(${typeLabel})`}
      </SectionTitle>

      <Table columns={columns} data={cards} />
    </>
  )
}
