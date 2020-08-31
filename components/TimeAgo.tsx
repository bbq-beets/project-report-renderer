import moment from 'moment'

type Props = {
  dateTime: moment.MomentInput
}

/**
 * Renders a datetime as "time ago", and ensures there are no React hydration
 * warnings.
 *
 * @param props
 */
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
