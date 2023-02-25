import { Fragment } from 'react'
import styles from '../../styles/Home.module.css'
import Navbar from '../nav/NavBar'

const Layout = ({ children }) => {
  return (
    <main className={styles.main}>
      <Navbar />
      <Fragment>{children}</Fragment>
    </main>
  )
}

export default Layout
