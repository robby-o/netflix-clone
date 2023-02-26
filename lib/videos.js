import videoTestData from '../data/videos.json'

const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY_TWO
  const BASE_URL = 'youtube.googleapis.com/youtube/v3'

  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`,
    {
      headers: {
        method: 'GET',
        'Access-Control-Allow-Origin': 'https://www.youtube.com',
      },
    }
  )

  return await response.json()
}

export const getCommonVideos = async (url) => {
  try {
    const isDev = process.env.DEVELOPMENT
    const data = isDev ? videoTestData : await fetchVideos(url)
    if (data?.error) {
      console.error('Youtube API error', data.error)
      return []
    }

    return data?.items.map((item) => {
      const id = item.id?.videoId || item.id
      const snippet = item.snippet
      return {
        title: snippet?.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      }
    })
  } catch (error) {
    console.error('Something went wrong with video library', error)
    return []
  }
}

export const getVideos = (searchQuery) => {
  const url = `search?part=snippet&q=${searchQuery}&type=video`
  return getCommonVideos(url)
}

export const getPopularVideos = () => {
  const url =
    'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US'

  return getCommonVideos(url)
}

export const getYoutubeVideoById = (videoId) => {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`

  return getCommonVideos(url)
}
