import {ComponentType, useEffect} from 'react'
import {useReports} from './contexts/ReportsProvider'

export type PropsWithReportsNav<T> = T & {
  reportName: string | null
  reportNames: string[]
}

export default function withReportsNav<T>(Component: ComponentType<T>) {
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

    return <Component {...props} />
  }
}
