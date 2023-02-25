import { FC } from 'react'
import Card from './Card'
import styles from './SectionCards.module.css'
import { Video } from '@/pages'

type SectionCardProps = {
  title: string
  videos: Video[]
  size: string
}

const SectionCards: FC<SectionCardProps> = ({
  title,
  videos = [],
  size,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => (
          <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} />
        ))}
      </div>
    </section>
  )
}

export default SectionCards
