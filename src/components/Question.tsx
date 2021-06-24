import { ReactNode } from 'react';
import '../styles/question.scss';

type IQuestion = {
  children?: ReactNode;
  content: string;
  author: {
    name: string;
    avatar: string;
  }
}

export const Question = ({ content, author, children }: IQuestion) => {

  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}