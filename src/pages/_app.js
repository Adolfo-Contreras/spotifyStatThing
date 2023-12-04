import { TokenProvider } from '@/context/tokenContext'
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