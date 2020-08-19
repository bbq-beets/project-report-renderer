import ReportSectionComponent from '../../components/ReportSection'
import {getLatestReportsData, ReportSection} from '../../lib/reports'

type Props = {
  title: string
  report: Record<string, ReportSection>
}

export default function ReportPage(props: Props) {
  return (
    <>
      <h2 className="mb-2">{props.title}</h2>

      {Object.entries(props.report).map(([name, section]) => (
        <ReportSectionComponent key={name} name={name} data={section} />
      ))}
    </>
  )
}

export async function getStaticProps({
  params
}: {
  params: Record<string, string>
}) {
  const name = params.name
  const report = (await getLatestReportsData())[name]

  return {
    props: {
      title: params.name,
      report
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
