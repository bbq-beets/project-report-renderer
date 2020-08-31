/**
 * Renders "null" data.
 *
 * This component exists to ensure "null" data is rendered the same way across
 * all tables.
 */
export default function NullData() {
  return <span className="flex-1 text-gray-400">—</span>
}
