import DataWithFlag from './DataWithFlag'

interface Assignee {
  avatar_url: string
  html_url: string
  login: string
}

type Props = {
  card: {
    assignee?: Assignee | null
    assignees?: Assignee[] | null
  }
}

/**
 * Render an assignee of a card or issue.
 */
export default function CardAssignee({card}: Props) {
  const assignee = getAssignee(card)

  return (
    <DataWithFlag flag={!assignee}>
      {assignee && (
        <a href={assignee.html_url} className="flex">
          <img
            style={{height: '20px', width: '20px'}}
            alt={`@${assignee.login}`}
            src={assignee.avatar_url}
          />
          <span className="flex-1 ml-2">{assignee.login}</span>
        </a>
      )}
    </DataWithFlag>
  )
}

export function getAssignee(card: {
  assignee?: Assignee | null
  assignees?: Assignee[] | null
}): Assignee | null {
  const assignee = card.assignee
    ? card.assignee
    : card.assignees
    ? card.assignees[0]
    : null

  return assignee
}
