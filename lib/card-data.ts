export function getCardAssignee(card: any) {
  return card.assignee
    ? card.assignee
    : card.assignees
    ? card.assignees[0]
    : null
}
