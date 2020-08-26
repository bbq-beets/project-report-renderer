import Link from 'next/link'
import {ComponentType} from 'react'

export type PropsWithReportsNav<T> = T & {
  reportNames: string[]
}

export default function withReportsNav<T>(Component: ComponentType<T>) {
  return function renderWithReportsNav(props: PropsWithReportsNav<T>) {
    return (
      <div className="lg:flex gap-8">
        <div className="w-56  mb-4 pb-4 border-b lg:border-b-0">
          <h2 className="mb-2">Reports</h2>

          <ul className="h-fit-content border rounded-lg shadow-xs">
            {props.reportNames.map(reportName => (
              <li key={reportName} className="border-b last:border-b-0">
                <Link href="/reports/[name]" as={`/reports/${reportName}`}>
                  <a className="block p-2 text-current hover:no-underline">
                    {reportName}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:flex-1">
          <Component {...props} />
        </div>
      </div>
    )
  }
}
