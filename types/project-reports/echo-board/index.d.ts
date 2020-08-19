declare module 'project-reports/echo-board' {
  export interface EchoBoardData {
    stageAtNames: string[]
    seen: unknown
    items: Item[]
    processed: Item[]
  }

  export interface Item {
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
