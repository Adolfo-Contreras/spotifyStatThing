
import { Inter } from 'next/font/google'
import SearchF from '@/components/search'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main>
        <SearchF></SearchF>
      </main>
    </>
  )
}
