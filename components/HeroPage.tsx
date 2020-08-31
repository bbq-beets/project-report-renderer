import {ComponentType} from 'react'
import {useReportSelectorMenu} from './contexts/ReportSelectorMenuProvider'

type Props = {
  icon: ComponentType<JSX.IntrinsicElements['svg']>
  title: string
}

/**
 * A basic page with a big custom icon and title, as well as information about
 * this project.
 *
 * @param props
 */
export default function HeroPage(props: Props) {
  const Icon = props.icon
  const {setShowReportSelector} = useReportSelectorMenu()

  return (
    <div className="mt-16 max-w-4xl mx-auto">
      <div className="max-w-xl text-sm text-gray">
        <h1 className="flex items-center text-6xl mb-2 text-black">
          <Icon className="inline-block w-16 mr-4" />
          {props.title}
        </h1>

        <p className="mb-4">
          This application renders reports generated by{' '}
          <a
            className="text-black font-semibold hover:underline"
            href="https://github.com/bryanmacfarlane/project-reports-action"
          >
            bryanmacfarlane/project-reports-action
          </a>{' '}
          using{' '}
          <a
            className="text-black font-semibold hover:underline"
            href="https://github.com/bbq-beets/project-report-renderer"
          >
            bbq-beets/project-report-renderer
          </a>
          .
        </p>

        <p>
          Select a report using the{' '}
          <span
            onClick={() => setShowReportSelector(open => !open)}
            className="text-black font-semibold cursor-pointer"
          >
            &ldquo;Select a Report&rdquo;
          </span>{' '}
          menu at the top right.
        </p>
      </div>
    </div>
  )
}
