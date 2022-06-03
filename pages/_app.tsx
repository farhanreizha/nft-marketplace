import 'shared/globals.css'
import type { AppProps } from 'next/app'
import { BaseLayout } from 'components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  )
}

export default MyApp
