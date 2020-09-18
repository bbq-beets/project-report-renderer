import {ComponentType, PropsWithChildren} from 'react'
import {ReportSection} from '../lib/reports'
import EchoBoard from './sections/EchoBoard'
import ProjectCycleTime from './sections/ProjectCycleTime'
import ProjectDone from './sections/ProjectDone'
import ProjectGroupbyStatus from './sections/ProjectGroupbyStatus'
import ProjectInProgress from './sections/ProjectInProgress'
import ProjectNew from './sections/ProjectNew'
import RepoIssues from './sections/RepoIssues'

type Props = {
  name: string
  data: ReportSection
  index: number
}

export type PropsWithTitle<T> = {
  data: T
  TitleComponent: ComponentType<PropsWithChildren<unknown>>
}

export type ProjectBaseConfig = {
  _asof: string
}

export type PropsWithIndex<O, C = null> = {
  index: number
  config: C
  output: O
}

/**
 * A generic wrapper around a section of a report.
 *
 * This looks at the report section type and renders the appropriate component,
 * or `EchoBoard` if no known component is associated with that section type.
 *
 * @param props
 */
export default function ReportSectionComponent(props: Props) {
  let SectionComponent: ComponentType<PropsWithIndex<any, any>>

  switch (props.data.type) {
    case 'project-cycle-time':
      SectionComponent = ProjectCycleTime
      break
    case 'project-done':
      SectionComponent = ProjectDone
      break
    case 'project-groupby-status':
      SectionComponent = ProjectGroupbyStatus
      break
    case 'project-in-progress':
      SectionComponent = ProjectInProgress
      break
    case 'project-new':
      SectionComponent = ProjectNew
      break
    case 'repo-issues':
      SectionComponent = RepoIssues
      break
    default:
      SectionComponent = EchoBoard
  }

  return (
    <div className="mb-8">
      <SectionComponent
        index={props.index}
        output={props.data.output as any}
        config={props.data.config as any}
      />
    </div>
  )
}
