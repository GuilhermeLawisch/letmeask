// import { FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import cx from 'classnames';

import logoImg from '../assets/images/logo.svg';
import logoWhiteImg from '../assets/images/logoWhite.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Toggle } from "../components/Toggle";

// import { useAuth } from "../hooks/useAuth";
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss';
import { Question } from "../components/Question";

import { database } from "../services/firebase";
import { useContext } from "react";
import { ToggleContext } from "../context/ToggleContext";

interface IRoomParams {
  id: string;
}

const AdminRoom = () => {
  // const { user } = useAuth();
  const history = useHistory()
  const params = useParams<IRoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId)

  const { theme } = useContext(ToggleContext)

  const handleEndRoom = async () => {
    await database.ref(`/rooms/${roomId}`).update({
      endedAt: new Date()
    })

    history.push('/')
  }

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`/rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta')) {
      await database.ref(`/rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  const toastClick = () => {
    toast.success('Successfully', {
      style: {
        border: '1px solid #835AFD',
        padding: '18px',
        color: '#835AFD',
      },
      iconTheme: {
        primary: '#835AFD',
        secondary: '#FFFAEE',
      }
    });
  }
  
  return (
    <>
      <div id="page-room" className={cx(
        { theme: theme }
      )}>
        <header>
          <div className="content">
            <img src={theme ? logoWhiteImg : logoImg} alt="Letmeask" />
            <Toggle />
            <div>
              <div onClick={toastClick}>
                <RoomCode code={roomId} theme={theme}/>
              </div>
              <Button isOutlined onClick={handleEndRoom} theme={theme}>Encerrar sala</Button>
            </div>
          </div>
        </header>

        <main>
          <div className="room-title">
            <h1>{title}</h1>
            { questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>

          <div className="question-list">
            {questions.map(value => {
              return (
                <Question 
                  key={value.id}
                  content={value.content} 
                  author={value.author}
                  isAnswered={value.isAnswered}
                  isHighlighted={value.isHighlighted}
                >
                  {!value.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleCheckQuestionAsAnswered(value.id)}
                      >
                        <img src={checkImg} alt="Marcar pergunta como respondida" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(value.id)}
                      >
                        <img src={answerImg} alt="Dar destaque à pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(value.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
              )
            })}
          </div>
        </main>
      </div>
    </>
  )
}

export { AdminRoom };