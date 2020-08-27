import {GetStaticPropsResult} from 'next'
import ReportSectionComponent from '../../components/ReportSection'
import withReportsNav, {
  PropsWithReportsNav
} from '../../components/withReportsNav'
import {getLatestReportsData, ReportSection} from '../../lib/reports'

type Props = PropsWithReportsNav<{
  report: Record<string, ReportSection>
}>

export default withReportsNav(function ReportPage(props: Props) {
  return (
    <div className="max-w-6xl mx-auto">
      {Object.entries(props.report).map(([name, section]) => (
        <ReportSectionComponent key={name} name={name} data={section} />
      ))}
    </div>
  )
})

export async function getStaticProps({
  params
}: {
  params: Record<string, string>
}): Promise<GetStaticPropsResult<Props>> {
  const name = params.name
  const reports = await getLatestReportsData()
  const reportNames = Object.keys(reports)
  const report = reports[name]

  return {
    props: {
      reportName: params.name,
      report,
      reportNames
    }
  }
}

export async function getStaticPaths() {
  const reports = await getLatestReportsData()

  const paths = Object.entries(reports).map(([name, _report]) => ({
    params: {name}
  }))

  return {
    paths,
    fallback: false
  }
}
