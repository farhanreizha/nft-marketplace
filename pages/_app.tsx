import 'shared/globals.css'
import type { AppProps } from 'next/app'
import { BaseLayout } from '@ui'
import { Web3Provider } from '@providers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3Provider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Web3Provider>
  )
}

export default MyApp
