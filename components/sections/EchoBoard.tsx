import {EchoBoardData} from 'project-reports/echo-board'
import {ProjectBaseConfig, PropsWithIndex} from '../ReportSection'
import SectionTitle from '../SectionTitle'

type Props = PropsWithIndex<EchoBoardData, ProjectBaseConfig>

/**
 * Represent the report section data as JSON.
 *
 * @param props
 */
export default function EchoBoard(props: Props) {
  return (
    <>
      <SectionTitle index={props.index} icon="👂" asof={props.config._asof}>
        Echo Data
      </SectionTitle>

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
