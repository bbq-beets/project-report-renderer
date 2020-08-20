import Link from 'next/link'
import {ComponentType} from 'react'

export type PropsWithReportsNav<T> = T & {
  reportNames: string[]
}

export default function withReportsNav<T>(Component: ComponentType<T>) {
  return function renderWithReportsNav(props: PropsWithReportsNav<T>) {
    return (
      <div className="lg:grid gap-8 grid-cols-sidebar-content">
        <div className="h-fit-content mb-4 pb-4 border-b lg:border-b-0">
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

        <div className="max-w-full">
          <Component {...props} />
        </div>
      </div>
    )
  }
}
