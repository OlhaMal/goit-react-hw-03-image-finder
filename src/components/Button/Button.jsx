import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onLoadMore }) => (
  <div className={css.buttonContainer}>
    <button type="button" onClick={onLoadMore} className={css.loadMoreBtn}>
      {' '}
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};