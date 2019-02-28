import React, { Component } from 'react';
import { Upload } from '@icedesign/base';
import { FormBinder as IceFormBinder } from '@icedesign/form-binder';
import { message } from 'antd';

const { ImageUpload } = Upload;
const getExtFromUrl = (url) => {
  if (!url) return undefined;
  return url.split('.').pop();
};

export default class DesktopFormAliossWrite extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.col = this.props.col;
    this.className = this.props.className;
    this.defaultFileList = this.props.defaultFileList;
    this.val = this.props.val;
    this.state = {};
  }
  componentDidMount() {}
  uploadFormatter = (res) => {
    const result = res;
    if (res.code === 200) {
      result.code = '0';
      result.size = res.data.size;
      result.imgURL = res.data.thumb;
      result.downloadURL = res.data.url.source;
    }
    return result;
  };
  uploadValueFormatter = (res) => {
    const fileList = [];
    res.fileList.forEach((file) => {
      fileList.push({
        name: (file.response && file.response.data.name) ? file.response.data.name : file.fileName,
        ext: (file.response && file.response.data.ext) ? file.response.data.ext : file.ext ? file.ext : getExtFromUrl(file.downloadURL),
        type: (file.response && file.response.data.type) ? file.response.data.type : file.type,
        size: (file.response && file.response.data.size) ? file.response.data.size : file.size,
        url: (file.response && file.response.data.url) ? file.response.data.url : { source: file.downloadURL },
        imgURL: file.imgURL,
        downloadURL: file.downloadURL,
      });
    });
    return fileList;
  };
  onUploadSuccess = () => {
    message.success('上传成功');
  };
  onUploadError = (res) => {
    message.error('上传失败：' + res.response.response || '');
  };

  render() {
    return (
      <IceFormBinder name={this.val.field} valueFormatter={this.uploadValueFormatter}>
        <ImageUpload
          action="/hupload"
          multiple={true}
          className={`fromItemWidth${this.col} ${this.val.type}`}
          listType={(this.val.params && this.val.params.listType) ? this.val.params.listType : 'picture-card'}
          defaultFileList={this.defaultFileList}
          {...this.val.params}
          formatter={this.uploadFormatter}
          onSuccess={this.onUploadSuccess}
          onError={this.onUploadError}
        />
      </IceFormBinder>
    );
  }
}
