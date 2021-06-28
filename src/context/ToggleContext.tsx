import { useState } from 'react';
import { ReactNode, createContext } from 'react';

interface IToggleContext {
  theme: boolean;
  toggleTheme: () => void;
}

interface IProps {
  children: ReactNode;
}

export const ToggleContext = createContext({} as IToggleContext);

const ToggleContextProvider = (props: IProps) => {
  const [theme, setTheme] = useState(false)

  const toggleTheme = () => {
    setTheme(!theme)
  }

  return (
    <ToggleContext.Provider value={{ 
      theme, 
      toggleTheme 
    }}>
      {props.children}
    </ToggleContext.Provider>
  )
}

export { ToggleContextProvider };