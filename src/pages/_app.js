import { TokenProvider } from '@/components/idk/tokenContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
  <>
  <TokenProvider>
  <Component {...pageProps} />
  </TokenProvider>
  </>
  )
}
