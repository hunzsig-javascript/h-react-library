import React, { Component } from 'react';
import { Spin, Layout, Menu, Icon, message, Button, notification } from 'antd';
import { withRouter } from 'react-router-dom';
import hRouter from '../../hRouter';
import Img from '../../components/Img';
import Cookie from './../../common/Cookie';
import Auth from './../../common/Auth';
import Api from '../../common/Api';

import './Layout.scss';
import I18n from "../../common/I18n";

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class hLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    // 对应主题相关修正
    this.theme = {
      pathHideType: this.props.h.pathHideType || 'disabled',
      singleMenu: (typeof this.props.h.singleMenu === 'boolean') ? this.props.h.singleMenu : false,
    };
    switch (this.props.h.theme) {
      case 'light':
        this.theme.type = 'light';
        this.theme.headerHeight = '52px';
        break;
      default:
        this.theme.type = 'dark';
        this.theme.headerHeight = '60px';
        break;
    }
    if (Auth.isOnline() === false) {
      message.error(I18n.translate('loginOffline'), 3.00);
      this.props.history.replace(Auth.getLoginPath());
    }
    this.state = {
      collapsed: Number.parseInt(Cookie.get('collapsed'), 10) > 0,
      userInfo: {},
      path: [],
      routerHead: [],
      permissionLoading: true,
      active: [],
      open: [],
    };
    this.routerAll = this.allRouter();
    this.routerFlat = this.flatRouter(this.routerAll);
    this.head = this.getHead();
    if (this.routerFlat[this.head] === undefined) {
      location.href = '/';
      return;
    }
    this.children = this.routerFlat[this.head].children || [];
  }

  componentDidMount() {
    console.log(this.children);
    Api.connect().cache('getUserInfo', { uid: Auth.getUid(), withThis: true }, (resUser) => {
      if (resUser.code === 200) {
        this.setState({
          userInfo: resUser.data,
        });
        Api.cache('System.Data.getInfoForKey', { key: ['path', 'permission'] }, (res) => {
          // path
          if (resUser.data.user_check_path === true) {
            if (res.code === 200) {
              const permissionPath = this.getPermissionPath(resUser.data.user_permission, res.data.permission.system_data_data);
              const path = [];
              res.data.path.system_data_data.forEach((p) => {
                if (!permissionPath.includes(p.key)) {
                  path.push(p.key);
                }
              });
              this.state.path = path;
              this.setState({ path: this.state.path });
              this.routerFlat = this.flatRouter(this.routerAll);
              this.setState({ routerHead: this.headRouter(), active: this.getActive(), open: this.getOpen() });
              this.setState({ permissionLoading: false });
            } else {
              message.error(resUser.response);
            }
          } else {
            this.state.path = [];
            this.setState({ path: this.state.path });
            this.routerFlat = this.flatRouter(this.routerAll);
            this.setState({ routerHead: this.headRouter(), active: this.getActive(), open: this.getOpen() });
            this.setState({ permissionLoading: false });
          }
        });
      } else {
        message.error(resUser.response);
      }
    });
  }

  getPermissionPath = (userPermission, permission, path = [], prevKey = []) => {
    if (!userPermission || !permission) return path;
    permission.forEach((p) => {
      const nextKey = JSON.parse(JSON.stringify(prevKey));
      nextKey.push(p.key);
      let flag = false;
      const tempKey = [];
      for (const i in nextKey) {
        tempKey.push(nextKey[i]);
        if (userPermission.includes(tempKey.join('-'))) {
          flag = true;
          break;
        }
      }
      if (flag) {
        if (p.path && Array.isArray(p.path)) {
          p.path.forEach((pp) => {
            if(!path.includes(pp)) path.push(pp);
          });
        }
      }
      if (p.children && Array.isArray(p.children)) {
        path = this.getPermissionPath(userPermission, p.children, path, nextKey);
      }
    });
    return path;
  };

  getHead = () => {
    return '/' + (this.props.location.pathname.split('/')[1] || 'index');
  };

  getJumpPath = (router, path) => {
    path = path || router.path;
    if (router.children === undefined || router.children.length <= 0) {
      return path;
    }
    for (const child of router.children) {
      if (child.hide !== true && child.disabled !== true) {
        path += child.path;
        path = this.getJumpPath(child, path);
        break;
      }
    }
    return path;
  };

  // 同时重置 routerConfig 的 fullPath
  allRouter = (routers, all, prev) => {
    routers = routers || hRouter.config;
    all = all || [];
    prev = prev || '';
    routers.forEach((val, idx) => {
      if (['/', '*', '/sign'].includes(val.path) === false) {
        val.idx = idx;
        val.fullPath = prev + val.path;
        val.jumpPath = prev + this.getJumpPath(val);
        all.push(val);
        if (val.children !== undefined && Array.isArray(val.children) && val.children.length > 0) {
          all = this.allRouter(val.children, all, prev + val.path);
        }
      }
    });
    return all;
  };

  flatRouter = (routers, flat) => {
    flat = flat || {};
    routers.forEach((val) => {
      flat[val.fullPath] = val;
      if (val.children !== undefined && val.children.length <= 0) {
        flat = this.flatRouter(val.children, flat);
      }
    });
    console.log(flat);
    return flat;
  };

  headRouter = () => {
    const head = [];
    hRouter.config.forEach((val) => {
      if (['/', '*', '/sign'].includes(val.path) === false && val.hide !== true) {
        if (this.state.path.includes(val.jumpPath)) {
          let isOK = false;
          for (const i in val.children) {
            if (!this.state.path.includes(val.children[i].jumpPath)) {
              val.jumpPath = val.children[i].jumpPath;
              isOK = true;
              break;
            }
          }
          if (isOK) {
            head.push(val);
          } else if (this.theme.pathHideType === 'disabled') {
            val.disabled = true;
            head.push(val);
          }
        } else head.push(val);
      }
    });
    return head;
  };

  onCollapse = () => {
    Cookie.set('collapsed', this.state.collapsed ? '0' : '1');
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  getActive = () => {
    const paths = this.props.location.pathname.split('/');
    let temp = '/';
    const active = [];
    paths.forEach((val) => {
      temp += (temp === '/') ? val : '/' + val;
      active.push(temp);
      if (this.routerFlat[temp] !== undefined && !active.includes(this.routerFlat[temp].jumpPath)) {
        active.push(this.routerFlat[temp].jumpPath);
      }
    });
    if (paths.length === 2 && paths[1] === '') {
      active.push(this.routerAll[0].jumpPath);
    }
    return active;
  };

  getOpen = () => {
    const open = [];
    open.push(this.props.location.pathname);
    if (this.props.location.pathname === '/') {
      open.push(this.routerAll[0].jumpPath);
    }
    return open;
  };

  onMenuClick = (evt) => {
    console.log(`onMenuClick:${evt.key}`);
    switch (evt.key) {
      case 'loginOut':
        Api.real('User.Online.logout', { uid: Auth.getUid() }, (res) => {
          if (res.code === 200) {
            message.success(I18n.translate('logoutSuccess'));
            Auth.clearUid();
            this.props.history.replace(Auth.getLoginPath());
          } else {
            message.error(res.response);
          }
        });
        break;
      default:
        if (evt.key !== this.props.location.pathname) {
          this.props.history.push(evt.key);
        }
        break;
    }
  };

  onOpenChange = (openKeys) => {
    console.log(openKeys);
  };

  renderSub = (router) => {
    router = router || this.children;
    return (
      router.map((val) => {
        if (val.hide === true) {
          return null;
        } else if (this.state.path.includes(val.jumpPath)) {
          switch (this.theme.pathHideType) {
            case 'hidden':
              return null;
            case 'disabled':
            default:
              return (<Menu.Item key={val.jumpPath} disabled>{val.icon !== undefined ? val.icon : ''}<span>{val.name}</span></Menu.Item>);
          }
        } else if (val.children !== undefined && val.children.length > 0) {
          return (<SubMenu key={val.jumpPath} disabled={val.disabled} title={<span>{val.icon !== undefined ? val.icon : ''}<span>{val.name}</span></span>}>{this.renderSub(val.children)}</SubMenu>);
        }
        return (<Menu.Item key={val.jumpPath} disabled={val.disabled}>{val.icon !== undefined ? val.icon : ''}<span>{val.name}</span></Menu.Item>);
      })
    );
  };

  render() {
    return (
      <Layout style={style.FullHV}>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo">
              <Img alt="logo" src={this.state.userInfo.avatar} />
              <div style={{ color: this.props.h.primaryColor || '#999' }}> {Auth.userName(this.state.userInfo)} </div>
            </div>
            {this.state.permissionLoading === true && <Spin style={style.loading} shape="dot-circle" color="#aaaaaa" />}
            {
              this.state.permissionLoading === false &&
              <Menu
                defaultOpenKeys={this.state.active}
                selectedKeys={this.state.open}
                mode="inline"
                onOpenChange={this.onOpenChange}
                inlineCollapsed={this.state.collapsed}
                onClick={this.onMenuClick}
              >
                {this.renderSub(this.children)}
                {this.theme.singleMenu === true && <Menu.Item key="loginOut" className="loginOutSingleMenu"><Icon type="logout" />退出</Menu.Item>}
              </Menu>
            }
          </Sider>
          <Layout style={style.Layout}>
            {
              this.theme.singleMenu === false &&
              <Header style={{ height: this.theme.headerHeight, ...style.Header }}>
                <Menu
                  theme={this.theme.type}
                  mode="horizontal"
                  selectedKeys={this.state.active}
                  style={style.HeaderMenu}
                  onClick={this.onMenuClick}
                >
                  <Menu.Item className="indexMenu">ucprimeconnect</Menu.Item>
                  {this.state.routerHead.map((val) => {
                    return <Menu.Item disabled={val.disabled} key={val.jumpPath}>{val.icon !== undefined ? val.icon : ''}{val.name}</Menu.Item>;
                  })}
                  <Menu.Item key="loginOut" className="loginOut"><Icon type="logout" />退出</Menu.Item>
                </Menu>
              </Header>
            }
            <Content style={style.Content} id="layout">
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

const style = {
  loading: { width: '100%', marginTop: '100px' },
  FullHV: { minHeight: '100hv' },
  Layout: { height: '100hv', display: 'flex', flexDirection: 'column' },
  Header: { margin: 0, padding: 0 },
  HeaderMenu: { lineHeight: '60px', textAlign: 'right', background: '#3080fe' },
  Content: { margin: 0, background: '#ffffff' },
};

export default withRouter(hLayout);
