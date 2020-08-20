import {TextInput} from '@primer/components'
import dynamic from 'next/dynamic'
import {useState} from 'react'
import {
  Row,
  TableOptions,
  useGlobalFilter,
  useSortBy,
  useTable
} from 'react-table'

/* eslint-disable-next-line @typescript-eslint/ban-types */
type Props<T extends object> = TableOptions<T>

const TableRow = dynamic(() => import('./table/TableRow'))

const FILTER_THRESHOLD = 4

/* eslint-disable-next-line @typescript-eslint/ban-types */
export default function Table<T extends object>(props: Props<T>) {
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
  } = useTable(props, useGlobalFilter, useSortBy)

  return (
    <div className="width-full width-fit overflow-x-auto">
      <table {...getTableProps()} className="border">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="border p-2 user-select-none"
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
              <th colSpan={visibleColumns.length} className="text-left p-2">
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
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="border p-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </TableRow>
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
    <span className="d-flex flex-items-center">
      <span>Filter:</span>
      <TextInput
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records...`}
        className="flex-1 ml-2 text-normal"
      />
    </span>
  )
}
