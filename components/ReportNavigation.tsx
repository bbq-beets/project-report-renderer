import Link from 'next/link'
import {CSSTransition} from 'react-transition-group'
import {useReportSelectorMenu} from './contexts/ReportSelectorMenuProvider'
import {useReports} from './contexts/ReportsProvider'
import ChevronDown from './icons/ChevronDown'
import styles from './ReportNavigation.module.css'

export default function ReportNavigation() {
  const {showReportSelector, setShowReportSelector} = useReportSelectorMenu()
  const toggleOpen = () => setShowReportSelector(open => !open)
  const {reportNames} = useReports()

  return (
    <div className={styles.reportNavigation}>
      <div
        onClick={toggleOpen}
        className="flex items-center hover:opacity-75 px-3 py-2 rounded-md shadow cursor-pointer select-none"
      >
        <span>Select a Report</span>

        <ChevronDown
          className={
            showReportSelector ? styles.openIndicator : styles.closedIndicator
          }
        />
      </div>

      <CSSTransition
        in={showReportSelector}
        timeout={150}
        unmountOnExit
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive
        }}
      >
        <ul id="report-nav" className={styles.reportList}>
          {reportNames.map(reportName => (
            <ul key={reportName} className={styles.reportListItem}>
              <Link href="/reports/[name]" as={`/reports/${reportName}`}>
                <a
                  className="w-full h-full block px-3 py-2"
                  onClick={toggleOpen}
                >
                  {reportName}
                </a>
              </Link>
            </ul>
          ))}
        </ul>
      </CSSTransition>
    </div>
  )
}
