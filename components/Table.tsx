import dynamic from 'next/dynamic'
import {TableInstance} from 'react-table'

/* eslint-disable-next-line @typescript-eslint/ban-types */
type Props<T extends object> = {
  table: TableInstance<T>
}

const TableRow = dynamic(() => import('./table/TableRow'))

/* eslint-disable-next-line @typescript-eslint/ban-types */
export default function Table<T extends object>(props: Props<T>) {
  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow
  } = props.table

  return (
    <div className="width-full width-fit overflow-x-auto">
      <table {...getTableProps()} className="border">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="border p-2">
                  {column.render('Header')}
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
