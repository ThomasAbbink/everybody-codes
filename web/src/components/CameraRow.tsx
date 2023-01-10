import { Camera } from "../types"

type CameraRowProps = { camera: Camera }

export const CameraRow = ({ camera }: CameraRowProps) => {
  return (
    <tr>
      <td>{camera.number}</td>
      <td>{camera.name}</td>
    </tr>
  )
}
