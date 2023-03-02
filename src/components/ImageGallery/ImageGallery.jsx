import { Component } from 'react';
import { fetchImages } from 'services/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Error } from 'components/Error/Error';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    pageNumber: 1,
    loadMore: null,
    showModal: false,
    largeImageUrl: '',
    tags: '',
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.inputValue;
    const nextName = this.props.inputValue;
    if (prevName !== nextName) {
      this.setState({ images: [], status: 'pending' });
    }
    if (
      prevName !== nextName ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      fetchImages(nextName, this.state.pageNumber)
        .then(e => {
          this.setState(prevState => ({
            images: [...prevState.images, ...e],
            status: e.length === 0 ? 'rejected' : 'resolved',
            loadMore: 12 - e.length,
          }));
        })
        .catch(error => console.log(error));
    }
  }

  getLargeUrl = (imageUrl, tagNames) => {
    this.setState({ largeImageUrl: imageUrl, tags: tagNames });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, status, loadMore, largeImageUrl, showModal, tags } = this.state;
    const { inputValue } = this.props;

    if (status === 'resolved') {
        return (
          <ImageGalleryItem images={images} loadLargeUrl={this.getLargeUrl}>
            {loadMore === 0 && <Button onLoadMore={this.handleLoadMore} />}
            {showModal && (
              <Modal onClose={this.toggleModal} imgUrl={largeImageUrl} tags={tags}/>
            )}
          </ImageGalleryItem>
        );
      }
  
      if (status === 'rejected') {
        return <Error inputValue={inputValue} />;
      }
  
      if (status === 'pending') {
        return <Loader />;
      }
    }
  
}

ImageGallery.propTypes = {
    inputValue: PropTypes.string.isRequired,
  }