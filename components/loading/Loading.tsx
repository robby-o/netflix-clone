import styles from './loading.module.css'

const Loading = () => {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.loader}>Loading...</p>
      </div>
    </main>
  )
}

export default Loading
