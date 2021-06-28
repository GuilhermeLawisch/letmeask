import { useContext } from "react";
import { ToggleContext } from "../context/ToggleContext";

import '../styles/toggle.scss';

const Toggle = () => {
  const { theme, toggleTheme } = useContext(ToggleContext)

  return (
    <label className="switch">
      <input type="checkbox" className="input" onChange={() => toggleTheme()} checked={theme}/>
      <span className="slider"/>
    </label>
  )
}

export { Toggle }