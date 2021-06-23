import copySvg from "../assets/images/copy.svg";
import '../styles/room-code.scss';

interface IRoomCodeProps {
  code: string;
}

const RoomCode = (props: IRoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copySvg} alt="Copy room code" />
      </div>
      <span>Sala {props.code}</span>
    </button>
  )
}

export { RoomCode };