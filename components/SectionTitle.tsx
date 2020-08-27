import {PropsWithChildren} from 'react'

type Props = PropsWithChildren<{icon?: string}>

export default function SectionTitle(props: Props) {
  return (
    <h3 className="mb-8 text-2xl font-bold border-b-2 border-black pb-2">
      {props.icon && <span className="mr-2">{props.icon}</span>}
      {props.children}
    </h3>
  )
}
