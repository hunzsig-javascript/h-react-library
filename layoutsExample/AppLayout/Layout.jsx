import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import './Layout.scss';
import Auth from './../../common/Auth';
import Api from '../../common/Api';
import I18n from "../../common/I18n";

export default class AppLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    if (Auth.isOnline() === false) {
      Toast.fail(I18n.translate('loginOffline'), 3.00);
      if (window.location.hostname.indexOf('127.0.0.1') === 0 || window.location.hostname.indexOf('localhost') === 0) {
        this.props.history.replace('/sign/in');
      } else {
        this.props.history.replace(Auth.getLoginPath());
      }
    }
  }

  componentDidMount() {
    Api.cache('User.Info.getInfo', { uid: Auth.getUid() }, (resUser) => {
      if (resUser.code === 200) {
        // nothing
      } else {
        Toast.fail(resUser.response);
      }
    });
  }

  to = (url) => {
    this.props.history.push(url);
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
