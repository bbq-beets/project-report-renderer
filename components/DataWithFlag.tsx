import {PropsWithChildren} from 'react'
import NullData from './NullData'

type Props<T> = PropsWithChildren<{
  flag: boolean
}>

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
