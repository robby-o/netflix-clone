import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { magic } from '../lib/magic-client'

import styles from '../styles/Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [userMsg, setUserMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

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

  const handleOnChangeEmail = (e) => {
    setUserMsg('')
    const email = e.target.value
    setEmail(email)
  }

  const handleLoginWithEmail = async (e) => {
    e.preventDefault()

    if (email) {
      if (email === 'rugcatcher@gmail.com') {
        // log in a user by their email
        try {
          setIsLoading(true)
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          })
          if (didToken) {
            router.push('/')
          }
        } catch (error) {
          console.error('Something went wrong logging in', error)
        }
      } else {
        setUserMsg('Enter a valid email address')
        console.log('Something went wrong logging in')
      }
    } else {
      setUserMsg('Enter a valid email address')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href='/'>
            <div className={styles.logoWrapper}>
              <Image
                src='/static/netflix.svg'
                alt='Netflix logo'
                width='128'
                height='34'
              />
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <form>
            <input
              type='email'
              name='email'
              placeholder='Email address'
              className={styles.emailInput}
              onChange={handleOnChangeEmail}
            />

            <p className={styles.userMsg}>{userMsg}</p>
            <button
              onClick={handleLoginWithEmail}
              type='submit'
              className={styles.loginBtn}
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login
