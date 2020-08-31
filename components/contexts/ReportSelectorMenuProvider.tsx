import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'

export type ReportSelectorMenuState = {
  showReportSelector: boolean
  setShowReportSelector: Dispatch<SetStateAction<boolean>>
}

const ReportSelectorMenuContext = createContext<ReportSelectorMenuState>({
  showReportSelector: false,
  setShowReportSelector: () => null
})

type Props = {children?: ReactNode}

/**
 * Set up the context provider for the selector menu.
 *
 * This allows children to set and read the selector menu state.
 *
 * @param props Empty props with children
 */
export default function ReportSelectorMenuProvider(props: Props) {
  const [showReportSelector, setShowReportSelector] = useState(false)

  return (
    <ReportSelectorMenuContext.Provider
      value={{showReportSelector, setShowReportSelector}}
    >
      {props.children}
    </ReportSelectorMenuContext.Provider>
  )
}

/**
 * Get the current selector menu state.
 */
export function useReportSelectorMenu(): ReportSelectorMenuState {
  return useContext(ReportSelectorMenuContext)
}
