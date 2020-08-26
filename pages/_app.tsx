import NextApp from 'next/app'
import Link from 'next/link'
import {createContext, useState} from 'react'
import Eye from '../components/icons/Eye'
import ReportNavigation from '../components/ReportNavigation'
import '../styles/base.css'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const ReportContext = createContext<{
  reportNames: string[]
  setReportNames: (names: string[]) => void
}>({
  reportNames: [],
  setReportNames: () => null
})

export default function App({Component, pageProps}: NextApp['props']) {
  const [reportNames, setReportNames] = useState<string[]>([])

  return (
    <ReportContext.Provider value={{reportNames, setReportNames}}>
      <nav className="flex justify-between p-2 bg-blue-900 text-gray-400">
        <h1 className="flex items-center text-2xl">
          <Eye className="inline-block w-6 h-6 mr-2" />
          <span>
            <Link href="/">
              <a>Report Viewer</a>
            </Link>
          </span>
        </h1>

        <ReportNavigation />
      </nav>

      <div className="max-w-6xl mx-auto my-4 px-4">
        <Component {...pageProps} />
      </div>
    </ReportContext.Provider>
  )
}
