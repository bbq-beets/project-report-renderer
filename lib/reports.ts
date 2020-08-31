import fs from 'fs'
import path from 'path'
import {promisify} from 'util'

const readFile = promisify(fs.readFile)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)
const isDir = async (node: string) => (await stat(node)).isDirectory()
const REPORT_REGEX = /^\d{4}\d{2}\d{2}T\d{2}\d{2}\d{2}\.\d{3}Z$/

export type ReportSection = {
  type: string
  output: {[key: string]: unknown} // TODO: Collect types
}

/**
 * For each report, get its latest data for each of its sections.
 */
export async function getLatestReportsData() {
  const reportPaths = await getReportPaths()
  const reportsData: Record<string, Record<string, ReportSection>> = {}

  for (const reportPath of reportPaths) {
    reportsData[path.basename(reportPath)] = await getLatestReportData(
      reportPath
    )
  }

  return reportsData
}

async function getLatestReportData(reportPath: string) {
  const reports = await getDirsMatching(reportPath, name =>
    REPORT_REGEX.test(name)
  )

  const latestReport = reports.sort().reverse()[0]
  const sections = await getDirsMatching(path.join(latestReport, 'data'))

  const reportData: Record<string, ReportSection> = {}

  for (const section of sections) {
    const rawData = await readFile(path.join(section, 'output.json'))
    const sectionID = path.basename(section)
    reportData[sectionID] = JSON.parse(rawData.toString())
  }

  return reportData
}

function getReportPaths() {
  const reportsDirName = '.reports'
  const reportsDirPath = path.resolve(reportsDirName)
  return getDirsMatching(reportsDirPath, name => !name.startsWith('.'))
}

async function getDirsMatching(
  root: string,
  predicate: (path: string) => boolean = () => true
) {
  const children = await readdir(root)

  // Filter by predicate
  const matchingChildren = children
    .filter(predicate)
    .map(name => path.resolve(root, name))

  // Check is-directory, building [path, isDirectory] tuples
  const childDirResults: [string, boolean][] = await Promise.all(
    matchingChildren.map<Promise<[string, boolean]>>(async child => [
      child,
      await isDir(child)
    ])
  )

  // Return only the children which are directories
  return childDirResults
    .filter(([, isDir]) => isDir)
    .map(([child, _isDir]) => child)
}
