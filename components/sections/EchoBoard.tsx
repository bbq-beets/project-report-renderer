import {ReportSection} from '../../lib/reports'

type Props = ReportSection['data']

export default function EchoBoard(props: Props) {
  return (
    <>
      <h2>Echo Data</h2>

      <pre className="overflow-x-auto mt-4 p-4 border bg-gray rounded">
        <code>{JSON.stringify(props, null, 4)}</code>
      </pre>
    </>
  )
}
