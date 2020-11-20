import moment from 'moment'
import NullData from './NullData'

type Props = {
  targetDate?: Date
}

/**
 * Renders a datetime as a local date
 * @param props
 */
export default function TargetDate(props: Props) {
  if (props.targetDate) {
    return (
      <time dateTime={moment(props.targetDate).format('YYYY-MM-DD')}>
        {formatTargetDate(props.targetDate)}
      </time>
    )
  } else {
    return <NullData />
  }
}

function formatTargetDate(target_date: Date) {
  return new Date(target_date).toLocaleDateString()
}
