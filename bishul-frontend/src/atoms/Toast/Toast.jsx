import { useEffect, useState } from 'react'
import styles from './Toast.module.css'

/**
 * Atom: Toast
 * Notificación temporal que aparece en la esquina superior derecha.
 *
 * @param {{ message, type, onClose }} props
 * type: 'success' | 'error' | 'info'
 */
const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger entrada
    const showTimer = setTimeout(() => setVisible(true), 10)
    // Trigger salida
    const hideTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300) // espera a que termine la animación
    }, duration)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [duration, onClose])

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  }

  return (
    <div className={`${styles.toast} ${styles[type]} ${visible ? styles.visible : ''}`}>
      <span className={styles.icon}>{icons[type]}</span>
      <span className={styles.message}>{message}</span>
      <button className={styles.close} onClick={() => { setVisible(false); setTimeout(onClose, 300) }}>✕</button>
    </div>
  )
}

export default Toast
