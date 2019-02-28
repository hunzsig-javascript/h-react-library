import React, { Component } from 'react';
import OSS from 'ali-oss';
import axios from 'axios';

class AliossWrite extends Component {
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

  // 因为我们需要与表单一起上传,所以默认是不去上传到后台服务器.
  beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.onOssStart(this, DRIVER_LICENSE_PATH, file).then(data => {
        this.setState(({ imageList }) => ({
          imageList: [{
            uid: file.uid,
            name: file.name,
            status: file.status,
            type: file.type,
            result: data.name,
            url: reader.result,
          }],
        }));
      });
    };
    return false;
  };

  onOssStart = () => {
    if (this.token === null) {
      console.log('init token yet');
      return;
    }
    if (this.client === null) {
      console.log('init client yet');
      return;
    }
    const url = `${path}/${file.name.split('.')[0]}-${file.uid}.${file.type.split("/")[1]}`;
    return new Promise((resolve, reject) => {
      client(self).multipartUpload(url, file).then(data => {
        resolve(data);
      }).catch(error => {
        reject(error)
      })
    })
  };

  render() {
    return (
      <div className="alioss">
        <button onClick={this.onOssStart}>点击看看</button>
      </div>
    );
  }
}

export default AliossWrite;
