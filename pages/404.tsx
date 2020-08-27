import {GetStaticPropsResult} from 'next'
import HeroPage from '../components/HeroPage'
import Sad from '../components/icons/Sad'
import withReportsNav, {PropsWithReportsNav} from '../components/withReportsNav'
import {getLatestReportsData} from '../lib/reports'

type Props = PropsWithReportsNav<unknown>

export default withReportsNav(function NotFound() {
  return <HeroPage icon={Sad} title="404: Not found" />
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
