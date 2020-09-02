import {useRouter} from 'next/dist/client/router'
import Link from 'next/link'
import {PropsWithChildren} from 'react'

type Props = PropsWithChildren<{
  index: number
  icon?: string
}>

/**
 * Renders a section title.
 *
 * @param props
 */
export default function SectionTitle(props: Props) {
  const router = useRouter()
  const path = router.asPath.split('#')[0]
  const id = `section-${props.index}`

  return (
    <h3
      className="mb-8 text-2xl font-bold border-b-2 border-black pb-2"
      id={id}
    >
      {props.icon && <span className="mr-2">{props.icon}</span>}
      <Link href="/reports/[name]" as={`${path}#${id}`}>
        <a>{props.children}</a>
      </Link>
    </h3>
  )
}
