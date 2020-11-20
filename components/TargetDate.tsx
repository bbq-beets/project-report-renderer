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
        {new Date(props.targetDate).toLocaleDateString()}
      </time>
    )
  } else {
    return <NullData />
  }
}
