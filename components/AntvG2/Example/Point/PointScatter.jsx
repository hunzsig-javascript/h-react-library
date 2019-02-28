import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';
import SampleData from '../../Data/scatter';

export default class PointScatter extends Component {
  static displayName = 'PointScatter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source(SampleData);
    /*
    dv.transform({
      type: 'fold',
      fields: ['height', 'weight'], // 展开字段集
      key: 'key',
      value: 'value',
      retains: ['gender', 'height', 'weight'],
    });
    */
    return {
      axis: [
        { name: 'height' },
        { name: 'weight' },
      ],
      geom: [
        {
          position: 'height*weight',
          opacity: 0.65,
          shape: 'circle',
          size: 4,
          tooltip: [
            'gender*height*weight',
            (gender, height, weight) => {
              return {
                name: gender,
                value: height + '(cm), ' + weight + '(kg)',
              };
            },
          ],
        },
      ],
      params: {
        height: 350,
        data: dv,
        forceFit: true,
        padding: [30, 30, 30, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="point.scatter" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
