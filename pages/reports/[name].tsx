import Link from 'next/link'
import {getLatestReportsData} from '../../lib/reports'

type Props = {
  title: string
}

export default function ReportPage(props: Props) {
  return (
    <>
      <h1>
        <Link href="/">
          <a>Reports</a>
        </Link>
      </h1>
      <h1>{props.title}</h1>
    </>
  )
}

export function getStaticProps({params}: {params: Record<string, string>}) {
  return {
    props: {title: params.name}
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
