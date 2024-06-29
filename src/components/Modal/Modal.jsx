import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    tags: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { image, tags } = this.props;
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <button onClick={e => {e.stopPropagation(); this.props.onClose();}} className={styles.closeButton}>x</button>
          <img src={image} alt={tags} onClick={e => e.stopPropagation()} />
        </div>
      </div>
    );
  }
}

export default Modal;
