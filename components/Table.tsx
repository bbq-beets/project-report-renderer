import classnames from 'classnames'
import {ComponentType, createElement, Fragment, useState} from 'react'
import {
  PluginHook,
  Row,
  TableOptions,
  useExpanded,
  useGlobalFilter,
  useRowState,
  useSortBy,
  useTable
} from 'react-table'
import styles from './Table.module.css'

/* eslint-disable-next-line @typescript-eslint/ban-types */
type Props<T extends object> = TableOptions<T>

const FILTER_THRESHOLD = 4

/**
 * Represent data as a sortable, filterable table.
 *
 * See [react-table
 * documentation](https://react-table.tanstack.com/docs/overview) for
 * instructions on header configuration.
 *
 * @param props
 */
export default function Table<
  /* eslint-disable-next-line @typescript-eslint/ban-types */
  T extends {[key: string]: any; expandContent?: ComponentType<{row: Row<T>}>}
>(props: Props<T>) {
  const plugins: PluginHook<T>[] = [
    useRowState,
    useGlobalFilter,
    useSortBy,
    useExpanded
  ]

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    preGlobalFilteredRows,
    prepareRow,
    setGlobalFilter,
    state,
    visibleColumns
  } = useTable({...props, autoResetExpanded: false}, ...plugins)

  if (props.empty && props.data.length === 0) {
    return props.empty
  }

  const wrapperClassNames = classnames({
    [styles.wrapper]: true,
    [styles.constrainHeight]: props.constrainHeight
  })

  const tableClassNames = classnames({
    [styles.table]: true,
    [styles.fixed]: props.fixed
  })

  return (
    <div className={wrapperClassNames}>
      <table {...getTableProps()} className={tableClassNames}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.className
                      ? typeof column.className === 'string'
                        ? column.className
                        : column.className(column)
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
          {preGlobalFilteredRows.length > FILTER_THRESHOLD ? (
            <tr key="filter">
              <th
                colSpan={visibleColumns.length}
                className={styles.filterHeader}
              >
                <GlobalFilter
                  preGlobalFilteredRows={preGlobalFilteredRows}
                  globalFilter={state.globalFilter}
                  setGlobalFilter={setGlobalFilter}
                />
              </th>
            </tr>
          ) : null}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)

            return (
              <Fragment key={row.getRowProps().key}>
                <tr {...row.getRowProps()} className="even:bg-gray-100">
                  {row.cells.map(cell => {
                    const cellClassNames = `${classnames({
                      [styles.tableCell]: true,
                      [styles.expanded]: row.isExpanded && cell.state?.highlight
                    })} ${
                      cell.column.cellClassName
                        ? typeof cell.column.cellClassName === 'string'
                          ? cell.column.cellClassName
                          : cell.column.cellClassName(cell)
                        : ''
                    }`

                    return (
                      <td {...cell.getCellProps()} className={cellClassNames}>
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>

                {row.isExpanded && row.original.expandContent ? (
                  <tr>
                    <td
                      colSpan={visibleColumns.length}
                      className="p-4 bg-gray-200 shadow-inner"
                    >
                      {createElement(row.original.expandContent, {row})}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

type GlobalFilterProps = {
  preGlobalFilteredRows: Row<any>[]
  globalFilter: string
  setGlobalFilter: (filterValue: string) => void
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}: GlobalFilterProps) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState(globalFilter)

  // BUG: react-table assumes we have a global `regeneratorRuntime`, which isn't true in SSR :(
  // const onChange = useAsyncDebounce(value => {
  //   setGlobalFilter(value || undefined)
  // }, 200)

  const onChange = (value: string) => setGlobalFilter(value)

  return (
    <span className="flex items-center">
      <span>Filter:</span>
      <input
        type="text"
        autoCapitalize="off"
        autoCorrect="off"
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records...`}
        className="flex-1 ml-2 p-2 border rounded shadow-inner"
      />
    </span>
  )
}
