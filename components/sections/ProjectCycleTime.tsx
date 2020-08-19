import {useMemo} from 'react'
import {Column, useTable} from 'react-table'
import {ReportSection} from '../../lib/reports'
import Table from '../Table'

type Props = ReportSection['data']

export default function ProjectCycleTime(props: Props) {
  const cycleData: {[key: string]: any} = props

  const getCycleTime = (cycleTime: number) => {
    return cycleTime ? cycleTime.toFixed(2) : ''
  }

  const getLimit = (limit: number) => (limit >= 0 ? `${limit}` : '')

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: 'Label',
        accessor: 'label'
      },
      {
        Header: 'Count',
        accessor: 'data.count'
      },
      {
        Header: 'Cycle Time (days)',
        accessor: (row: any) => ({
          cycleTime: row.data.cycletime,
          flag: row.data.flag
        }),
        Cell: ({cell: {value}}) =>
          `${getCycleTime(value.cycleTime)} ${value.flag ? '🚩' : ''}`
      },
      {
        Header: 'Limit',
        accessor: 'data.limit',
        Cell: ({cell: {value}}) => getLimit(value)
      }
    ],
    []
  )

  const data = Object.entries(cycleData).map(([label, data]) => ({
    label,
    data
  })) as any[]
  const table = useTable({columns, data})

  return (
    <>
      <h2>Issue Count and Cycle Time</h2>

      <Table table={table} />
    </>
  )
}
