import {PropsWithChildren} from 'react'

type Props<T> = PropsWithChildren<{
  flag: boolean
}>

export default function DataWithFlag<T>(props: Props<T>) {
  return (
    <div className="flex">
      {props.children != null && props.children != '' ? (
        <span className="flex-1">{props.children}</span>
      ) : (
        <span className="flex-1 text-gray-400">—</span>
      )}
      {props.flag && <span>🚩</span>}
    </div>
  )
}
