import {
  Accepted,
  Done,
  InProgress,
  ProjectLimitsData,
  Proposed
} from 'project-reports/project-limits'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = ProjectLimitsData
type Stage = Proposed | Accepted | InProgress | Done
type StageData = {stage: string; data: Stage}

export default function ProjectLimits(props: Props) {
  const typeLabel = props.cardType === '*' ? '' : props.cardType

  const columns = useMemo<Column<StageData>[]>(
    () => [
      {
        Header: 'Stage',
        accessor: 'stage'
      },
      {
        Header: 'Count',
        id: 'count',
        accessor: cell => cell.data.items.length,
        Cell: ({row, cell}: CellProps<StageData, number>) =>
          `${cell.value} ${row.original.data.flag ? '🚩' : ''}`
      },
      {
        Header: 'Limit',
        id: 'limit',
        accessor: cell => cell.data.limit,
        Cell: ({cell}: CellProps<StageData, number>) =>
          cell.value >= 0 ? cell.value : ''
      }
    ],
    []
  )

  const data = Object.entries(props.data).map<StageData>(([stage, data]) => ({
    stage,
    data
  }))

  return (
    <>
      <SectionTitle>🚢 {typeLabel} Limits</SectionTitle>
      <Table columns={columns} data={data} />
    </>
  )
}
