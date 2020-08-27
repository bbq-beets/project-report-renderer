import NextApp from 'next/app'
import {createContext, Dispatch, SetStateAction, useState} from 'react'
import AppNav from '../components/AppNav'
import '../styles/base.css'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const ReportContext = createContext<{
  reportNames: string[]
  setReportNames: (names: string[]) => void
  currentReportName: string | null
  setCurrentReportName: (name: string | null) => void
}>({
  reportNames: [],
  setReportNames: () => null,
  currentReportName: null,
  setCurrentReportName: () => null
})

export const SelectReportContext = createContext<{
  showReportSelector: boolean
  setShowReportSelector: Dispatch<SetStateAction<boolean>>
}>({
  showReportSelector: false,
  setShowReportSelector: () => null
})

export default function App({Component, pageProps}: NextApp['props']) {
  const [reportNames, setReportNames] = useState<string[]>([])
  const [currentReportName, setCurrentReportName] = useState<string | null>(
    null
  )

  const [showReportSelector, setShowReportSelector] = useState(false)

  return (
    <ReportContext.Provider
      value={{
        reportNames,
        setReportNames,
        currentReportName,
        setCurrentReportName
      }}
    >
      <SelectReportContext.Provider
        value={{showReportSelector, setShowReportSelector}}
      >
        <AppNav />

        <div className="max-w-6xl mx-auto my-4 px-4">
          <Component {...pageProps} />
        </div>
      </SelectReportContext.Provider>
    </ReportContext.Provider>
  )
}
