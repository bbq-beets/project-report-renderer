import {EchoBoardData} from 'project-reports/echo-board'
import SectionTitle from '../SectionTitle'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Props = EchoBoardData

export default function EchoBoard(props: Props) {
  return (
    <>
      <SectionTitle icon="👂">Echo Data</SectionTitle>

      <p className="text-sm text-gray">
        There is no section component implemented for this type. The full JSON
        output of the report is below:
      </p>

      <pre className="overflow-x-auto mt-4 p-4 bg-gray-100 border border-gray-200 rounded-md text-gray-700">
        <code>{JSON.stringify(props, null, 4)}</code>
      </pre>
    </>
  )
}
