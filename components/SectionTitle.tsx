import {PropsWithChildren} from 'react'

type Props = PropsWithChildren<unknown>

export default function SectionTitle(props: Props) {
  return <h3 className="mb-2">{props.children}</h3>
}
