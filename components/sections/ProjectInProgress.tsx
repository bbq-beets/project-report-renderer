import { CallOutDataBySection, Card, ProjectInProgressData } from 'project-reports/project-in-progress'
import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { CellProps, Column } from 'react-table'
import gfm from 'remark-gfm'
import { getStatusEmoji } from '../../lib/util'
import CardAssignee, { getAssignee } from '../CardAssignee'
import DataWithFlag from '../DataWithFlag'
import ReportDate from '../ReportDate'
import { ProjectBaseConfig, PropsWithIndex } from '../ReportSection'
import SectionTitle from '../SectionTitle'
import Table from '../Table'
import TimeAgo from '../TimeAgo'

type Props = PropsWithIndex<ProjectInProgressData, ProjectBaseConfig>

/**
 * Display projects in progress as a table.
 *
 * @param props
 */
export default function ProjectInProgress(props: Props) {
  const cards = props.output.cards

  const columns = useMemo<Column<Card>[]>(
    () => [
      {
        Header: 'Assignee',
        id: 'assignee',
        accessor: row => getAssignee(row)?.login,
        Cell: ({ row }: CellProps<Card, string>) => (
          <CardAssignee card={row.original} />
        )
      },
      {
        Header: 'Title',
        id: 'title',
        accessor: row => row.title,
        Cell: ({ row, cell }: CellProps<Card, string>) => (
          <a href={row.original.html_url}>{cell.value}</a>
        )
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => getStatusEmoji(value)
      },
      {
        Header: 'Previous Status',
        accessor: 'previousStatus',
        Cell: ({ cell: { value } }) => getStatusEmoji(value)
      },
      {
        Header: 'Last Update',
        id: 'lastUpdate',
        accessor: 'lastUpdatedAt',
        className: 'w-32',
        sortInverted: true,
        Cell: ({ row, cell }: CellProps<Card, string>) => (
          <DataWithFlag flag={row.original.flagHoursLastUpdated}>
            {cell.value ? <TimeAgo dateTime={cell.value} /> : null}
          </DataWithFlag>
        )
      },
      {
        Header: 'In Progress',
        accessor: 'project_in_progress_at',
        className: 'w-32',
        sortInverted: true,
        Cell: ({ cell }) => <TimeAgo dateTime={cell.value} />
      },
      {
        Header: 'Target Date',
        accessor: 'project_target_date',
        className: 'w-32',
        Cell: ({ cell }) => <ReportDate targetDate={cell.value} />
      }
    ],
    []
  )

  var callOuts: CallOutDataBySection = {}

  cards.forEach((card) => {
    if (card.additionalColumns && card.additionalColumns.length > 0) {
      card.additionalColumns.forEach((additionalData) => {
        var value = ""

        if (additionalData.value) {
          value = additionalData.value
        }
        else {
          value = "No callout to report."
        }

        if (callOuts[additionalData.columnName]) {
          callOuts[additionalData.columnName].push({ 'value': value, 'issueName': card.title, 'url': card.html_url })
        } else {
          callOuts[additionalData.columnName] = []
          callOuts[additionalData.columnName].push({ 'value': value, 'issueName': card.title, 'url': card.html_url })
        }
      })
    }
  });

  const callOutRendered = function () {
    var callOutData: (JSX.Element | JSX.Element[])[] = []
    Object.keys(callOuts).forEach(key => {
      console.log(key);
      console.log(callOuts[key])
      callOutData.push(<SectionTitle icon="🚨" index={props.index} asof={props.config._asof}>
        {key}
      </SectionTitle>)
      callOutData.push(callOuts[key].map((item) => <><h3 key={item['issueName']}><b><a href={item['url']}>{item['issueName']}</a></b></h3><h3 key={item['value']}><ReactMarkdown plugins={[gfm]} children={item['value']} /></h3></>))
    })
    return (
      <>
        {callOutData}
      </>
    )
  }
  return (
    <>
      <SectionTitle index={props.index} icon="⏳" asof={props.config._asof}>
        In Progress ({props.output.cardType})
      </SectionTitle>

      <p className="subtitle">
        Sorted by status and then in progress time descending
      </p>

      <Table
        columns={columns}
        data={cards}
        empty={<p>No issues to report on.</p>}
      />
      <div>
        {callOutRendered()}
      </div>
    </>
  )
}
