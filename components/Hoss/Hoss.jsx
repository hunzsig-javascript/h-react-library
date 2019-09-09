import React, { Component } from 'react';
import { List } from 'immutable';
import { Upload } from '@icedesign/base';
import { FormBinder as IceFormBinder } from '@icedesign/form-binder';
import { message, Button, Icon } from 'antd';
import Auth from '../../common/Auth';

import './Hoss.scss';
import I18n from "../../common/I18n";

const { ImageUpload } = Upload;
const { CropUpload } = Upload;
const { DragUpload } = Upload;

// TODO HOSS上传固定http方式，ws无效

export default class Hoss extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.col = this.props.col;
    this.className = this.props.className;
    this.val = this.props.val;
    this.field = this.props.field;
    this.state = {
      defaultFileList: List(this.props.defaultFileList || []),
    };
    this.max = this.val.params && this.val.params.max || 99;
  }

  componentDidMount() {}

  uploadFormatter = (res) => {
    const result = {};
    if (res.code === 200) {
      const resultData = res.data[0];
      if (resultData.assets_error === 0) {
        result.code = 0;
        result.name = resultData.assets_file_name;
        result.size = resultData.assets_file_size;
        result.contentType = resultData.assets_content_type;
        result.ext = resultData.assets_file_ext;
        result.imgURL = resultData.assets_file_image;
        result.downloadURL = resultData.assets_download_url;
        console.log(result);
      } else {
        result.error = resultData.assets_error;
      }
    }
    return result;
  };

  beforeUpload = () => {
    if (this.state.defaultFileList.size >= this.max) {
      message.warning(I18n.translate('uploadOnlyAllow') + this.max + I18n.translate('files'));
      return false;
    }
    return true;
  };

  onUploadSuccess = () => {
    message.success(I18n.translate('uploadSuccess'));
  };
  onUploadError = (res) => {
    message.error(I18n.translate('uploadFail') + I18n.translate(':') + (res.response.error || ''));
  };

  renderUpload = (type) => {
    let tpl = null;
    switch (type) {
    case 'uploadHossImage':
      tpl = (
        <ImageUpload
          action="/api/http"
          className={`fromItemWidth${this.col} ${this.val.type}`}
          listType="picture-card"
          defaultFileList={this.state.defaultFileList.toJS()}
          formatter={this.uploadFormatter}
          beforeUpload={this.beforeUpload}
          onSuccess={this.onUploadSuccess}
          onError={this.onUploadError}
          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
          data={{
            post: JSON.stringify({
              scope: 'Assets.Hoss.upload',
              client_id: Auth.getClientId(),
              auth_uid: Auth.getUid(),
            }),
          }}
          locale={{
            image: {
              cancel: I18n.translate('uploadCancel'),
              addPhoto: I18n.translate('upload') + this.val.name,
            },
          }}
          {...this.val.params}
        />
      );
      break;
    case 'uploadHossDrag':
      tpl = (
        <DragUpload
          action="/api/http"
          className={`fromItemWidth${this.col} ${this.val.type}`}
          listType="picture-card"
          defaultFileList={this.state.defaultFileList.toJS()}
          formatter={this.uploadFormatter}
          beforeUpload={this.beforeUpload}
          onSuccess={this.onUploadSuccess}
          onError={this.onUploadError}
          data={{
            post: JSON.stringify({
              scope: 'Assets.Hoss.upload',
              client_id: Auth.getClientId(),
              auth_uid: Auth.getUid(),
            }),
          }}
          locale={{
            image: {
              cancel: I18n.translate('uploadCancel'),
              addPhoto: I18n.translate('upload') + this.val.name,
            },
          }}
          {...this.val.params}
        />
      );
      break;
    case 'uploadHossCrop':
      tpl = (
        <div>
          <CropUpload
            action="/api/http"
            className={`fromItemWidth${this.col} ${this.val.type}`}
            formatter={this.uploadFormatter}
            beforeCrop={this.beforeUpload}
            onSuccess={(res) => {
              this.onUploadSuccess();
              this.state.defaultFileList = this.state.defaultFileList.push({
                name: res.name,
                ext: res.ext,
                type: res.contentType,
                size: res.size,
                downloadURL: res.downloadURL,
                imgURL: res.imgURL,
              });
              this.setState({
                defaultFileList: this.state.defaultFileList,
              });
              if (typeof this.props.setValue === 'function') {
                this.props.setValue(this.state.defaultFileList.toJS());
              }
            }}
            onError={this.onUploadError}
            data={{
              post: JSON.stringify({
                scope: 'Assets.Hoss.upload',
                client_id: Auth.getClientId(),
                auth_uid: Auth.getUid(),
              }),
            }}
            {...this.val.params}
          >
            <Button type="primary" size="small" style={{ margin: '0 0 10px' }}>
              <Icon type="scissor" />
              {I18n.translate('upload')}
              {this.val.name}
            </Button>
          </CropUpload>
          <div ref="cropViewer" style={{ margin: "5px 0 10px 0" }}>
            {
              this.state.defaultFileList.map((df, dfidx) => {
                return (
                  <div key={dfidx} className="next-upload-list next-upload-list-picture-card">
                    <div className="next-upload-list-item next-upload-list-item-done">
                      <div className="next-upload-list-item-info">
                        <div className="next-upload-list-item-thumbnail">
                          <div style={{ backgroundImage: `url(${df.imgURL})`, backgroundSize: '100%' }} />
                        </div>
                        <span className="next-upload-list-item-name">{df.name}</span>
                        <span className="next-upload-tool ">
                          <a className="pointer" href={df.downloadURL} target="_blank"><i className="next-icon next-icon-download next-icon-medium next-upload-tool-download-icon" /></a>
                          <a
                            className="pointer"
                            onClick={() => {
                              this.state.defaultFileList = this.state.defaultFileList.delete(dfidx);
                              this.setState({
                                defaultFileList: this.state.defaultFileList,
                              });
                              if (typeof this.props.setValue === 'function') {
                                this.props.setValue(this.state.defaultFileList.toJS());
                              }
                            }}
                          >
                            <i className="next-icon next-icon-ashbin next-icon-medium" />
                          </a>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      );
      break;
    case 'uploadHoss':
    default:
      tpl = (
        <Upload
          directory
          action="/api/http"
          className={`fromItemWidth${this.col} ${this.val.type}`}
          listType={(this.val.params && this.val.params.listType) ? this.val.params.listType : 'text'}
          defaultFileList={this.state.defaultFileList.toJS()}
          formatter={this.uploadFormatter}
          beforeUpload={this.beforeUpload}
          onSuccess={this.onUploadSuccess}
          onError={this.onUploadError}
          data={{
            post: JSON.stringify({
              scope: 'Assets.Hoss.upload',
              client_id: Auth.getClientId(),
              auth_uid: Auth.getUid(),
            }),
          }}
          {...this.val.params}
        >
          <Button type="primary" size="small" style={{ margin: '0 0 10px' }}>
            <Icon type="upload" />
            {I18n.translate('upload')}
            {this.val.name}
          </Button>
        </Upload>
      );
      break;
    }
    return tpl;
  };

  render() {
    return (
      <IceFormBinder
        className="hoss"
        type="array"
        name={this.val.field}
        valueFormatter={(res) => {
          const fileList = [];
          if (res.fileList) {
            res.fileList.forEach((fd) => {
              let name = fd.name;
              let ext = fd.ext;
              let type = fd.type;
              let size = fd.size;
              let downloadURL = fd.downloadURL;
              let imgURL = fd.imgURL;
              if (fd.response && fd.response.name) {
                name = fd.response.name;
                ext = fd.response.ext;
                type = fd.response.contentType;
                size = fd.response.size;
                downloadURL = fd.response.downloadURL;
                imgURL = fd.response.imgURL;
              }
              fileList.push({
                name: name,
                ext: ext,
                type: type,
                size: size,
                downloadURL: downloadURL,
                imgURL: imgURL,
              });
            });
            this.setState({
              defaultFileList: List(fileList),
            });
          }
          return fileList;
        }}
      >
        {this.renderUpload(this.val.type)}
      </IceFormBinder>
    );
  }
}
