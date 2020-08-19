import {ReportSection} from '../lib/reports'
import BaseSection from './sections/BaseSection'
import RepoIssues from './sections/RepoIssues'

type Props = {
  name: string
  data: ReportSection
}

export default function ReportSectionComponent(props: Props) {
  let SectionComponent

  switch (props.data.type) {
    case 'repo-issues':
      SectionComponent = RepoIssues
      break
    default:
      SectionComponent = BaseSection
  }

  return (
    <div>
      <SectionComponent {...props.data.data} />
    </div>
  )
}
