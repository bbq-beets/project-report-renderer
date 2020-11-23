declare module 'project-reports/project-groupby-status' {
  //   export interface ProjectGroupbyStatusData {
  //     type:   string;
  //     output: Output;
  // }

  export interface ProjectGroupbyStatusData {
    durationDays: number
    groups: Groups
    total: Total
  }

  export interface Groups {
    Papercuts: Total
    Reliability: Total
  }

  export interface Total {
    stages: Stages
    flagged: Flagged
  }

  export interface Flagged {
    red: NoTarget[]
    yellow: NoTarget[]
    inProgressDuration: any[]
    noTarget: NoTarget[]
    pastTarget: NoTarget[]
  }

  export interface NoTarget {
    number: number
    title: string
    html_url: string
    closed_at: null
    created_at: Date
    updated_at: Date
    assignee: null
    assignees: any[]
    labels: LabelElement[]
    comments: Comment[]
    events: Event[]
    project_proposed_at: Date
    project_accepted_at: Date
    project_in_progress_at?: Date
    project_added_at: Date
    project_stage: string
    project_done_at?: Date
    project_target_date?: Date
  }

  export interface Comment {
    url: string
    html_url: string
    issue_url: string
    id: number
    node_id: string
    user: User
    created_at: Date
    updated_at: Date
    author_association: string
    body: string
    reactions: Reactions
    performed_via_github_app: null
  }

  export interface Reactions {
    url: string
    total_count: number
    '+1': number
    '-1': number
    laugh: number
    hooray: number
    confused: number
    heart: number
    rocket: number
    eyes: number
  }

  export interface User {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }

  export interface Event {
    id: number
    node_id: string
    url: string
    actor: User
    event: string
    commit_id: null
    commit_url: null
    created_at: Date
    project_card?: ProjectCard
    performed_via_github_app: null
    label?: EventLabel
  }

  export interface EventLabel {
    name: string
    color: string
  }

  export interface ProjectCard {
    id: number
    url: string
    project_id: number
    project_url: string
    column_name: string
    stage_name: string
    previous_column_name?: string
    previous_stage_name?: string
  }

  export interface LabelElement {
    id: number
    node_id: string
    url: string
    name: string
    color: string
    default: boolean
    description: string
  }

  export interface Stages {
    proposed: any[]
    accepted: NoTarget[]
    blocked: NoTarget[]
    inProgress: NoTarget[]
    inProgressLimits: InProgressLimits
    done: NoTarget[]
  }

  export interface InProgressLimits {
    limit: number
    flag: boolean
  }
}
