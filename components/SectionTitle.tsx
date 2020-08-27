import {PropsWithChildren} from 'react'

type Props = PropsWithChildren<{icon?: string}>

export default function SectionTitle(props: Props) {
  return (
    <h3 className="mb-4 text-xl">
      {props.icon && <span className="mr-2">{props.icon}</span>}
      {props.children}
    </h3>
  )
}
