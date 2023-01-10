import { Camera } from "../types"
import { CameraRow } from "./CameraRow"

type CameraTableProps = {
  cameras: Camera[]
  title: string
}

export const CameraTable = ({ title, cameras }: CameraTableProps) => {
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
