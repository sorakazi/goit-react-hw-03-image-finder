import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const  ImageGallery = ({ images }) => {
  return (
    <>
      {images.length > 0 ?
      <ul className={css.gallery}>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
          />
        ))}
      </ul> : null }
    </>
  );
};

export  default ImageGallery;
