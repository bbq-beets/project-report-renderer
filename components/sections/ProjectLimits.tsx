import {
  Accepted,
  Done,
  InProgress,
  ProjectLimitsData,
  Proposed
} from 'project-reports/project-limits'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import CardAssignee, {getAssignee} from '../CardAssignee'
import DataWithFlag from '../DataWithFlag'
import NullData from '../NullData'
import {PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = PropsWithIndex<ProjectLimitsData>
type Stage = Proposed | Accepted | InProgress | Done
type StageData = {stage: string; data: Stage}

/**
 * Display project limts as a table.
 *
 * @param props
 */
export default function ProjectLimits(props: Props) {
  const typeLabel = props.cardType === '*' ? '' : props.cardType

  const columns = useMemo<Column<StageData>[]>(
    () => [
      {
        id: 'expander',
        Header: ({getToggleAllRowsExpandedProps, isAllRowsExpanded}) => (
          <span {...getToggleAllRowsExpandedProps()}>
            {isAllRowsExpanded ? '👇' : '👉'}
          </span>
        ),
        Cell: ({row}: CellProps<StageData, null>) => (
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
          </span>
        )
      },
      {
        Header: 'Stage',
        accessor: 'stage'
      },
      {
        Header: 'Count',
        id: 'count',
        accessor: cell => cell.data.items.length,
        Cell: ({row, cell}: CellProps<StageData, number>) => (
          <DataWithFlag flag={row.original.data.flag}>
            {cell.value}
          </DataWithFlag>
        )
      },
      {
        Header: 'Limit',
        id: 'limit',
        accessor: cell => cell.data.limit,
        Cell: ({cell}: CellProps<StageData, number>) =>
          cell.value >= 0 ? cell.value : <NullData />
      }
    ],
    []
  )

  type Issue = StageData['data']['items'][0]

  const data = Object.entries(props.data).map<StageData>(([stage, data]) => ({
    stage,
    data,
    expandContent: () => {
      const columns: Column<Issue>[] = [
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
              .map(label => label.name)
              .sort()
              .join(','),
          Cell: ({row}: CellProps<Issue, string>) => (
            <ul>
              {row.original.labels.map(label => (
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
      ]

      return (
        <Table columns={columns} data={data.items} empty={<p>No issues.</p>} />
      )
    }
  }))

  return (
    <>
      <SectionTitle index={props.index} icon="🚢">
        Limits {typeLabel && `(${typeLabel})`}
      </SectionTitle>

      <Table
        columns={columns}
        data={data}
        empty={<p>No limits configured.</p>}
        expanded
      />
    </>
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
