import { useState, useContext } from 'react';
import { FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoWhiteImg from '../assets/images/logoWhite.svg';

import { Button } from '../components/Button';
import { Toggle } from '../components/Toggle';
import { database } from '../services/firebase';
import cx from 'classnames';
import '../styles/auth.scss';

import { ToggleContext } from '../context/ToggleContext';

const NewRoom = () => {
  const history = useHistory()
  const { user } = useAuth()
  const [newRoom, setNemRoom] = useState('')
  
  const { theme } = useContext(ToggleContext)

  const handleCreateNewRoom = async (event: FormEvent) => {
    event.preventDefault()

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`)
  }

  return (
    <>
      <div id="page-auth">
        <aside className="aside">
          <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
          <strong>Crie salas Q&amp;A ao-vivo</strong>
          <p>Tire as dúvidas da sua audiência em tempo-real</p>
        </aside>

        <main className={cx(
          'main',
          { theme: theme }
        )}>
          <div className="main-content">
            <Toggle />
            <img src={theme ? logoWhiteImg : logoImg} alt="Letmeask" />
            <h2>Criar nova sala</h2>
            <form onSubmit={handleCreateNewRoom}>
              <input 
                type="text"
                placeholder="Nome da sala"
                onChange={event => setNemRoom(event.target.value)}
                value={newRoom}
              />
              <Button type="submit">
                Criar na sala
              </Button>
            </form>
            <p>Quer entrar em uma sala existente <Link to="/">Clique aqui</Link></p>
          </div>
        </main>
      </div>
    </>
  )
}

export { NewRoom };