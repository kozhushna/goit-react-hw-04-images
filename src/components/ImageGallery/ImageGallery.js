import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

import css from './ImageGallery.module.css';

class ImageGallery extends Component {
  state = {
    showModal: false,
    src: '',
    alt: '',
  };

  showModal = (src, alt) => {
    this.setState({ src, alt, showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { showModal, src, alt } = this.state;
    return (
      <>
        <ul className={css.gallery}>
          {this.props.images.map(image => {
            return (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                tags={image.tags}
                onImageClick={this.showModal}
              />
            );
          })}
        </ul>
        {showModal && <Modal src={src} alt={alt} onClose={this.closeModal} />}
      </>
    );
  }
}

export default ImageGallery;

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
