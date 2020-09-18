declare module 'project-reports/project-cycle-time' {
  export type ProjectCycleTimeData = {[key: string]: Output}

  export interface Output {
    count: number
    averageCycleTime: number
    eightiethCycleTime: number
    limit: number
    flag: boolean
    flag80: boolean
  }
}
