import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { magic } from '../../lib/magic-client'
import { MagicPayloadMethod, UserInfo } from '@magic-sdk/types'

import styles from './Navbar.module.css'

const NavBar = () => {
  const [showDropDown, setShowDropDown] = useState(false)
  const [username, setUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function getUsername() {
      try {
        // const { email }: UserInfo = await magic.user.getMetadata()
        const { email } = await magic.user.getMetadata()
        if (email) {
          setUsername(email)
        }
      } catch (error) {
        console.log('Error retrieving email:', error)
      }
    }
    getUsername()
  }, [])

  const handleOnClickHome = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const handleOnClickMyList = (e) => {
    e.preventDefault()
    router.push('/browse/my-list')
  }

  const handleShowDropDown = (e) => {
    e.preventDefault()
    setShowDropDown(!showDropDown)
  }

  const handleSignOut = async (e) => {
    e.preventDefault()

    try {
      router.push('/login')
      await magic.user.logout()
    } catch (error) {
      console.log('Error signing out', error)
      router.push('/login')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Link href='/'>
              <Image
                src='/static/netflix.svg'
                alt='Netflix logo'
                width={128}
                height={34}
              />
            </Link>
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={handleShowDropDown}
            >
              <p className={styles.username}>{username}</p>
              <Image
                src='/static/expand_more.svg'
                alt='Expand dropdown'
                width={24}
                height={24}
              />
            </button>

            {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link
                    className={styles.linkName}
                    href='/login'
                    onClick={handleSignOut}
                  >
                    Sign out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar
