import {BaseStyles} from '@primer/components'
import {AppPropsType} from 'next/dist/next-server/lib/utils'

export default function App({Component, pageProps}: AppPropsType) {
  return (
    <BaseStyles>
      <Component {...pageProps} />
    </BaseStyles>
  )
}
