import React, { Component } from 'react';
import { Layout, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import Auth from './../../common/Auth';
import Api from '../../common/Api';

import './Layout.scss';
import I18n from "../../common/I18n";

const { Content } = Layout;

class hLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    if (Auth.isOnline() === false) {
      message.error(I18n.translate('loginOffline'), 3.00);
      this.props.history.replace(Auth.getLoginPath());
    }
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Layout style={style.FullHV}>
        <Content style={style.Content} id="layout">
          {this.props.children}
        </Content>
      </Layout>
    );
  }
}

const style = {
  loading: { width: '100%', marginTop: '100px' },
  FullHV: { minHeight: '100hv' },
  Layout: { height: '100hv', display: 'flex', flexDirection: 'column' },
  Header: { margin: 0, padding: 0 },
  HeaderMenu: { lineHeight: '50px' },
  Content: { margin: 0, background: '#ffffff' },
};

export default withRouter(hLayout);
