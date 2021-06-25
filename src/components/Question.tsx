import { ReactNode } from 'react';
import cx from 'classnames';
import '../styles/question.scss';

type IQuestion = {
  children?: ReactNode;
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  isAnswered?: boolean;
  isHighlighted?: boolean; 
}

export const Question = ({ 
  content, 
  author, 
  isAnswered = false,
  isHighlighted = false,
  children }: IQuestion) => {

  return (
    <div 
      // className={`question ${isAnswered ? 'answered' : '' } ${isHighlighted ? 'highlighted' : '' }`}
      className={cx(
        'question',
        { isAnswered: isAnswered },
        { isHighlighted: isHighlighted && !isAnswered}
      )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div className="buttons">
          {children}
        </div>
      </footer>
    </div>
  )
}