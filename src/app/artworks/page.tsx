import axios from "axios"
import Link from "next/link"
import { usePathname } from "next/navigation"

function loadCustomArtworks (page: number, limit: number) {
  const FIELDS = 'id,title,image_id,thumbnail,artist_title,date_display,dimensions_detail,description,classification_title,classification_titles'
  const url = `https://api.artic.edu/api/v1/artworks/search/?fields=${FIELDS}&page=${page}&limit=${limit ?? 10}`
  let cancel

  return axios.get(url, {
    cancelToken: new axios.CancelToken(c => cancel = c),
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(error => {
    throw Error("FETCHING ARTWORKS FAILED.")
  }) 
  .finally(() => {
    // setLoading(false)
  })
}


export default async function Artworks() {

  const artworks = await loadCustomArtworks(0, 10);
  console.dir(artworks.data.data, {depth: null})
  return (
    <div>
      {artworks.data.data.map((art:any) => 
        <div key={art.id}> 
          <Link href={`${'/artworks/' + art.id}`}>{art.title}</Link>
        </div>
      )}
    </div>
  )
}