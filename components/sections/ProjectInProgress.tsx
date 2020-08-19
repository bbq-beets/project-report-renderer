import {ReportSection} from '../../lib/reports'
import {getStatusEmoji} from '../../lib/util'
import CardAssignee from '../CardAssignee'

type Props = ReportSection['data']

export default function ProjectInProgress(props: Props) {
  const cards = props.cards as any[]

  const lastUpdated = (card: any) => {
    let lastUpdated = card.lastUpdatedAgo
    if (card.flagLastHoursUpdated) {
      return (lastUpdated += ' 🚩')
    }
    return lastUpdated
  }

  return (
    <>
      <h2>⏳ In Progress {props.cardType}</h2>

      <p>Sorted by status and then in progress time descending</p>

      <table>
        <thead>
          <tr>
            <th>Assignee</th>
            <th>Title</th>
            <th>Status</th>
            <th>Previous Status</th>
            <th>Last Updated</th>
            <th>In Progress</th>
          </tr>
        </thead>

        <tbody>
          {cards.map(card => (
            <tr key={card.number}>
              <td>
                <CardAssignee card={card} />
              </td>
              <td>
                <a href={card.html_url}>{card.title}</a>
              </td>
              <td>{getStatusEmoji(card.status)}</td>
              <td>{getStatusEmoji(card.previousStatus)}</td>
              <td>{lastUpdated(card)}</td>
              <td>{card.inProgressSince}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
