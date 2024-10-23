import styles from './button.module.css'

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  selected?: boolean
}

function Button({children, onClick, className, selected} : ButtonProps) {
  const selectedStyle = selected ? styles.selected : "";
  return (
    <button className={[styles.button, selectedStyle, className].join(' ')} onClick={onClick}>{children}</button>
  )
}

export default Button