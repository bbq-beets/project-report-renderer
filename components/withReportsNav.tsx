import {ComponentType, useContext, useEffect} from 'react'
import {ReportContext} from '../pages/_app'

export type PropsWithReportsNav<T> = T & {
  reportName: string | null
  reportNames: string[]
}

export default function withReportsNav<T>(Component: ComponentType<T>) {
  return function RenderWithReportsNav(props: PropsWithReportsNav<T>) {
    const {setReportNames, setCurrentReportName} = useContext(ReportContext)

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
