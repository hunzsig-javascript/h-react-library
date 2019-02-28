import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BoxBasic extends Component {
  static displayName = 'BoxBasic';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { x: 'Oceania', low: 1, q1: 9, median: 16, q3: 22, high: 24 },
      { x: 'East Europe', low: 1, q1: 5, median: 8, q3: 12, high: 16 },
      { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26 },
      { x: 'South America', low: 2, q1: 8, median: 12, q3: 21, high: 28 },
      { x: 'North Africa', low: 1, q1: 8, median: 14, q3: 18, high: 24 },
      { x: 'North America', low: 3, q1: 10, median: 17, q3: 28, high: 30 },
      { x: 'West Europe', low: 1, q1: 7, median: 10, q3: 17, high: 22 },
      { x: 'West Africa', low: 1, q1: 6, median: 8, q3: 13, high: 16 },
    ]);
    dv.transform({
      type: 'map',
      callback: (obj) => {
        obj.range = [obj.low, obj.q1, obj.median, obj.q3, obj.high];
        return obj;
      },
    });
    return {
      axis: [
        { name: 'x' },
        { name: 'range' },
      ],
      geom: [
        {
          position: 'x*range',
          shape: 'box',
          tooltip: [
            'x*low*q1*median*q3*high',
            (x, low, q1, median, q3, high) => {
              return {
                name: x,
                low,
                q1,
                median,
                q3,
                high,
              };
            },
          ],
          style: { stroke: 'rgba(0, 0, 0, 0.45)', fill: '#1890FF', fillOpacity: 0.3 },
        },
      ],
      params: {
        height: 350,
        data: dv,
        scale: {
          range: {
            max: 35,
          },
        },
        forceFit: true,
        padding: [30, 30, 80, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="box.basic" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
