import "./App.css"
import { useEffect, useState } from "react"
import { CameraTable } from "./components/CameraTable"
import { LeafletMap } from "./components/LeafletMap"
import { fizzBuzz } from "./fizzbuzz"
import { Camera } from "./types"

function App() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [fizzBuzzed, setFizzbuzzed] = useState<Camera[][]>([[], [], [], []])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8080")
      return res.json()
    }

    fetchData()
      .then((json) => {
        setCameras(json)
      })
      .catch((error) => {
        // TODO: show a nice error
        console.error(error)
      })
  }, [])

  useEffect(() => {
    const fizzBuzzed = fizzBuzz<Camera>(cameras)
    setFizzbuzzed(fizzBuzzed)
  }, [cameras])

  return (
    <div className="App">
      <LeafletMap markers={cameras} />
      <div className="container">
        <CameraTable cameras={fizzBuzzed[0]} title={"Divisible by 3"} />
        <CameraTable cameras={fizzBuzzed[1]} title={"Divisible by 5"} />
        <CameraTable cameras={fizzBuzzed[2]} title={"Divisible by 3 and 5"} />
        <CameraTable cameras={fizzBuzzed[3]} title={"Other"} />
      </div>
    </div>
  )
}

export default App
