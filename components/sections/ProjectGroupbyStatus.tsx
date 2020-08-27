import {
  ProjectGroupbyStatusData,
  Total
} from 'project-reports/project-groupby-status'
import {useMemo} from 'react'
import {Column} from 'react-table'
import NullData from '../NullData'
import SectionTitle from '../SectionTitle'
import Table from '../Table'

type Props = ProjectGroupbyStatusData

export default function ProjectGroupbyStatus(props: Props) {
  const groups = Object.entries(props.groups).map(([key, group]) => ({
    key,
    group
  }))

  groups.push({
    key: 'Total',
    group: props.total
  })

  // TODO: What do yellow/red hearts actually mean?

  const columns = useMemo<Column<{key: string; group: Total}>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'key'
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
        accessor: row => row.group.stages.inProgress.length
      },
      {
        Header: 'Done',
        id: 'done',
        accessor: row => row.group.stages.done.length
      },
      {
        Header: '💛',
        id: 'yellow',
        accessor: row => row.group.flagged.yellow.length || <NullData />
      },
      {
        Header: '❤️',
        id: 'red',
        accessor: row => row.group.flagged.red.length || <NullData />
      },
      {
        Header: 'Active > 3 wks',
        id: 'activeGt3Wk',
        accessor: row =>
          row.group.flagged.inProgressDuration.length || <NullData />
      },
      {
        Header: 'No Target Date',
        id: 'noTarget',
        accessor: row => row.group.flagged.noTarget.length || <NullData />
      },
      {
        Header: 'Past Target Date',
        id: 'pastTarget',
        accessor: row => row.group.flagged.pastTarget.length || <NullData />
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
