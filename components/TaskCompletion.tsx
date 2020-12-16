type Props = {
  body: string
}

/**
 * Computes and renders the amount of completed and total tasks from an issue body
 *
 * @param props
 */
export default function TaskCompletion(props: Props) {
  const unfinishedTasksCount = (props.body.match(/- \[ \]/g) || []).length
  const finishedTasksCount = (props.body.match(/- \[[xX]\]/g) || []).length
  const total = unfinishedTasksCount + finishedTasksCount
  const finishedPercent = total !== 0 ? (100 * finishedTasksCount) / total : 0
  return (
    <span>
      {`${finishedTasksCount}/${total}`}
      {total !== 0 ? (
        <div style={{height: '15px'}} className="bg-gray-500 rounded">
          <div
            style={{
              height: '15px',
              width: `${finishedPercent}%`,
              float: 'left'
            }}
            className="bg-blue-300 rounded"
          ></div>
        </div>
      ) : null}
    </span>
  )
}
