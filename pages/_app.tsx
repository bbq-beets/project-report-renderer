import NextApp from 'next/app'
import Head from 'next/head'
import AppNav from '../components/AppNav'
import ReportSelectorMenuProvider from '../components/contexts/ReportSelectorMenuProvider'
import ReportsProvider from '../components/contexts/ReportsProvider'
import '../styles/base.css'

export default function App({Component, pageProps}: NextApp['props']) {
  return (
    <>
      <Head key="app">
        <title>Report Viewer</title>
      </Head>

      <ReportsProvider>
        <ReportSelectorMenuProvider>
          <AppNav />

          <div className="my-4 px-4">
            <Component {...pageProps} />
          </div>
        </ReportSelectorMenuProvider>
      </ReportsProvider>
    </>
  )
}
