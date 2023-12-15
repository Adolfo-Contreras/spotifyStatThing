import { TokenProvider } from '@/context/tokenContext'
import { SongsProvider } from '@/context/songsContext'
import '@/styles/globals.css'
export default function App({ Component, pageProps }) {
  return (
  <>
  <TokenProvider>
    <SongsProvider>
      <Component {...pageProps} />
    </SongsProvider>
  </TokenProvider>
  </>
  )
}