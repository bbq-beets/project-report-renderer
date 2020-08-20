import moment from 'moment'

type Props = {
  dateTime: moment.MomentInput
}

export default function TimeAgo(props: Props) {
  const time = moment(props.dateTime)
  return (
    <time
      dateTime={time.toISOString()}
      title={time.toLocaleString()}
      suppressHydrationWarning
    >
      {time.fromNow()}
    </time>
  )
}
