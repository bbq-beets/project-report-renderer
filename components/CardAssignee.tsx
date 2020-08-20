import DataWithFlag from './DataWithFlag'

type Props = any

export default function CardAssignee({card}: Props) {
  const assignee = getAssignee(card)

  return (
    <DataWithFlag flag={!assignee}>
      {assignee && (
        <a href={assignee.html_url} className="flex">
          <img
            height="20px"
            width="20px"
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
  assignee?: unknown
  assignees?: unknown[]
}): any {
  const assignee = card.assignee
    ? card.assignee
    : card.assignees
    ? card.assignees[0]
    : null

  return assignee
}
