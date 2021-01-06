import {Card} from 'project-reports'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import CardAssignee, {getAssignee} from './CardAssignee'
import ReportDate from './ReportDate'
import Table from './Table'
import TaskCompletion from './TaskCompletion'

type Props = {
  issues: Card[]
  showTargetDate: boolean
}

export default function IssuesTable(props: Props) {
  const columns = useMemo<Column<Card>[]>(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        className: 'w-96',
        Cell: ({row, cell}: CellProps<Card, string>) => (
          <a href={row.original.html_url} className="font-semibold underline">
            {cell.value}
          </a>
        )
      },
      {
        Header: 'Assignee',
        id: 'assignee',
        className: 'w-64',
        accessor: cell => getAssignee(cell)?.login,
        Cell: ({row}: CellProps<Card, string>) => (
          <CardAssignee card={row.original} />
        )
      },
      {
        Header: 'Labels',
        id: 'labels',
        className: 'w-64',
        accessor: cell =>
          cell.labels
            .map((label: any) => label.name)
            .sort()
            .join(','),
        Cell: ({row}: CellProps<Card, string>) => (
          <ul>
            {row.original.labels.map((label: any) => (
              <li
                key={label.id}
                className="inline-block text-sm px-1 rounded-sm mr-1 shadow-xs"
                style={{
                  backgroundColor: `#${label.color}`,
                  color: getTextColor(label.color)
                }}
              >
                {label.name}
              </li>
            ))}
          </ul>
        ),
        defaultCanSort: false
      },
      {
        Header: 'Tasks',
        id: 'taskCompletiton',
        accessor: 'body',
        className: 'w-32',
        Cell: ({row, cell}: CellProps<Card, string>) => (
          <TaskCompletion body={cell.value} />
        )
      },
      {
        Header: 'Start Date',
        id: 'startDate',
        accessor: 'project_in_progress_at',
        className: 'w-32',
        Cell: ({row, cell}: CellProps<Card, Date>) => (
          <ReportDate targetDate={cell.value} />
        )
      },
      {
        Header: 'Target Date',
        id: 'targetDate',
        accessor: 'project_target_date',
        className: 'w-32',
        Cell: ({row, cell}: CellProps<Card, Date>) => (
          <ReportDate targetDate={cell.value} />
        )
      }
    ],
    [props.showTargetDate]
  )

  let initialState = undefined
  if (!props.showTargetDate) {
    initialState = {hiddenColumns: ['targetDate', 'startDate']}
  }

  return (
    <Table
      columns={columns}
      data={props.issues}
      initialState={initialState}
      empty={<p>No issues.</p>}
      fixed
      constrainHeight
    />
  )
}

// https://stackoverflow.com/a/3943023
function getTextColor(bgColor: string) {
  const parts = /^(.{2})(.{2})(.{2})$/
  const match = bgColor.match(parts)

  if (!match) {
    return `#000`
  }

  const [r, g, b] = match.slice(1).map(part => parseInt(part, 16))

  if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
    return undefined
  } else {
    return '#fff'
  }
}
