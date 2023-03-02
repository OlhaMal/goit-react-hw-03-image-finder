import PropTypes from 'prop-types';
import { MdImageNotSupported } from 'react-icons/md';
import css from './Error.module.css';

export const Error = ({ inputValue }) => (
  <div className={css.alert}>
    <MdImageNotSupported size="15em" className={css.alertSvg} />
    <p className={css.alertMessage}>
      Sorry, there are no images matching your search "{inputValue}".
      <br /> Please try again.
    </p>
  </div>
);

Error.propTypes = {
  inputValue: PropTypes.string.isRequired,
};