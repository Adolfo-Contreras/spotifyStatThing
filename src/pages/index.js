import { TokenProvider } from '@/components/tokenContext';
import { TokenRefresh } from "@/components/getToken";

export default function Home() {
  return (
    <>
    <main>
    <TokenProvider>
    <TokenRefresh></TokenRefresh>
    </TokenProvider>
    </main>
    </>
  )
}
