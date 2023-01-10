import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet"

interface MarkerProps {
  latitude: number
  longitude: number
  name: string
}

type LeafletMapProps = {
  markers: MarkerProps[]
}

export const LeafletMap = ({ markers }: LeafletMapProps) => {
  return (
    <MapContainer
      center={[52.0914, 5.1115]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ minHeight: 400, minWidth: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m) => (
        <CameraMarker {...m} />
      ))}
    </MapContainer>
  )
}

const CameraMarker = ({ latitude, longitude, name }: MarkerProps) => {
  return (
    <Marker position={[latitude, longitude]}>
      <Popup>{name}</Popup>
    </Marker>
  )
}
