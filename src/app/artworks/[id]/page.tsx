import axios from "axios"
import Image from "next/image"
import Link from "next/link"

async function loadArtwork(id: number) {
  const url = `https://api.artic.edu/api/v1/artworks/${id}`
  let cancel

  return axios.get(url, {
    cancelToken: new axios.CancelToken(c => cancel = c),
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      'AIC-User-Agent': 'myrun (denisstefanpinzariu@gmail.com)'
    }
  })
  .catch(error => {
    throw Error("FETCHING ARTWORKS FAILED.")
  }) 
  .finally(() => {
  })
}

type ArtworkProps = {
  params: {
    id: number;
  }
}

export default async function ArtworkPage({ params }: ArtworkProps) {
  const response: any = await loadArtwork(params.id)
  .catch(err => console.log(err))

  if (!response) return <p>This artwork ID does not exist.</p> 

  const artwork = response.data.data;
  const iiif_url = 'https://www.artic.edu/iiif/2/';
  const size_url = '/full/400,/0/default.jpg';
  const larger_size_url = '/full/843,/0/default.jpg';
  
  return (
    <>
      <Link href="/artworks">Return</Link>
      <p>{params.id}</p>
      <p>{artwork.title}</p>
      <p>{artwork.date_start}</p>
      <p>{artwork.date_end}</p>
      <p>{artwork.artist_display}</p>
      <p>{artwork.place_of_origin}</p>
      {/* <p dangerouslySetInnerHTML={{ __html: artwork.description }}></p> */}
      <p>{artwork.dimensions}</p>
      <p>{artwork.medium_display}</p>
      <p>{artwork.artwork_type}</p>
      <p>{artwork.image_id}</p>
      <p>{artwork.thumbnail.alt_text}</p>
      <p>{artwork.thumbnail.lqip}</p>
      <Image src={iiif_url + artwork.image_id + size_url}
        alt={artwork.thumbnail.alt_text}
        width={1000}
        height={1000}
        layout="responsive"
        priority
        unoptimized
      />
    </>
  )
}