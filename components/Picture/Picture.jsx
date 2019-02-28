import React, { Component } from 'react';
import { Modal } from 'antd';

import './Picture.scss';
import Parse from "../../common/Parse";

class Picture extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  imgShow = (src) => {
    Modal.success({
      width: 650,
      maskClosable: true,
      className: 'vertical-center-modal hideFooter',
      content: (
        <img style={styles.imgExport} alt={src} src={Parse.img(src)} />
      ),
    });
  };

  render() {
    return (
      <div className="pics-group">
        {
          this.props.dataSource &&
          this.props.dataSource.length > 0 &&
          this.props.dataSource.map((ds, pidx) => {
            const source = this.props.dataKey ? ds[this.props.dataKey] : ds;
            return (
              <img
                style={this.props.style || styles.img}
                key={pidx}
                src={Parse.img(source)}
                alt={pidx}
                onClick={typeof ds.onClick === 'function' ? ds.onClick : this.imgShow.bind(this, source)}
              />
            );
          })
        }
      </div>
    );
  }
}

const styles = {
  img: {
    height: '50px',
    marginRight: '3px',
    marginBottom: '3px',
    border: '1px solid #eee',
    cursor: 'pointer',
  },
  imgExport: {
    width: '500px',
    verticalAlign: 'middle',
    paddingBottom: '20px',
  },
};

export default Picture;
