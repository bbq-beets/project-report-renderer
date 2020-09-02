import classnames from 'classnames'
import {Card} from 'project-reports'
import {useCallback} from 'react'
import styles from './ReportCard.module.css'

export type Stats = {
  proposed: Card[]
  accepted: Card[]
  inProgress: Card[]
  done: Card[]
  warn: Card[]
  alert: Card[]
  activeGt3Wk: Card[]
  noTarget: Card[]
  pastTarget: Card[]
}

type Props = Stats & {
  totals: Stats
  inProgressFlag: boolean
  activeExpand: keyof Stats | null
  setExpand: (key: keyof Stats) => void
}

/**
 * Render a "report card"-style view of values grouped by status.
 *
 * The component doesn't know about what it's representing—it just accepts
 * status and their related numbers.
 *
 * @param props
 */
export default function ReportCard(props: Props) {
  const {activeExpand, setExpand} = props

  const Square = useCallback(
    (props: {
      title: string
      statKey: keyof Stats
      value: number
      isActive: boolean
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
        [styles.alert]: props.alert,
        [styles.active]: props.isActive
      })

      return (
        <div className={classNames} onClick={() => setExpand(props.statKey)}>
          <span className={styles.title}>{props.title}</span>

          <div className={styles.value}>
            <span>{props.value}</span>
            {props.total != null && (
              <span className={styles.total}> / {props.total}</span>
            )}
          </div>
        </div>
      )
    },
    [setExpand]
  )

  return (
    <div className="w-full">
      <div className={styles.reportCard}>
        <Square
          isActive={activeExpand === 'proposed'}
          title="Proposed"
          statKey="proposed"
          value={props.proposed.length}
          total={props.totals.proposed.length}
        />

        <Square
          title="Accepted"
          isActive={activeExpand === 'accepted'}
          statKey="accepted"
          value={props.accepted.length}
          total={props.totals.accepted.length}
        />

        <Square
          title="In Progress"
          isActive={activeExpand === 'inProgress'}
          alert={props.inProgressFlag}
          statKey="inProgress"
          value={props.inProgress.length}
          total={props.totals.inProgress.length}
        />

        <div className={styles.squareGroup}>
          <Square
            title="Warning"
            isActive={activeExpand === 'warn'}
            statKey="warn"
            value={props.warn.length}
            warn={props.warn.length > 0}
            total={props.totals.warn.length}
            halfSize
          />

          <Square
            title="Alert"
            isActive={activeExpand === 'alert'}
            statKey="alert"
            value={props.alert.length}
            total={props.totals.alert.length}
            alert={props.alert.length > 0}
            halfSize
          />
        </div>

        <Square
          title="Active > 3 Weeks"
          isActive={activeExpand === 'activeGt3Wk'}
          statKey="activeGt3Wk"
          value={props.activeGt3Wk.length}
          warn={props.activeGt3Wk.length > 0}
          total={props.totals.activeGt3Wk.length}
        />

        <Square
          title="Past Target Date"
          isActive={activeExpand === 'pastTarget'}
          statKey="pastTarget"
          value={props.pastTarget.length}
          warn={props.pastTarget.length > 0}
          total={props.totals.pastTarget.length}
        />

        <Square
          title="No Target Date"
          isActive={activeExpand === 'noTarget'}
          statKey="noTarget"
          value={props.noTarget.length}
          warn={props.noTarget.length > 0}
          total={props.totals.noTarget.length}
        />

        <Square
          title="Done"
          isActive={activeExpand === 'done'}
          statKey="done"
          value={props.done.length}
          total={props.totals.done.length}
        />
      </div>
    </div>
  )
}
