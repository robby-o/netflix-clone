import Head from 'next/head'
import { FC } from 'react'
import Banner from '../components/banner/Banner'
import SectionCards from '../components/card/SectionCards'
import NavBar from '../components/nav/NavBar'

import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from '../lib/videos'

import styles from '@/styles/Home.module.css'

export type Video = {
  id: string
  title: string
  imgUrl: string
}

export type HomeProps = {
  disneyVideos: Video[]
  productivityVideos: Video[]
  travelVideos: Video[]
  popularVideos: Video[]
  watchItAgainVideos: Video[]
  mappedData: Video[]
}

// getInitialProps?
export const getServerSideProps = async () => {
  const disneyVideos: Video[] = await getVideos('disney trailer')
  console.log(Date.now(), 'start')
  console.log('making request for disney')
  const productivityVideos: Video[] = await getVideos('productivity')
  console.log('making request for productivity')
  const travelVideos: Video[] = await getVideos('travel')
  console.log('making request for travel')
  const popularVideos: Video[] = await getPopularVideos()
  console.log('making request for popular')
  console.log(Date.now(), 'end')

  const userId = 'did:ethr:0x62Fa020fF49f61c90668ad11889793A6c9DdFf28'
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3N1ZXIiOiJkaWQ6ZXRocjoweDYyRmEwMjBmRjQ5ZjYxYzkwNjY4YWQxMTg4OTc5M0E2YzlEZEZmMjgiLCJwdWJsaWNBZGRyZXNzIjoiMHg2MkZhMDIwZkY0OWY2MWM5MDY2OGFkMTE4ODk3OTNBNmM5RGRGZjI4IiwiZW1haWwiOiJydWdjYXRjaGVyQGdtYWlsLmNvbSIsIm9hdXRoUHJvdmlkZXIiOm51bGwsInBob25lTnVtYmVyIjpudWxsLCJ3YWxsZXRzIjpbXSwiaWF0IjoxNjc3MzcyMjU0LCJleHAiOjE2Nzc5NzcwNTQsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIiwiYWRtaW4iXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciIsIngtaGFzdXJhLXVzZXItaWQiOiJkaWQ6ZXRocjoweDYyRmEwMjBmRjQ5ZjYxYzkwNjY4YWQxMTg4OTc5M0E2YzlEZEZmMjgifX0.ict4OmuXbANtYtX6eAeXjeibL0jUYNrUoZqDOfpWQWQ'

  const watchItAgainVideos = await getWatchItAgainVideos(userId, token)

  return {
    props: {
      disneyVideos,
      productivityVideos,
      travelVideos,
      popularVideos,
      watchItAgainVideos,
    },
  }
}

const Home: FC<HomeProps> = ({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
  watchItAgainVideos,
  // mappedData,
}) => {
  console.log({ watchItAgainVideos })
  return (
    <>
      <main className={styles.container}>
        <Head>
          <title>Netflix Clone</title>
          <meta
            name='description'
            content='Generated by create next app'
          />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1'
          />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <main className={styles.main}>
          <NavBar />
          <Banner
            imgUrl='/static/clifford.webp'
            subTitle='a very cute dog'
            title='Clifford the red dog'
            videoId='4zH5iYM4wJo'
          />

          <div className={styles.sectionWrapper}>
            <SectionCards
              title='Disney'
              videos={disneyVideos}
              // videos={mappedData}
              size='large'
            />

            <SectionCards
              title='Watch it again'
              videos={watchItAgainVideos}
              size='small'
            />

            <SectionCards
              title='Travel'
              videos={travelVideos}
              // videos={mappedData}
              size='small'
            />

            <SectionCards
              title='Productivity'
              videos={productivityVideos}
              // videos={mappedData}
              size='medium'
            />

            <SectionCards
              title='Popular'
              videos={popularVideos}
              // videos={mappedData}
              size='small'
            />
          </div>
        </main>
      </main>
    </>
  )
}

export default Home
