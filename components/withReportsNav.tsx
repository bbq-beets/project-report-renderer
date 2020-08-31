import {NextPage} from 'next'
import {useEffect} from 'react'
import {useReports} from './contexts/ReportsProvider'

export type PropsWithReportsNav<T> = T & {
  reportName: string | null
  reportNames: string[]
}

/**
 * Wraps a page component setting the known and current report names in the
 * reports context.
 *
 * @param Page The page component to wrap in reports navigation
 */
export default function withReportsNav<T>(Page: NextPage<T>) {
  return function RenderWithReportsNav(props: PropsWithReportsNav<T>) {
    const {setReportNames, setCurrentReportName} = useReports()

    useEffect(() => {
      setReportNames(props.reportNames)
      setCurrentReportName(props.reportName)
    }, [
      setReportNames,
      setCurrentReportName,
      props.reportNames,
      props.reportName
    ])

    return <Page {...props} />
  }
}
