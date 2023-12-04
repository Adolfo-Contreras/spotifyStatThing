
import { Inter } from 'next/font/google'

import ThreeScene from '@/components/ThreeScene'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   
    <>    
      <div>
        <h1>
          hello
        </h1>
      </div>
      
      <div className='h-screen w-screen flex object-contain justify-center static'>
        <ThreeScene />
      </div>
    </>
   
  )
}
