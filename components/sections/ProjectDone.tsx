import moment from 'moment'
import {ReportSection} from '../../lib/reports'
import CardAssignee from '../CardAssignee'

type Props = ReportSection['data']

export default function ProjectDone(props: Props) {
  const cards = props.cards as any[]
  const typeLabel = props.cardType === '*' ? '' : props.CardType
  const now = moment()

  return (
    <>
      <h2>
        🏁 Completed {typeLabel} Last {props.daysAgo} Days
      </h2>

      {cards.length ? (
        <table>
          <thead>
            <tr>
              <th>Assignee</th>
              <th>Title</th>
              <th>Completed</th>
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
                <td suppressHydrationWarning>
                  {now.to(moment(card.project_done_at))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        `No ${props.cardType}s found`
      )}
    </>
  )
}
