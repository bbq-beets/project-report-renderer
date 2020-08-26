import {ComponentType, useContext, useEffect} from 'react'
import {ReportContext} from '../pages/_app'

export type PropsWithReportsNav<T> = T & {
  reportNames: string[]
}

export default function withReportsNav<T>(Component: ComponentType<T>) {
  return function RenderWithReportsNav(props: PropsWithReportsNav<T>) {
    const {setReportNames} = useContext(ReportContext)

    useEffect(() => {
      setReportNames(props.reportNames)
    }, [setReportNames, props.reportNames])

    return <Component {...props} />
  }
}
