import 'shared/globals.css'
import type { AppProps } from 'next/app'
import { BaseLayout } from '@ui'
import { Web3Provider } from '@providers'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <ToastContainer/>
    <Web3Provider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Web3Provider>
  </>
  )
}

export default MyApp
