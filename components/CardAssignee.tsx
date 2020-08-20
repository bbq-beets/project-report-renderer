import DataWithFlag from './DataWithFlag'

type Props = any

export default function CardAssignee({card}: Props) {
  const assignee = getAssignee(card)

  return (
    <DataWithFlag flag={!assignee}>
      {assignee && (
        <>
          <img
            height="20px"
            width="20px"
            alt={`@${assignee.login}`}
            src={assignee.avatar_url}
          />
          <a href={assignee.html_url}>{assignee.login}</a>
        </>
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
