import React, { Component } from 'react';
import { Button } from '@icedesign/base';
import { Layout, Menu, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import hRouter from '../../hRouter';
import './Layout.scss';

const { Header, Content } = Layout;
const SubMenu = Menu.SubMenu;
const PathHideType = 'disabled';

class hLayout extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    // todo 对应主题相关修正
    this.theme = {};
    this.theme.primaryColor = this.props.h.primaryColor || 'yellow';
    switch (this.props.h.theme) {
      case 'light':
        this.theme.type = 'dark';
        this.theme.menuBtnColor = '#bbbbbb';
        break;
      default:
        this.theme.type = 'light';
        this.theme.menuBtnColor = '#999999';
        break;
    }
    console.log(this.theme);
    this.state = {
      path: [],
      routerHead: [],
      active: [],
      hoverBtnIndex: null,
    };
    this.routerAll = this.allRouter();
    this.routerFlat = this.flatRouter(this.routerAll);
    this.head = this.getHead();
    if (this.routerFlat[this.head] === undefined) {
      location.href = '/';
      return;
    }
    this.children = this.routerFlat[this.head].children || [];
    this.state.routerHead = this.headRouter();
    this.state.active = this.getActive();
    this.screenWidth = document.body.clientWidth;
  }

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
    return flat;
  };

  headRouter = () => {
    const head = [];
    hRouter.config.forEach((val) => {
      console.log(val.path);
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
          } else if (PathHideType === 'disabled') {
            val.disabled = true;
            head.push(val);
          }
        } else head.push(val);
      }
    });
    return head;
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

  onMenuClick = (evt) => {
    console.log(`onMenuClick:${evt.key}`);
    switch (evt.key) {
      default:
        if (evt.key !== this.props.location.pathname) {
          this.props.history.push(evt.key);
        }
        break;
    }
  };

  renderSub = (router) => {
    router = router || this.children;
    return (
      router.map((val) => {
        if (val.hide === true) {
          return null;
        } else if (this.state.path.includes(val.jumpPath)) {
          switch (PathHideType) {
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
        <Layout style={style.Layout}>
          <Header className={`hHeader ${this.props.h.theme} ${this.screenWidth >= 970 ? 'big' : 'small'}`}>
            {
              this.screenWidth >= 970 &&
              <Menu
                theme={this.theme.type}
                mode="horizontal"
                selectedKeys={this.state.active}
                style={style.HeaderMenu}
                onClick={this.onMenuClick}
              >
                {this.state.routerHead.map((val) => {
                  if (val.children && val.children.length > 0) {
                    return (
                      <Menu.SubMenu
                        title={<span>{val.icon !== undefined ? val.icon : ''}{val.name}</span>}
                        disabled={val.disabled}
                        key={val.jumpPath}
                      >
                        {
                          val.children.map((child) => {
                            return (
                              <Menu.Item
                                disabled={child.disabled}
                                key={child.jumpPath}
                              >
                                {child.icon !== undefined ? child.icon : ''}
                                {child.name}
                              </Menu.Item>
                            );
                          })
                        }
                      </Menu.SubMenu>
                    );
                  }
                  return (
                    <Menu.Item
                      disabled={val.disabled}
                      key={val.jumpPath}
                    >
                      {val.icon !== undefined ? val.icon : ''}
                      {val.name}
                    </Menu.Item>
                  );
                })}
              </Menu>
            }
            {
              this.screenWidth < 970 &&
              <div className="hMenuBtnGroup">
                {
                  this.state.routerHead.map((val, hmbIdx) => {
                    let color = this.theme.menuBtnColor;
                    if (this.state.active.includes(val.jumpPath) || this.state.hoverBtnIndex === hmbIdx) {
                      color = this.theme.primaryColor;
                    }
                    if (this.screenWidth < 768) {
                      return (
                        <Button
                          key={`hMenuBtn${hmbIdx}`}
                          onClick={() => { this.props.history.push(val.jumpPath); }}
                          className="hMenuBtn"
                          style={{ color: color }}
                          disabled={val.disabled}
                          type="normal"
                          shape="text"
                          onBlur={() => {}}
                          onFocus={() => {}}
                          onMouseOver={
                            () => {
                              this.setState({
                                hoverBtnIndex: hmbIdx,
                              });
                            }
                          }
                          onMouseOut={
                            () => {
                              this.setState({
                                hoverBtnIndex: null,
                              });
                            }
                          }
                        >
                          {val.icon}
                        </Button>
                      );
                    }
                    return (
                      <Tooltip key={`hMenuBtn${hmbIdx}`} placement="bottom" title={val.name}>
                        <Button
                          onClick={() => { this.props.history.push(val.jumpPath); }}
                          className="hMenuBtn"
                          disabled={val.disabled}
                          type="normal"
                          shape="text"
                          style={{ color: color }}
                          onBlur={() => {}}
                          onFocus={() => {}}
                          onMouseOver={
                            () => {
                              this.setState({
                                hoverBtnIndex: hmbIdx,
                              });
                            }
                          }
                          onMouseOut={
                            () => {
                              this.setState({
                                hoverBtnIndex: null,
                              });
                            }
                          }
                        >
                          {val.icon}
                        </Button>
                      </Tooltip>
                    );
                  })
                }
              </div>
            }
          </Header>
          <Content className={`hContent ${this.props.h.theme} ${this.screenWidth >= 970 ? 'big' : 'small'}`}>
            <div className="inner">
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const style = {
  FullHV: { minHeight: '100hv' },
  Layout: { height: '100hv', display: 'flex', flexDirection: 'column' },
  HeaderMenu: { width: '100%', lineHeight: '50px', paddingLeft: '15%' },
};

export default withRouter(hLayout);
