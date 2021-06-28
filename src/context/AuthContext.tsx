import { createContext, useState, useEffect, ReactNode } from 'react';
import { auth, firebase } from "../services/firebase";

interface IUser {
  id: string;
  name: string;
  avatar: string;
}

interface IAuthContext {
  user: IUser | undefined;
  SignInWithGoogle: () => Promise<void>;
}

interface IProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

const AuthContextProvider = (props: IProps) => {
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const SignInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const result = await auth.signInWithPopup(provider)
      
    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      SignInWithGoogle 
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContextProvider }