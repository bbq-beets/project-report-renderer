import {AppPropsType} from 'next/dist/next-server/lib/utils'
import '../styles/base.css'

export default function App({Component, pageProps}: AppPropsType) {
  return (
    <div className="container mx-auto my-4 px-4">
      <Component {...pageProps} />
    </div>
  )
}
