
import { Inter } from 'next/font/google'
import SearchF from '@/components/search'
import { TokenProvider } from '@/components/idk/tokenContext'
import TokenRefresh from '@/components/idk/getToken'
import { RankUI } from '@/components/rankui'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <main>
    <SearchF></SearchF>
    {/* <RankUI></RankUI> */}
    </main>
    </>
  )
}
