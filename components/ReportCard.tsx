import classnames from 'classnames'
import styles from './ReportCard.module.css'

type Stats = {
  proposed: number
  accepted: number
  inProgress: number
  done: number
  warn: number
  alert: number
  activeGt3Wk: number
  noTarget: number
  pastTarget: number
}

type Props = Stats & {totals: Stats}

export default function ReportCard(props: Props) {
  const Square = (props: {
    title: string
    value: number
    total?: number
    warn?: boolean | null
    alert?: boolean | null
    width?: string | null
    height?: string | null
    halfSize?: boolean
  }) => {
    const classNames = classnames({
      [styles.square]: true,
      [styles.halfSize]: props.halfSize,
      [styles.warn]: props.warn,
      [styles.alert]: props.alert
    })

    return (
      <div className={classNames}>
        <span className={styles.title}>{props.title}</span>

        <div className={styles.value}>
          <span>{props.value}</span>
          {props.total != null && (
            <span className={styles.total}> / {props.total}</span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.reportCard}>
      <Square
        title="Proposed"
        value={props.proposed}
        total={props.totals.proposed}
      />

      <Square
        title="Accepted"
        value={props.accepted}
        total={props.totals.accepted}
      />

      <Square
        title="In Progress"
        value={props.inProgress}
        total={props.totals.inProgress}
      />

      <div className={styles.squareGroup}>
        <Square
          title="Warning"
          value={props.warn}
          warn={props.warn > 0}
          total={props.totals.warn}
          halfSize
        />

        <Square
          title="Alert"
          value={props.alert}
          total={props.totals.alert}
          alert={props.alert > 0}
          halfSize
        />
      </div>

      <Square
        title="Active > 3 Weeks"
        value={props.activeGt3Wk}
        warn={props.activeGt3Wk > 0}
        total={props.totals.activeGt3Wk}
      />

      <Square
        title="Past Target Date"
        value={props.pastTarget}
        warn={props.pastTarget > 0}
        total={props.totals.pastTarget}
      />

      <Square
        title="No Target Date"
        value={props.noTarget}
        warn={props.noTarget > 0}
        total={props.totals.noTarget}
      />

      <Square title="Done" value={props.done} total={props.totals.done} />
    </div>
  )
}
