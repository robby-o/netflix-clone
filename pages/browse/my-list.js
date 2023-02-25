import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { magic } from '../../lib/magic-client'
import NavBar from '../../components/nav/NavBar'

import styles from '../../styles/my-list.module.css'

const MyList = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <main className={styles.main}>
        <NavBar />
      </main>
    </div>
  )
}

export default MyList
