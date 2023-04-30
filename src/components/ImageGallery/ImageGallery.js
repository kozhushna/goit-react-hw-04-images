import PropTypes from 'prop-types';
import { useState } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

import css from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  const [state, setState] = useState({
    showModal: false,
    src: '',
    alt: '',
  });

  const showModalPopup = (src, alt) => {
    setState({ showModal: true, src: src, alt: alt });
  };

  const { src, alt, showModal } = state;
  return (
    <>
      <ul className={css.gallery}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              tags={image.tags}
              onImageClick={showModalPopup}
            />
          );
        })}
      </ul>
      {showModal && (
        <Modal
          src={src}
          alt={alt}
          onClose={() => {
            setState(prevState => ({ ...prevState, showModal: false }));
          }}
        />
      )}
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onImageClick: PropTypes.func,
};
