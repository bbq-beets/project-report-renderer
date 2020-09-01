import {
  ProjectGroupbyStatusData,
  Total
} from 'project-reports/project-groupby-status'
import {PropsWithChildren, useMemo} from 'react'
import {CellProps, Column, Row} from 'react-table'
import DataWithFlag from '../DataWithFlag'
import IssuesTable from '../IssuesTable'
import NullData from '../NullData'
import ReportCard from '../ReportCard'
import {PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = PropsWithIndex<ProjectGroupbyStatusData>
type StatusGroup = {key: string; totals: Total}

enum StageType {
  Flagged = 'flagged',
  Stages = 'stages'
}

type StageKey<T extends StageType = StageType> = keyof Omit<
  StatusGroup['totals'][T],
  'inProgressLimits'
>

type RowState<T extends StageType = StageType> = {
  stageType: T
  stageKey: StageKey<T>
}

const TOTAL_KEY = 'Total'

function getIssues(
  group: StatusGroup,
  type: StageType.Flagged,
  key: StageKey<StageType.Flagged>
): any[]
function getIssues(
  group: StatusGroup,
  type: StageType.Stages,
  key: StageKey<StageType.Stages>
): any[]
function getIssues(
  group: StatusGroup,
  type: StageType.Stages | StageType.Flagged,
  key: StageKey<StageType.Stages> | StageKey<StageType.Flagged>
): any[] {
  return (group.totals as any)[type][key]
}

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

  const toggle = <T extends StageType>(
    row: Row<StatusGroup>,
    stageType: T,
    stageKey: StageKey<T>
  ) => {
    const currentStageType = row.state.stageType
    const currentStageKey = row.state.stageKey

    row.setState((state: RowState) => ({...state, stageType, stageKey}))

    if (
      row.isExpanded &&
      (currentStageType !== stageType || currentStageKey !== stageKey)
    ) {
      return
    }

    row.toggleRowExpanded()
  }

  const totals = {
    key: TOTAL_KEY,
    totals: props.total
  }

  const tableGroups: StatusGroup[] = [...groups, totals].map(group => {
    return {
      ...group,
      expandContent: (props: {row: Row<StatusGroup>}) => {
        const rowState = props.row.state as RowState<StageType.Stages>

        return (
          <IssuesTable
            issues={getIssues(group, rowState.stageType, rowState.stageKey)}
          />
        )
      }
    }
  })

  // TODO: What do yellow/red hearts actually mean?

  const RowExpander = <T extends StageType>(
    props: PropsWithChildren<
      CellProps<StatusGroup, number> & {
        stageType: T
        stageKey: StageKey<T>
      }
    >
  ) => {
    return (
      <span
        className="cursor-pointer block p-2 -m-2"
        onClick={() => toggle(props.row, props.stageType, props.stageKey)}
      >
        {props.children}
      </span>
    )
  }

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
        accessor: row => row.totals.stages.accepted.length,
        Cell: (props: CellProps<StatusGroup, number>) => (
          <RowExpander
            {...props}
            stageType={StageType.Stages}
            stageKey="accepted"
          >
            {props.cell.value}
          </RowExpander>
        )
      },
      {
        Header: 'In Progress',
        id: 'inProgress',
        accessor: row => row.totals.stages.inProgress.length,
        Cell: (props: CellProps<StatusGroup, number>) => (
          <RowExpander
            {...props}
            stageType={StageType.Stages}
            stageKey="inProgress"
          >
            <DataWithFlag
              flag={props.row.original.totals.stages.inProgressLimits.flag}
            >
              {props.cell.value}
            </DataWithFlag>
          </RowExpander>
        )
      },
      {
        Header: 'Done',
        id: 'done',
        accessor: row => row.totals.stages.done.length,
        Cell: (props: CellProps<StatusGroup, number>) => (
          <RowExpander {...props} stageType={StageType.Stages} stageKey="done">
            {props.cell.value}
          </RowExpander>
        )
      },
      {
        Header: '💛',
        id: 'yellow',
        accessor: row => row.totals.flagged.yellow.length,
        Cell: (props: CellProps<StatusGroup, number>) => (
          <RowExpander
            {...props}
            stageType={StageType.Flagged}
            stageKey="yellow"
          >
            {props.cell.value ?? <NullData />}
          </RowExpander>
        )
      },
      {
        Header: '❤️',
        id: 'red',
        accessor: row => row.totals.flagged.red.length,
        Cell: (props: CellProps<StatusGroup, number>) => (
          <RowExpander {...props} stageType={StageType.Flagged} stageKey="red">
            {props.cell.value ?? <NullData />}
          </RowExpander>
        )
      },
      {
        Header: 'Active > 3 wks',
        id: 'activeGt3Wk',
        accessor: row => row.totals.flagged.inProgressDuration.length,
        Cell: (props: CellProps<StatusGroup, number>) => (
          <RowExpander
            {...props}
            stageType={StageType.Flagged}
            stageKey="inProgressDuration"
          >
            {props.cell.value ?? <NullData />}
          </RowExpander>
        )
      },
      {
        Header: 'No Target Date',
        id: 'noTarget',
        accessor: row => row.totals.flagged.noTarget.length,
        Cell: (props: CellProps<StatusGroup, number>) => (
          <RowExpander
            {...props}
            stageType={StageType.Flagged}
            stageKey="noTarget"
          >
            {props.cell.value ?? <NullData />}
          </RowExpander>
        )
      },
      {
        Header: 'Past Target Date',
        id: 'pastTarget',
        accessor: row => row.totals.flagged.pastTarget.length,
        Cell: (props: CellProps<StatusGroup, number>) => (
          <RowExpander
            {...props}
            stageType={StageType.Flagged}
            stageKey="pastTarget"
          >
            {props.cell.value ?? <NullData />}
          </RowExpander>
        )
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

      <Table columns={columns} data={tableGroups} expanded />
    </>
  )
}
