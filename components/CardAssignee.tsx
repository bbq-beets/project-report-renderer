type Props = any

export default function CardAssignee({card}: Props) {
  const assignee = getAssignee(card)

  if (assignee) {
    return (
      <>
        <img
          height="20px"
          width="20px"
          alt={`@${assignee.login}`}
          src={assignee.avatar_url}
        />
        &nbsp;<a href={assignee.html_url}>{assignee.login}</a>
      </>
    )
  } else {
    return <>🚩</>
  }
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
