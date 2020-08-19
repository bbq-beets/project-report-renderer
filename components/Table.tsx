import dynamic from 'next/dynamic'
import {TableOptions, useSortBy, useTable} from 'react-table'

/* eslint-disable-next-line @typescript-eslint/ban-types */
type Props<T> = TableOptions<T>

const TableRow = dynamic(() => import('./table/TableRow'))

/* eslint-disable-next-line @typescript-eslint/ban-types */
export default function Table<T extends object>(props: Props<T>) {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(props, useSortBy)

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
