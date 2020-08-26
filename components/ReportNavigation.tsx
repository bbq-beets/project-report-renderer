import Link from 'next/link'
import {useContext, useState} from 'react'
import {ReportContext} from '../pages/_app'
import ChevronDown from './icons/ChevronDown'
import styles from './ReportNavigation.module.css'

export default function ReportNavigation() {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(open => !open)
  const {reportNames} = useContext(ReportContext)

  return (
    <div
      className={`${styles.reportNavigation} ${
        open ? styles.navOpen : styles.navClosed
      }`}
    >
      <div
        onClick={toggleOpen}
        className="flex items-center bg-gray-900  text-gray-400 px-3 py-2 rounded-md shadow cursor-pointer select-none"
      >
        <span>Select a Report</span>

        <ChevronDown
          className={open ? styles.openIndicator : styles.closedIndicator}
        />
      </div>

      <ul id="report-nav" className={styles.reportList}>
        {reportNames.map(reportName => (
          <ul key={reportName} className={styles.reportListItem}>
            <Link href="/reports/[name]" as={`/reports/${reportName}`}>
              <a className="w-full h-full block px-3 py-2" onClick={toggleOpen}>
                {reportName}
              </a>
            </Link>
          </ul>
        ))}
      </ul>
    </div>
  )
}
