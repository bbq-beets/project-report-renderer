import {GetStaticPropsResult} from 'next'
import withReportsNav, {PropsWithReportsNav} from '../components/withReportsNav'
import {getLatestReportsData} from '../lib/reports'

type Props = PropsWithReportsNav<unknown>

export default withReportsNav(function IndexPage() {
  return <p>Choose a report to view.</p>
})

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const reportNames = Object.keys(await getLatestReportsData())

  return {
    props: {
      reportName: null,
      reportNames
    }
  }
}
