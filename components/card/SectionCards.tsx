import { FC } from 'react'
import Card from './Card'
import styles from './SectionCards.module.css'
import { Video } from '@/pages'
import Link from 'next/link'

type SectionCardProps = {
  size: string
  title: string
  videos: Video[]
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
          <Link key={idx} href={`/video/${video.id}`}>
            <Card id={idx} imgUrl={video.imgUrl} size={size} />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SectionCards
