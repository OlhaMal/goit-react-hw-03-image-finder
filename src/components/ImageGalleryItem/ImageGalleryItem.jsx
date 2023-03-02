import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, children, loadLargeUrl }) => (
  <div className={css.galleryContainer}>
    <ul className={css.gallery}>
      {images.map(({ largeImageURL, id, webformatURL, tags }) => (
        <li key={id} className={css.galleryItem}>
          <img
            src={webformatURL}
            alt={tags}
            className={css.galleryImg}
            onClick={() => {
              loadLargeUrl(largeImageURL, tags);
            }}
          />
        </li>
      ))}
    </ul>
    {children}
  </div>
);

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.exact({
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  children: PropTypes.node.isRequired,
  loadLargeUrl: PropTypes.func.isRequired,
};