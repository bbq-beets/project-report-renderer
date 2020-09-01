import {
  Accepted,
  Done,
  InProgress,
  ProjectLimitsData,
  Proposed
} from 'project-reports/project-limits'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import DataWithFlag from '../DataWithFlag'
import IssuesTable from '../IssuesTable'
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

  const data = Object.entries(props.data).map<StageData>(([stage, data]) => ({
    stage,
    data,
    expandContent: () => {
      return <IssuesTable issues={data.items} />
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
