import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import {
  Splitter,
  SplitterSide,
  SplitterContent,
  Page,
  List,
  ListItem,
  Icon,
} from 'react-onsenui';
import './Layout.scss';
import Auth from './../../common/Auth';
import Api from '../../common/Api';
import I18n from "../../common/I18n";

const leftMenu = [
  { label: '商城', icon: 'md-home', url: '/shop' },
  { label: '我的', icon: 'md-tab', url: '/user' },
];

export default class AppLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      allow: false,
      leftMenuIsOpen: false,
      userInfo: {},
    };
    const shopCode = location.hash.split('/')[1];
    Auth.setShopCode(shopCode);
    Auth.setLoginPath('/' + shopCode + '/sign/sign?prev_url=' + encodeURIComponent(location.href));
    if (Auth.isOnline() === false) {
      Toast.fail(I18n.translate('loginOffline'), 3.00);
      if (window.location.hostname.indexOf('127.0.0.1') === 0 || window.location.hostname.indexOf('localhost') === 0) {
        this.props.history.replace('/' + shopCode + '/sign/testIn');
      } else {
        this.props.history.replace(Auth.getLoginPath());
      }
      this.state.allow = false;
    } else {
      this.state.allow = true;
    }
  }

  componentDidMount() {
    if (this.state.allow === true) {
      Api.cache('User.Info.getInfo', { uid: Auth.getUid(), withThis: true }, (resUser) => {
        if (resUser.code === 200) {
          this.setState({
            userInfo: resUser.data,
          });
        } else {
          Toast.fail(resUser.response);
        }
      });
    }
  }

  to = (url) => {
    this.props.history.push(url);
  };

  leftMenuToggle = (status) => {
    this.setState({ leftMenuIsOpen: status });
  };

  render() {
    return (
      <Splitter>
        <SplitterSide
          style={styles.leftMenuIsOpen}
          side="left"
          width="auto"
          collapse={true}
          swipeable={true}
          animation="push"
          isOpen={this.state.leftMenuIsOpen}
          onClose={this.leftMenuToggle.bind(this, false)}
          onOpen={this.leftMenuToggle.bind(this, true)}
        >
          <Page>
            <List>
              {
                leftMenu.map((lm, idx) => {
                  return (
                    <ListItem key={idx} tappable={true} onClick={this.to.bind(this, lm.url)}>
                      <div className="left">
                        <Icon icon={lm.icon} />
                      </div>
                      <div className="center">
                        {lm.label}
                      </div>
                    </ListItem>
                  );
                })
              }
            </List>
          </Page>
        </SplitterSide>
        <SplitterContent>
          {this.state.allow === true && this.props.children}
        </SplitterContent>
      </Splitter>
    );
  }
}

const styles = {
  leftMenuIsOpen: {
    borderRight: '1px solid #ccc',
  },
};
