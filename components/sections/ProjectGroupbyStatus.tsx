import {
  ProjectGroupbyStatusData,
  Total
} from 'project-reports/project-groupby-status'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import DataWithFlag from '../DataWithFlag'
import NullData from '../NullData'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = ProjectGroupbyStatusData
type StatusGroup = {key: string; group: Total}

const TOTAL_KEY = 'Total'

export default function ProjectGroupbyStatus(props: Props) {
  const groups = Object.entries(props.groups).map(([key, group]) => ({
    key,
    group
  }))

  groups.push({
    key: TOTAL_KEY,
    group: props.total
  })

  // TODO: What do yellow/red hearts actually mean?

  const columns = useMemo<Column<StatusGroup>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'key'
      },
      {
        Header: 'Limit',
        id: 'limit',
        accessor: row => row.group.stages.inProgressLimits.limit,
        Cell: ({row, cell}: CellProps<StatusGroup, number | null>) => {
          // We don't display total for the "Total" row, it's considered
          // meaningless.
          if (row.original.key === TOTAL_KEY) {
            return <NullData />
          }

          return cell.value ?? <NullData />
        }
      },
      {
        Header: 'Proposed',
        id: 'proposed',
        accessor: row => row.group.stages.proposed.length
      },
      {
        Header: 'Accepted',
        id: 'accepted',
        accessor: row => row.group.stages.accepted.length
      },
      {
        Header: 'In Progress',
        id: 'inProgress',
        accessor: row => row.group.stages.inProgress.length,
        Cell: ({row, cell}: CellProps<StatusGroup, number | null>) => (
          <DataWithFlag flag={row.original.group.stages.inProgressLimits.flag}>
            {cell.value}
          </DataWithFlag>
        )
      },
      {
        Header: 'Done',
        id: 'done',
        accessor: row => row.group.stages.done.length
      },
      {
        Header: '💛',
        id: 'yellow',
        accessor: row => row.group.flagged.yellow.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      },
      {
        Header: '❤️',
        id: 'red',
        accessor: row => row.group.flagged.red.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      },
      {
        Header: 'Active > 3 wks',
        id: 'activeGt3Wk',
        accessor: row => row.group.flagged.inProgressDuration.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      },
      {
        Header: 'No Target Date',
        id: 'noTarget',
        accessor: row => row.group.flagged.noTarget.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      },
      {
        Header: 'Past Target Date',
        id: 'pastTarget',
        accessor: row => row.group.flagged.pastTarget.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      }
    ],
    []
  )
  return (
    <>
      <SectionTitle icon="🚀">Project Execution</SectionTitle>
      <Table columns={columns} data={groups} />
    </>
  )
}
