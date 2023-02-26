import { FC } from 'react'
import Card from './Card'
import styles from './SectionCards.module.css'
import { Video } from '@/pages'
import Link from 'next/link'

type SectionCardProps = {
  size: string
  title: string
  videos: Video[]
  shouldWrap: boolean
  shouldScale: boolean
  isMyList: boolean
}

const SectionCards: FC<SectionCardProps> = ({
  title,
  videos = [],
  size,
  shouldWrap = false,
  shouldScale,
  isMyList,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={`${styles.cardWrapper} 
        ${shouldWrap && styles.wrap} ${isMyList && styles.justify}`}
      >
        {videos.map((video, idx) => (
          <Link
            href={`/video/${video.id}`}
            key={video.id}
            className={`${isMyList && styles.spacing}`}
          >
            <Card
              id={idx}
              imgUrl={video.imgUrl}
              size={size}
              shouldScale={shouldScale}
            />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SectionCards
