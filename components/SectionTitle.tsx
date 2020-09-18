import {useRouter} from 'next/dist/client/router'
import Link from 'next/link'
import {PropsWithChildren} from 'react'

type Props = PropsWithChildren<{
  index: number
  asof: string
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
  const generated = new Date(props.asof)

  return (
    <div className="mb-8 border-b-2 border-black">
      <h3 className="mb-2 text-2xl font-bold" id={id}>
        {props.icon && <span className="mr-2">{props.icon}</span>}
        <Link href="/reports/[name]" as={`${path}#${id}`}>
          <a>{props.children}</a>
        </Link>
      </h3>

      <p className="mb-2 font-normal text-gray-400 italic text-sm">
        Generated {generated.toLocaleString()}
      </p>
    </div>
  )
}
