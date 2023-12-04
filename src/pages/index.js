
import { Inter } from 'next/font/google'
import SearchF from '@/components/search'
import { RankUI } from '@/components/rankui'
import { ExampleArtist } from '@/components/SpotifyProfile'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <main>
    <SearchF></SearchF>
    <RankUI></RankUI>
    </main>
    </>
  )
}
