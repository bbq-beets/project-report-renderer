declare module 'project-reports/project-cycle-time' {
  export interface ProjectCycleTimeData {
    feature: Epic
    epic: Epic
  }

  export interface Epic {
    title: string
    count: number
    cycletime: number
    limit: number
    flag: boolean
  }
}
