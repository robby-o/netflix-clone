import { useState, FC } from 'react'
import Image from 'next/image'

import cls from 'classnames'
import { motion } from 'framer-motion'

import styles from './Card.module.css'

export type CardProps = {
  id: number
  imgUrl: string
  size: string
}

const classMap: { [size: string]: string } = {
  large: styles.lgItem,
  medium: styles.mdItem,
  small: styles.smItem,
}

const Card: FC<CardProps> = (props) => {
  const {
    imgUrl = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80',
    size = 'medium',
    id,
  } = props

  const [imgSrc, setImgSrc] = useState(imgUrl)

  const handleOnError = () => {
    setImgSrc(
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80'
    )
  }

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 }

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          src={imgSrc}
          alt='image'
          sizes='width: 300px height: 170px, width: 158px height: 280px, width: 218px height: 434px'
          fill
          onError={handleOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  )
}

export default Card
