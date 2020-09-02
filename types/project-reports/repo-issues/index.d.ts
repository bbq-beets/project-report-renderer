declare module 'project-reports/repo-issues' {
  export interface RepoIssuesData {
    identifier: number
    issues: Issues
    repositories: string[]
  }

  // export type Issues
  export interface Issues {
    [key: string]: Bug[]
  }

  export interface Bug {
    number: number
    title: string
    html_url: string
    labels: Label[]
  }

  export interface Label {
    id: number
    node_id: string
    url: string
    name: string
    color: string
    default: boolean
    description: string
  }
}
