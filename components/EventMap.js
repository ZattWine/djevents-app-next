import Image from 'next/image'
import { useEffect, useState } from 'react'
import ReactMapGl, { Marker } from 'react-map-gl'
import Geocode from 'react-geocode'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function EventMap({ evt }) {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [loading, setLoading] = useState(true)
  const [viewport, setViewport] = useState({
    latitude: -0.12764739999999997,
    longitude: 51.507321899999994,
    width: '100%',
    height: '500px',
    zoom: 12,
  })

  useEffect(async () => {
    try {
      // Get latitude & longitude from address.
      const response = await Geocode.fromAddress(evt.address)
      const { lat, lng } = await response.results[0].geometry.location
      setLat(lat)
      setLng(lng)
      setViewport({ ...viewport, latitude: lat, longitude: lng })
      setLoading(false)
    } catch (error) {
      // try mapbox reverse geocodeing
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${evt.address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        // center: [longitude, latitude]
        const lng = await data.features[0].center[0]
        const lat = await data.features[0].center[1]
        setLat(lat)
        setLng(lng)
        setViewport({ ...viewport, latitude: lat, longitude: lng })
        setLoading(false)
      } else {
        setLat(-0.12764739999999997)
        setLng(51.507321899999994)
        setLoading(false)
      }
    }
  }, [])

  Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY)

  if (loading) return false

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <Marker key={evt.id} latitude={lat} longitude={lng}>
        <Image src='/images/pin.svg' width={30} height={30} />
      </Marker>
    </ReactMapGl>
  )
}
