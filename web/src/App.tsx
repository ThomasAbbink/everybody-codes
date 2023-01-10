import { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [cameras, setCameras] = useState<Camera[][]>([[], [], [], []])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8080")
      const json = await res.json()
      return json
    }

    fetchData()
      .then((json) => {
        const fizzBuzzed = fizzBuzz<Camera>(json)
        setCameras(fizzBuzzed)
      })
      .catch((error) => {
        // TODO: show a nice error
        console.error(error)
      })
  }, [])

  return (
    <div className="App">
      <div className="container">
        <CameraTable cameras={cameras[0]} title={"Divisible by 3"} />
        <CameraTable cameras={cameras[1]} title={"Divisible by 5"} />
        <CameraTable cameras={cameras[2]} title={"Divisible by 3 and 5"} />
        <CameraTable cameras={cameras[3]} title={"Other"} />
      </div>
    </div>
  )
}

interface FizzBuzzable {
  number: number
}

const fizzBuzz = <T extends FizzBuzzable>(items: T[]): T[][] => {
  return items.reduce(
    (acc, curr) => {
      const { number } = curr
      const column = getColumn(number)
      acc[column].push(curr)
      return acc
    },
    [[], [], [], []] as T[][]
  )
}

const getColumn = (n: number) => {
  if (n % 3 === 0 && n % 5 === 0) {
    return 2
  }
  if (n % 3 === 0) {
    return 0
  }
  if (n % 5 === 0) {
    return 1
  }
  return 3
}

type Camera = {
  code: string
  number: number
  name: string
  latitude: number
  longitude: number
}

type CameraTableProps = {
  cameras: Camera[]
  title: string
}

const CameraTable = ({ title, cameras }: CameraTableProps) => {
  return (
    <div className="table">
      <h4>{title}</h4>
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {cameras.map((cam, index) => (
            <CameraRow camera={cam} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

type CameraRowProps = { camera: Camera }

const CameraRow = ({ camera }: CameraRowProps) => {
  return (
    <tr>
      <td>{camera.number}</td>
      <td>{camera.name}</td>
    </tr>
  )
}

export default App
