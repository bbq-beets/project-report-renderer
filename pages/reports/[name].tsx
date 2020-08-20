import {GetStaticPropsResult} from 'next'
import ReportSectionComponent from '../../components/ReportSection'
import withReportsNav, {
  PropsWithReportsNav
} from '../../components/withReportsNav'
import {getLatestReportsData, ReportSection} from '../../lib/reports'

type Props = PropsWithReportsNav<{
  title: string
  report: Record<string, ReportSection>
}>

export default withReportsNav(function ReportPage(props: Props) {
  return (
    <>
      <h2 className="mb-4">{props.title}</h2>

      {Object.entries(props.report).map(([name, section]) => (
        <ReportSectionComponent key={name} name={name} data={section} />
      ))}
    </>
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
      title: params.name,
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
