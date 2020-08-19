declare module 'project-reports/project-limits' {
  export interface ProjectLimitsData {
    data: Data
    cardType: string
  }

  export interface Data {
    Proposed: Proposed
    Accepted: Accepted
    'In-Progress': InProgress
    Done: Done
  }

  export interface Accepted {
    items: AcceptedItem[]
    limit: number
    flag: boolean
  }

  export interface AcceptedItem {
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
    events: PurpleEvent[]
    project_proposed_at: Date
    project_accepted_at: Date
    project_added_at: Date
    project_stage: string
  }

  export interface Comment {
    url: string
    html_url: string
    issue_url: string
    id: number
    node_id: string
    user: Assignee
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

  export interface Assignee {
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

  export interface PurpleEvent {
    id: number
    node_id: string
    url: string
    actor: Assignee
    event: string
    commit_id: null
    commit_url: null
    created_at: Date
    project_card?: PurpleProjectCard
    performed_via_github_app: null
    label?: EventLabel
  }

  export interface EventLabel {
    name: string
    color: string
  }

  export interface PurpleProjectCard {
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

  export interface Done {
    items: DoneItem[]
    limit: number
    flag: boolean
  }

  export interface DoneItem {
    number: number
    title: string
    html_url: string
    closed_at: Date
    created_at: Date
    updated_at: Date
    assignee: Assignee
    assignees: Assignee[]
    labels: LabelElement[]
    comments: Comment[]
    events: FluffyEvent[]
    project_proposed_at: Date
    project_accepted_at: Date
    project_in_progress_at: Date
    project_done_at: Date
    project_added_at: Date
    project_stage: string
  }

  export interface FluffyEvent {
    id: number
    node_id: string
    url: string
    actor: Assignee
    event: string
    commit_id: null
    commit_url: null
    created_at: Date
    project_card?: PurpleProjectCard
    performed_via_github_app: null
    label?: EventLabel
    assignee?: Assignee
    assigner?: Assignee
  }

  export interface InProgress {
    items: InProgressItem[]
    limit: number
    flag: boolean
  }

  export interface InProgressItem {
    number: number
    title: string
    html_url: string
    closed_at: null
    created_at: Date
    updated_at: Date
    assignee: Assignee | null
    assignees: Assignee[]
    labels: LabelElement[]
    comments: Comment[]
    events: FluffyEvent[]
    project_proposed_at: Date
    project_accepted_at: Date
    project_in_progress_at: Date
    project_added_at: Date
    project_stage: string
  }

  export interface Proposed {
    items: ProposedItem[]
    limit: number
    flag: boolean
  }

  export interface ProposedItem {
    number: number
    title: string
    html_url: string
    closed_at: null
    created_at: Date
    updated_at: Date
    assignee: null
    assignees: any[]
    labels: LabelElement[]
    comments: any[]
    events: TentacledEvent[]
    project_proposed_at: Date
    project_added_at: Date
    project_stage: string
  }

  export interface TentacledEvent {
    id: number
    node_id: string
    url: string
    actor: Assignee
    event: string
    commit_id: null
    commit_url: null
    created_at: Date
    project_card?: FluffyProjectCard
    performed_via_github_app: null
    label?: EventLabel
  }

  export interface FluffyProjectCard {
    id: number
    url: string
    project_id: number
    project_url: string
    column_name: string
    stage_name: string
  }
}
