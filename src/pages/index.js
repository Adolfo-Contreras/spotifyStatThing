
import { Inter } from 'next/font/google'
import SearchF from '@/components/search'
import { RankUI } from '@/components/rankui'
import { ExampleArtist } from '@/components/SpotifyProfile'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <main className='p-3.5'>
    <SearchF></SearchF>
    {/* <RankUI></RankUI> */}
    <ExampleArtist></ExampleArtist>
    </main>
    </>
  )
}
