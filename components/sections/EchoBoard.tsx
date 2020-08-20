import {EchoBoardData} from 'project-reports/echo-board'
import SectionTitle from '../SectionTitle'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Props = EchoBoardData

export default function EchoBoard(props: Props) {
  return (
    <>
      <SectionTitle>Echo Data</SectionTitle>

      <p className="subtitle">
        There is no section component implemented for this type.
      </p>

      <pre className="overflow-x-auto p-4 bg-gray-200 border border-gray-300 rounded-lg text-gray-800">
        <code>{JSON.stringify(props, null, 4)}</code>
      </pre>
    </>
  )
}
