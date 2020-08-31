import {PropsWithChildren} from 'react'
import NullData from './NullData'

type Props<T> = PropsWithChildren<{
  flag: boolean
}>

/**
 * Display data that may be flagged in a table cell.
 *
 * This renders the data (or a `NullData` component) and displays a flag if the
 * `flag` property is true.
 *
 * ```tsx
 * <DataWithFlag flag={true}>My Data</DataWithFlag>
 * ```
 *
 * @param props
 */
export default function DataWithFlag<T>(props: Props<T>) {
  return (
    <div className="flex">
      {props.children != null && props.children != '' ? (
        <span className="flex-1">{props.children}</span>
      ) : (
        <NullData />
      )}
      {props.flag && <span>🚩</span>}
    </div>
  )
}
