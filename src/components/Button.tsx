import { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
  theme?: boolean;
}

const Button = ({ isOutlined = false, theme, ...props }: ButtonProps) => {
  return (
    <button 
      className={cx(
        'button',
        { theme: theme },
        { outlined: isOutlined },
      )}
      {...props} 
    />
  )
}

export { Button }