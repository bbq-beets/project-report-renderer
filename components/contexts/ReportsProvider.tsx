import {createContext, ReactNode, useContext, useState} from 'react'

type Props = {children?: ReactNode}

export type ReportsState = {
  reportNames: string[]
  setReportNames: (names: string[]) => void
  currentReportName: string | null
  setCurrentReportName: (name: string | null) => void
}

const ReportsContext = createContext<ReportsState>({
  reportNames: [],
  setReportNames: () => null,
  currentReportName: null,
  setCurrentReportName: () => null
})

/**
 * Set up the reports context.
 *
 * This allows children of this provider to read and write the list of known
 * reports, as well as the current report.
 *
 * @param props Empty props with children
 */
export default function ReportsProvider(props: Props) {
  const [reportNames, setReportNames] = useState<string[]>([])
  const [currentReportName, setCurrentReportName] = useState<string | null>(
    null
  )

  return (
    <ReportsContext.Provider
      value={{
        reportNames,
        setReportNames,
        currentReportName,
        setCurrentReportName
      }}
    >
      {props.children}
    </ReportsContext.Provider>
  )
}

/**
 * Get the current reports state.
 */
export function useReports(): ReportsState {
  return useContext(ReportsContext)
}
