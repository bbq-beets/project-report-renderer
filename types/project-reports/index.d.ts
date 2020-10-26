declare module 'project-reports' {
  export interface Assignee {
    login: string
    id: number
    avatar_url: string
    html_url: string
  }

  export interface Card {
    number: number
    title: string
    html_url: string
    assignee?: Assignee | null
    assignees?: Assignee[] | null
    labels: Label[]
    project_target_date?: Date
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
