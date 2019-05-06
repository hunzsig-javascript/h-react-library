import React, { Component } from 'react';
import { Tree, Icon, Button as IceButton } from '@icedesign/base';
import { Modal } from 'antd';
const { Node: TreeNode } = Tree;

export default class EnhanceTable extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    if (typeof this.props.onRef === 'function') {
      this.props.onRef(this);
    }
    this.scope = this.props.table.scope;
    this.treeData = this.props.treeData;
    this.needProps = this.props.needProps;
    this.trans = this.props.trans || false;
    this.onQuery = this.props.onQuery;
    this.state = {
      params: this.props.table.params || {},
    };
    this.addModal = null;
  }

  componentDidMount() {
  }
  onSelect = (keys, info) => {
    console.log(info);
    let params = JSON.parse(JSON.stringify(this.state.params));
    if (typeof this.filterFormatter === 'function') {
      params = this.filterFormatter(params);
    }
    console.log(params);
    params.pid = info.node.props.pid;
    if (typeof this.onQuery === 'function') {
      this.onQuery(params);
    }
  };

  onQueryT = () => {
    this.addModal.destroy();
    let params = JSON.parse(JSON.stringify(this.state.params));
    if (typeof this.filterFormatter === 'function') {
      params = this.filterFormatter(params);
    }
    if (typeof this.onQuery === 'function') {
      this.onQuery(params);
    }
  };

  renderTree = (data, params, prevKey, prevLabel) => {
    const tpl = [];
    prevKey = prevKey || [];
    prevLabel = prevLabel || [];
    data.forEach((d) => {
      let pid = {} || null;
      const newLabel = d.label;
      if (Array.isArray(params)) {
        params.forEach((item, key) => {
          pid[item] = d[item];
        });
      } else {
        pid = d[params];
      }
      const pk = (prevKey.length > 0) ? (prevKey.join('-') + '-' + newLabel) : newLabel;
      const pl = (prevLabel.length > 0) ? (prevLabel.join('>') + '>' + newLabel) : newLabel;
      if (Array.isArray(d.children) && d.children.length > 0) {
        tpl.push(
          (
            <TreeNode
              id={pk}
              key={pk}
              label={newLabel}
              pid={pid}
            >
              {this.renderTree(d.children, params, pk.split('-'), pl.split('/'))}
            </TreeNode>
          )
        );
      } else {
        tpl.push(
          (
            <TreeNode
              key={pk}
              label={newLabel}
              pid={pid}
            >
              {
                this.trans &&
                <a>
                  <IceButton
                    style={{ paddingLeft: '8px' }}
                    type="secondary"
                    shape="text"
                    onClick={() => {
                      this.addModal = Modal.warning({
                        maskClosable: true,
                        width: '1000px',
                        title: `修改${pl}`,
                        className: 'vertical-center-modal hideFooter',
                        content: (
                          <this.trans prams={pid} onQuery={this.onQueryT} />
                        ),
                      });
                    }}

                  >
                    <Icon size="small" style={{ color: '#69b5ff' }} type="edit" />
                  </IceButton>
                </a>
              }
            </TreeNode>
          )
        );
      }
    });
    return tpl.map((t) => {
      return t;
    });
  };

  render() {
    return (
      <div className="tableTree">
        <Tree
          defaultExpandAll
          showLine
          onSelect={this.onSelect}
        >
          {this.renderTree(this.treeData, this.needProps)}
        </Tree>
      </div>
    );
  }
}
