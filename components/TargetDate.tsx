import moment from 'moment'

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
        return '-'
    }
}

function formatTargetDate(target_date?: Date) {
    if (!target_date) {
        return '-'
    }
    return new Date(target_date).toLocaleDateString()
}
