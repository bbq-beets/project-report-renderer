import {AppPropsType} from 'next/dist/next-server/lib/utils'
import Link from 'next/link'
import '../styles/base.css'

export default function App({Component, pageProps}: AppPropsType) {
  return (
    <div className="container mx-auto my-4 px-4">
      <header className="border-b mb-8 pb-4">
        <h1>
          <Link href="/">
            <a>Project Reports</a>
          </Link>
        </h1>
      </header>

      <Component {...pageProps} />
    </div>
  )
}
