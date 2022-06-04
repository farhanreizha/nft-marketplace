import 'shared/globals.css'
import type { AppProps } from 'next/app'
import { BaseLayout } from '@ui'
import { Web3Provider } from '@providers'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Web3Provider>
        <Component {...pageProps} />
      </Web3Provider>
    </BaseLayout>
  )
}

export default MyApp
