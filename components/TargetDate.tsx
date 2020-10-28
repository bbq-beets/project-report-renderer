type Props = {
  targetDate?: Date
}

/**
 * Renders a datetime as a local date
 *
 * @param props
 */
export default function TargetDate(props: Props) {
  return <div>{formatTargetDate(props.targetDate)}</div>
}

function formatTargetDate(target_date?: Date) {
  if (!target_date) {
    return '-'
  }
  return new Date(target_date).toLocaleDateString()
}
