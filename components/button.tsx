import React from 'react';
import styles from '@/styles/button.module.css';
import inter from "@/fonts/inter";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  className = '',
  disabled = false,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    inter.variable,
    fullWidth ? styles.fullWidth : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;