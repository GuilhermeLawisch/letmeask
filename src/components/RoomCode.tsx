import cx from 'classnames';
import copySvg from "../assets/images/copy.svg";
import '../styles/room-code.scss';

interface IRoomCodeProps {
  code: string;
  theme: boolean;
}

const RoomCode = (props: IRoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(props.code)
  }

  return (
    <button className={cx(
      "room-code",
      { theme: props.theme }
    )} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copySvg} alt="Copy room code" />
      </div>
      <span>Sala {props.code}</span>
    </button>
  )
}

export { RoomCode };