import {EchoBoardData} from 'project-reports/echo-board'
import SectionTitle from '../SectionTitle'

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Props = EchoBoardData

export default function EchoBoard(props: Props) {
  return (
    <>
      <SectionTitle>Echo Data</SectionTitle>

      <pre className="overflow-x-auto mt-4 p-4 border bg-gray rounded">
        <code>{JSON.stringify(props, null, 4)}</code>
      </pre>
    </>
  )
}
