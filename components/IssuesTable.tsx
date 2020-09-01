import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import CardAssignee, {getAssignee} from './CardAssignee'
import Table from './Table'

type Issue = any

type Props = {
  issues: Issue[]
}

export default function IssuesTable(props: Props) {
  const columns = useMemo<Column<Issue>[]>(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({row, cell}: CellProps<Issue, string>) => (
          <a href={row.original.html_url} className="font-semibold underline">
            {cell.value}
          </a>
        )
      },
      {
        Header: 'Assignee',
        id: 'assignee',
        accessor: cell => getAssignee(cell)?.login,
        Cell: ({row}: CellProps<Issue, string>) => (
          <CardAssignee card={row.original} />
        )
      },
      {
        Header: 'Labels',
        id: 'labels',
        accessor: cell =>
          cell.labels
            .map((label: any) => label.name)
            .sort()
            .join(','),
        Cell: ({row}: CellProps<Issue, string>) => (
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
      }
    ],
    []
  )

  return (
    <Table columns={columns} data={props.issues} empty={<p>No issues.</p>} />
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
