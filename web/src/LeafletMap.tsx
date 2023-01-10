import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet"

interface MarkerPosition {
  latitude: number
  longitude: number
}

type LeafletMapProps = {
  markers: MarkerPosition[]
}

const LeafletMap = <T extends MarkerPosition>({ markers }: LeafletMapProps) => {
  return (
    <MapContainer
      center={[52.0914, 5.1115]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ minHeight: 400, minWidth: 400 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[52.0914, 5.1115]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}
