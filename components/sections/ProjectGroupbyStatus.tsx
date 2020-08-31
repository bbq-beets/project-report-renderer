import {
  ProjectGroupbyStatusData,
  Total
} from 'project-reports/project-groupby-status'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import DataWithFlag from '../DataWithFlag'
import NullData from '../NullData'
import ReportCard from '../ReportCard'
import {PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = PropsWithIndex<ProjectGroupbyStatusData>
type StatusGroup = {key: string; totals: Total}

const TOTAL_KEY = 'Total'

/**
 * Display projects grouped by status as a "report card" style view.
 *
 * @param props
 */
export default function ProjectGroupbyStatus(props: Props) {
  const groups: StatusGroup[] = Object.entries(props.groups).map(
    ([key, group]) => ({
      key,
      totals: group
    })
  )

  const totals = {
    key: TOTAL_KEY,
    totals: props.total
  }

  const tableGroups = [...groups, totals]

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
        accessor: row => row.totals.stages.inProgressLimits.limit,
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
        accessor: row => row.totals.stages.proposed.length
      },
      {
        Header: 'Accepted',
        id: 'accepted',
        accessor: row => row.totals.stages.accepted.length
      },
      {
        Header: 'In Progress',
        id: 'inProgress',
        accessor: row => row.totals.stages.inProgress.length,
        Cell: ({row, cell}: CellProps<StatusGroup, number | null>) => (
          <DataWithFlag flag={row.original.totals.stages.inProgressLimits.flag}>
            {cell.value}
          </DataWithFlag>
        )
      },
      {
        Header: 'Done',
        id: 'done',
        accessor: row => row.totals.stages.done.length
      },
      {
        Header: '💛',
        id: 'yellow',
        accessor: row => row.totals.flagged.yellow.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      },
      {
        Header: '❤️',
        id: 'red',
        accessor: row => row.totals.flagged.red.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      },
      {
        Header: 'Active > 3 wks',
        id: 'activeGt3Wk',
        accessor: row => row.totals.flagged.inProgressDuration.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      },
      {
        Header: 'No Target Date',
        id: 'noTarget',
        accessor: row => row.totals.flagged.noTarget.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      },
      {
        Header: 'Past Target Date',
        id: 'pastTarget',
        accessor: row => row.totals.flagged.pastTarget.length,
        Cell: ({cell}: CellProps<StatusGroup, number | null>) =>
          cell.value ?? <NullData />
      }
    ],
    []
  )
  return (
    <>
      <SectionTitle index={props.index} icon="🚀">
        Project Execution
      </SectionTitle>

      {groups.map(group => (
        <div className="block lg:flex items-start mb-8" key={group.key}>
          <h1 className="w-56 mb-2 text-xl font-semibold mr-2">{group.key}</h1>

          <ReportCard
            proposed={group.totals.stages.proposed.length}
            accepted={group.totals.stages.accepted.length}
            inProgress={group.totals.stages.inProgress.length}
            done={group.totals.stages.done.length}
            warn={group.totals.flagged.yellow.length}
            alert={group.totals.flagged.red.length}
            activeGt3Wk={group.totals.flagged.inProgressDuration.length}
            noTarget={group.totals.flagged.noTarget.length}
            pastTarget={group.totals.flagged.pastTarget.length}
            totals={{
              proposed: totals.totals.stages.proposed.length,
              accepted: totals.totals.stages.accepted.length,
              inProgress: totals.totals.stages.inProgress.length,
              done: totals.totals.stages.done.length,
              warn: totals.totals.flagged.yellow.length,
              alert: totals.totals.flagged.red.length,
              activeGt3Wk: totals.totals.flagged.inProgressDuration.length,
              noTarget: totals.totals.flagged.noTarget.length,
              pastTarget: totals.totals.flagged.pastTarget.length
            }}
          />
        </div>
      ))}
      <Table columns={columns} data={tableGroups} />
    </>
  )
}
