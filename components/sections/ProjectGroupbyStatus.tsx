import { Card } from 'project-reports'
import {
    ProjectGroupbyStatusData,
    Total
} from 'project-reports/project-groupby-status'
import { PropsWithChildren, useMemo, useState } from 'react'
import { Cell, CellProps, Column, Row } from 'react-table'
import DataWithFlag from '../DataWithFlag'
import IssuesTable from '../IssuesTable'
import NullData from '../NullData'
import ReportCard, { Stats } from '../ReportCard'
import { ProjectBaseConfig, PropsWithIndex } from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'
import tableStyles from '../Table.module.css'

type Props = PropsWithIndex<ProjectGroupbyStatusData, ProjectBaseConfig>

type StatusGroup = {key: string; totals: Total}

enum StageType {
  Flagged = 'flagged',
  Stages = 'stages'
}

type StageKey<T extends StageType> = T extends StageType.Stages
  ? keyof Exclude<StatusGroup['totals'][StageType.Stages], 'inProgressLimits'>
  : keyof StatusGroup['totals'][StageType.Flagged]

type RowState<T extends StageType = StageType> = {
  stageType: T
  stageKey: StageKey<T>
}

type CellState = {highlighted?: boolean}

const TOTAL_KEY = 'Total'
// The output uses Number.MAX_VALUE to represent an undefined limit
const NULL_LIMIT = Number.MAX_VALUE

function getIssues(
  group: StatusGroup,
  type: StageType.Flagged,
  key: StageKey<StageType.Flagged>
): Card[]
function getIssues(
  group: StatusGroup,
  type: StageType.Stages,
  key: StageKey<StageType.Stages>
): Card[]
function getIssues(
  group: StatusGroup,
  type: StageType.Stages | StageType.Flagged,
  key: StageKey<StageType.Stages> | StageKey<StageType.Flagged>
): Card[] {
  return type && key ? (group.totals as any)[type][key] : []
}

/**
 * Display projects grouped by status as a "report card" style view.
 *
 * @param props
 */
export default function ProjectGroupbyStatus(props: Props) {
  const groups: StatusGroup[] = Object.entries(props.output.groups).map(
    ([key, group]) => ({
      key,
      totals: group
    })
  )

  const toggle = <T extends StageType>(
    row: Row<StatusGroup>,
    cell: Cell<StatusGroup, number>,
    stageType: T,
    stageKey: StageKey<T>
  ) => {
    const currentStageType = row.state.stageType
    const currentStageKey = row.state.stageKey

    row.setState((state: RowState) => ({...state, stageType, stageKey}))

    row.allCells.forEach(cell =>
      cell.setState((state: CellState) => ({...state, highlight: false}))
    )
    cell.setState((state: CellState) => ({...state, highlight: true}))

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
    totals: props.output.total
  }

  const tableGroups: StatusGroup[] = [...groups, totals].map(group => {
    return {
      ...group,
      expandContent: (props: {row: Row<StatusGroup>}) => {
        const rowState = props.row.state as RowState<StageType.Stages>

        return (
          <IssuesTable
            issues={getIssues(group, rowState.stageType, rowState.stageKey)}
            showTargetDate={true}
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
        className={tableStyles.expander}
        onClick={() =>
          toggle(props.row, props.cell, props.stageType, props.stageKey)
        }
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
          if (cell.value === NULL_LIMIT) {
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
        Header: 'Blocked',
        id: 'blocked',
        accessor: row => row.totals.stages.blocked.length,
        Cell: (props: CellProps<StatusGroup, number>) => (
          <RowExpander
            {...props}
            stageType={StageType.Stages}
            stageKey="blocked"
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
      <SectionTitle index={props.index} icon="🚀" asof={props.config['_asof']}>
        Project Execution
      </SectionTitle>

      {[totals, ...groups].map(group => (
        <ReportCardWrapper
          group={group}
          key={group.key}
          totals={totals}
          limit={group.totals.stages.inProgressLimits.limit}
        />
      ))}

      <Table columns={columns} data={tableGroups} />
    </>
  )
}

function ReportCardWrapper({
  group,
  totals,
  limit
}: {
  group: StatusGroup
  totals: StatusGroup
  limit: number
}) {
  const [activeExpand, setActiveExpand] = useState<keyof Stats | null>(null)

  const setExpand = (key: keyof Stats) => {
    if (key === activeExpand) {
      setActiveExpand(null)
    } else {
      setActiveExpand(key)
    }
  }

  const stats: Stats = useMemo(
    () => ({
      proposed: group.totals.stages.proposed,
      accepted: group.totals.stages.accepted,
      inProgress: group.totals.stages.inProgress,
      blocked: group.totals.stages.blocked,
      done: group.totals.stages.done,
      warn: group.totals.flagged.yellow,
      alert: group.totals.flagged.red,
      activeGt3Wk: group.totals.flagged.inProgressDuration,
      noTarget: group.totals.flagged.noTarget,
      pastTarget: group.totals.flagged.pastTarget
    }),
    [group.totals]
  )

  return (
    <>
      <div className="block lg:flex items-start mb-8" key={group.key}>
        <header className="mb-2">
          <h1 className="w-56 text-xl font-semibold mr-2">{group.key}</h1>

          {limit != NULL_LIMIT && (
            <p className="text-lg text-gray-500">
              <span className="font-semibold">In Progress Limit:</span> {limit}
            </p>
          )}
        </header>

        <ReportCard
          activeExpand={activeExpand}
          setExpand={setExpand}
          inProgressFlag={group.totals.stages.inProgressLimits.flag}
          {...stats}
          totals={{
            proposed: totals.totals.stages.proposed,
            accepted: totals.totals.stages.accepted,
            inProgress: totals.totals.stages.inProgress,
            blocked: totals.totals.stages.blocked,
            done: totals.totals.stages.done,
            warn: totals.totals.flagged.yellow,
            alert: totals.totals.flagged.red,
            activeGt3Wk: totals.totals.flagged.inProgressDuration,
            noTarget: totals.totals.flagged.noTarget,
            pastTarget: totals.totals.flagged.pastTarget
          }}
        />
      </div>

      {activeExpand ? (
        <div className="mt-4 mb-8">
          <IssuesTable issues={stats[activeExpand]} />
        </div>
      ) : null}
    </>
  )
}
