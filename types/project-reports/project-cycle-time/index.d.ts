declare module 'project-reports/project-cycle-time' {
  export type ProjectCycleTimeData = {[key: string]: Output}

  export type ProjectCycleTimeConfig = {
    _asof: string
    limit: number
    ['report-on-label']: string
    ['window-days']: number
  }

  export interface Output {
    count: number
    averageCycleTime: number
    eightiethCycleTime: number
    limit: number
    flag: boolean
    flag80: boolean
  }
}
