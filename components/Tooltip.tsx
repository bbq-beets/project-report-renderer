import {PropsWithChildren} from 'react'

type Props = PropsWithChildren<{tip: string}>

export default function Tooltip(props: Props) {
  return <span className="cursor-pointer">{props.children}</span>
}
