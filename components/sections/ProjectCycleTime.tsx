import {Epic, ProjectCycleTimeData} from 'project-reports/project-cycle-time'
import {useMemo} from 'react'
import {CellProps, Column, useTable} from 'react-table'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = ProjectCycleTimeData
type LabelData = {label: string; data: Epic}

export default function ProjectCycleTime(props: Props) {
  const cycleData = props

  const getCycleTime = (cycleTime: number) => {
    return cycleTime ? cycleTime.toFixed(2) : ''
  }

  const getLimit = (limit: number) => (limit >= 0 ? `${limit}` : '')

  const columns = useMemo<Column<LabelData>[]>(
    () => [
      {
        Header: 'Label',
        accessor: 'label'
      },
      {
        Header: 'Count',
        id: 'count',
        accessor: row => row.data.count
      },
      {
        Header: 'Cycle Time (days)',
        id: 'cycleTime',
        accessor: row => row,
        Cell: ({cell}: CellProps<LabelData, LabelData>) =>
          `${getCycleTime(cell.value.data.cycletime)} ${
            cell.value.data.flag ? '🚩' : ''
          }`
      },
      {
        Header: 'Limit',
        id: 'limit',
        accessor: row => row.data.limit,
        Cell: ({cell}: CellProps<LabelData, number>) => getLimit(cell.value)
      }
    ],
    []
  )

  const data = Object.entries(cycleData).map(([label, data]) => ({
    label,
    data
  }))

  const table = useTable({columns, data})

  return (
    <>
      <SectionTitle>Issue Count and Cycle Time</SectionTitle>

      <Table table={table} />
    </>
  )
}
