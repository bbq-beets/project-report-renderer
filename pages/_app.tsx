import {BaseStyles, Box} from '@primer/components'
import '@primer/css/dist/primer.css'
import {AppPropsType} from 'next/dist/next-server/lib/utils'

export default function App({Component, pageProps}: AppPropsType) {
  return (
    <BaseStyles>
      <Box width="100%" maxWidth="1024px" marginX="auto">
        <Component {...pageProps} />
      </Box>
    </BaseStyles>
  )
}
