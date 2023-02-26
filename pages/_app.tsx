import type { AppProps } from 'next/app'
import { Roboto_Slab } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../components/loading/Loading'
import Layout from '../components/layout/Layout'
import { magic } from '../lib/magic-client'
import '../styles/globals.css'

const robotoslab = Roboto_Slab({
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn()
      if (isLoggedIn) {
        // route to /
        router.push('/')
      } else {
        // route to /login
        router.push('/login')
      }
    }
    handleLoggedIn()
  }, [])

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false)
    }
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])
  return (
    <main className={robotoslab.className}>
      {isLoading ? <Loading /> : <Component {...pageProps} />}
    </main>
  )
}
