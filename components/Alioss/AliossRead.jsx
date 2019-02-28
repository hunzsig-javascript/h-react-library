import React, { Component } from 'react';
import OSS from 'ali-oss';
import axios from 'axios';

class AliossRead extends Component {
  static defaultProps = {};
  constructor(props) {
    super(props);
    this.token = null;
    this.client = null;
    this.state = {};
    console.log(OSS);
  }
  componentDidMount() {
    axios
      .post('/aliossStsRead')
      .then((response) => {
        if (typeof response.data === 'object') {
          if (response.data.code === 200) {
            this.token = response.data.data;
            this.client = new OSS.Wrapper({
              accessKeyId: this.token.AccessKeyId,
              accessKeySecret: this.token.AccessKeySecret,
              stsToken: this.token.SecurityToken,
              endpoint: this.token.Endpoint,
              bucket: this.token.Bucket,
            });
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  onOssStart = () => {
    if (this.token === null) {
      console.log('init token yet');
      return;
    }
    if (this.client === null) {
      console.log('init client yet');
      return;
    }
    this.client.list({
      'max-keys': 10,
    }).then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log(err);
    });
  };

  render() {
    return (
      <div className="alioss">
        <button onClick={this.onOssStart}>点击看看</button>
      </div>
    );
  }
}

export default AliossRead;
