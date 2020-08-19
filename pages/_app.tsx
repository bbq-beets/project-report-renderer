import {BaseStyles, Box} from '@primer/components'
import '@primer/css/dist/primer.css'
import {AppPropsType} from 'next/dist/next-server/lib/utils'
import Link from 'next/link'

export default function App({Component, pageProps}: AppPropsType) {
  return (
    <BaseStyles>
      <Box
        width="100%"
        maxWidth="1024px"
        marginX="auto"
        marginY="32px"
        paddingX="16px"
        className="text-gray-dark"
      >
        <header className="border-bottom mb-4 pb-2">
          <h1 className="text-inherit">
            <Link href="/">
              <a className="text-inherit">Project Reports</a>
            </Link>
          </h1>
        </header>

        <Component {...pageProps} />
      </Box>
    </BaseStyles>
  )
}
