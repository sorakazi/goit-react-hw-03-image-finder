import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';
import styles from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={styles.Loader}>
        <div className={styles.loaderBox}>
          <TailSpin color="#e84f20" strokeWidth={7} height={150} width={150} />
        </div>
      </div>
    );
  }
}

export default Loader;
