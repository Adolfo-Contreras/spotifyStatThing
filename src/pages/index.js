
import { Inter } from 'next/font/google'
import SearchF from '@/components/search'
import { RankUI } from '@/components/rankui'
import { ExampleArtist } from '@/components/SpotifyProfile'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <main>
    <Link href="/front">go to three</Link>
    <SearchF></SearchF>
    <RankUI></RankUI>
    </main>
    </>
  )
}
