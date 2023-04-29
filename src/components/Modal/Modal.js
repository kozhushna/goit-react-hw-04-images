import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from './Modal.module.css';

export default function Modal({ src, alt, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};
