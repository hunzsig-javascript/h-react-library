import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import I18n from "../../common/I18n";

export default class BasicNotFound extends Component {
  render() {
    return (
      <div className="basic-not-found" style={styles.notFoundContainer}>
        <div style={styles.notfoundContent}>
          <div className="prompt">
            <h3 style={styles.title}>{I18n.translate('sorryPageLost')}</h3>
            <p style={styles.description}>
              {I18n.translate('pageNotFound')}<Link to="/">{I18n.translate('homepage')}</Link>
              {I18n.translate('continue')}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  notFoundContainer: {
    minHeight: '100vh',
    background: '#fff',
  },
  notfoundContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
  },
  imgNotfound: {
    marginRight: '50px',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    margin: '20px 0',
  },
  description: {
    color: '#666',
    fontSize: '16px',
  },
};
