import axios from 'axios'
import env from '../env'

export default async function ytMain(search: string): Promise<any> {
  const {data} = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=${search}&type=video&videoDefinition=high&key=${env.YT_TOKEN}`
  )

  const result = data.items.map((item: any) => {
    return {title: item.snippet.title, videoId: item.id.videoId}
  })

  return result
}
