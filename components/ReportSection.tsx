import {ReportSection} from '../lib/reports'

type Props = {
  name: string
  data: ReportSection
}

export default function ReportSectionComponent(props: Props) {
  return (
    <>
      <h2>{props.name}</h2>
    </>
  )
}
