import {ReportSection} from '../lib/reports'
import BaseSection from './sections/BaseSection'
import EchoBoard from './sections/EchoBoard'
import ProjectCycleTime from './sections/ProjectCycleTime'
import ProjectDone from './sections/ProjectDone'
import ProjectInProgress from './sections/ProjectInProgress'
import RepoIssues from './sections/RepoIssues'

type Props = {
  name: string
  data: ReportSection
}

export default function ReportSectionComponent(props: Props) {
  let SectionComponent

  switch (props.data.type) {
    case 'project-cycle-time':
      SectionComponent = ProjectCycleTime
      break
    case 'project-done':
      SectionComponent = ProjectDone
      break
    case 'project-in-progress':
      SectionComponent = ProjectInProgress
      break
    case 'echo-board':
      SectionComponent = EchoBoard
      break
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
