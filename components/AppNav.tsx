import Link from 'next/link'
import {useContext} from 'react'
import {ReportContext} from '../pages/_app'
import Eye from './icons/Eye'
import ReportNavigation from './ReportNavigation'

export default function AppNav() {
  const {currentReportName} = useContext(ReportContext)

  return (
    <nav className="flex justify-between px-2 py-1 bg-black text-white">
      <h1 className="flex items-center text-xl">
        <Eye className="inline-block w-6 h-6 mr-2" />
        <span>
          <Link href="/">
            <a className="hover:opacity-75">Report Viewer</a>
          </Link>
          {currentReportName && (
            <span className="text-gray-300 font-light">
              {' '}
              / {currentReportName}
            </span>
          )}
        </span>
      </h1>

      <ReportNavigation />
    </nav>
  )
}
