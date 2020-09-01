import {Epic, ProjectCycleTimeData} from 'project-reports/project-cycle-time'
import {useMemo} from 'react'
import {CellProps, Column} from 'react-table'
import DataWithFlag from '../DataWithFlag'
import NullData from '../NullData'
import {PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = PropsWithIndex<ProjectCycleTimeData>
type LabelData = {label: string; data: Epic}

/**
 * Display project cycle time as a table.
 *
 * @param props
 */
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
        accessor: row => row.data.cycletime,
        Cell: ({cell, row}: CellProps<LabelData, number>) => (
          <DataWithFlag flag={row.original.data.flag}>
            {getCycleTime(cell.value)}
          </DataWithFlag>
        )
      },
      {
        Header: 'Limit',
        id: 'limit',
        accessor: row => row.data.limit,
        Cell: ({cell}: CellProps<LabelData, number>) =>
          getLimit(cell.value) || <NullData />
      }
    ],
    []
  )

  const data = Object.entries(cycleData).map(([label, data]) => ({
    label,
    data
  }))

  return (
    <>
      <SectionTitle index={props.index} icon="🔄">
        Issue Count and Cycle Time
      </SectionTitle>

      {data.length ? (
        <Table columns={columns} data={data} />
      ) : (
        <p>No issues to report on.</p>
      )}
    </>
  )
}
