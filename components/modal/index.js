import { useCallback, useRef } from 'react';
import Photo from '../frame';
import styles from './styles.module.css';

export default function Modal({ photo, onDismiss }) {
  const overlay = useRef();
  const wrapper = useRef();

  const onClick = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper]
  );

  return (
    <div ref={overlay} className={styles.overlay} onClick={onClick}>
      <div ref={wrapper} className={styles.wrapper}>
        <Photo photo={photo} />
      </div>
    </div>
  );
}
