import moment from 'moment'
import {ReportSection} from '../../lib/reports'
import CardAssignee from '../CardAssignee'

type Props = ReportSection['data']

export default function ProjectNew(props: Props) {
  const cards = props.cards as any[]
  const typeLabel = props.cardType === '*' ? '' : `${props.cardType}s`
  const now = moment()

  return (
    <>
      <h2>
        👋 Added {typeLabel} Last {props.daysAgo} Days
      </h2>

      <table>
        <thead>
          <tr>
            <th>Assignee</th>
            <th>Title</th>
            <th>Added</th>
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
              <td>{now.to(card.project_added_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
