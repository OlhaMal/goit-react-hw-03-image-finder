import { Component } from 'react';
import { fetchImages } from 'components/api/fetchImages';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Error } from 'components/Error/Error';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  // В state зберігається пустий масив images, в який буде записуватись відповідь від api,
  // в status - статус, від якого залежить що буде рендеритись на сторінку,
  // в pageNumber - новер сторінки, зміна якого відбувається по кліку на кнопку "Load more", що, у свою чергу, запускає повторний запит на api,
  // в loadMore записується результат віднімання від 12 довжину масиву, що приходить,
  // в showModal - буль, що відповідає за рендер модільного вікна,
  //  в largeImageUrl записується посилання на оригінальне зображення, яке можна буде відкрити в модальному вікні
  state = {
    images: [],
    status: 'idle',
    pageNumber: 1,
    loadMore: null,
    showModal: false,
    largeImageUrl: '',
  };

  // При кліку на "Load more" додає 1 до номеру поточної сторінки, що змушує повторити запит на api і зарендерити нові зображення.
  handleLoadMore = () => {
    this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
  };
  // Перевіряє чи попередній запит відрізнається від поточного і чи попередній номер сторінки відрізняється від поточного
  // Якщо відрізняється запит, то очищує images і ставить статус 'pending' і відправляє повторний запит на api
  // Якщо відрізняється номер сторінки, то відправляє запит на api і розпиляє отриманий масив і поточний. Від довжини масиву записує отримане
  // значення в loadMore, щоб це потім можна було використати для рендеру кнопки "Load more". Змінює статус на "pending".
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

  // Під час кліку по зображенню, в state записується imageURL і викликається метод toggleModal.
  getLargeUrl = imageUrl => {
    this.setState({ largeImageUrl: imageUrl });
    this.toggleModal();
  };

  // Змінює буль в showModal на протилежний, що використовується для рендеру модального вікна
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, status, loadMore, largeImageUrl, showModal } = this.state;
    const { inputValue } = this.props;

    // Якщо status рівний значенню 'idle', то не рендериться нічого. Таке значення тільки на початку.
    if (status === 'idle') {
      return '';
    }

//     if (status === 'resolved') {
//       return (
//         <ImageGalleryItem images={images} loadLargeUrl={this.getLargeUrl}>
//           {loadMore === 0 && <Button onLoadMore={this.handleLoadMore} />}
//           {showModal && (
//             <Modal onClose={this.toggleModal} imgUrl={largeImageUrl} />
//           )}
//         </ImageGalleryItem>
//       );
//     }

//     if (status === 'rejected') {
//       return <Error inputValue={inputValue} />;
//     }

//     if (status === 'pending') {
//       return <Loader />;
//     }
  }
}

// ImageGallery.propTypes = {
//   inputValue: PropTypes.string.isRequired,
// }