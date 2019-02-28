import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BoxWithError extends Component {
  static displayName = 'BoxWithError';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source([
      { x: '职业 A', low: 20000, q1: 26000, median: 27000, q3: 32000, high: 38000, outliers: [50000, 52000] },
      { x: '职业 B', low: 40000, q1: 49000, median: 62000, q3: 73000, high: 88000, outliers: [32000, 29000, 106000] },
      { x: '职业 C', low: 52000, q1: 59000, median: 65000, q3: 74000, high: 83000, outliers: [91000] },
      { x: '职业 D', low: 58000, q1: 96000, median: 130000, q3: 170000, high: 200000, outliers: [42000, 210000, 215000] },
      { x: '职业 E', low: 24000, q1: 28000, median: 32000, q3: 38000, high: 42000, outliers: [48000] },
      { x: '职业 F', low: 47000, q1: 56000, median: 69000, q3: 85000, high: 100000, outliers: [110000, 115000, 32000] },
      { x: '职业 G', low: 64000, q1: 74000, median: 83000, q3: 93000, high: 100000, outliers: [110000] },
      { x: '职业 H', low: 67000, q1: 72000, median: 84000, q3: 95000, high: 110000, outliers: [57000, 54000] },
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
          type: "schema",
          position: "x*range",
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
        {
          type: "point",
          position: "x*outliers",
          shape: 'circle',
          size: 3,
          active: false,
        },
      ],
      params: {
        height: 350,
        data: dv,
        dataSub: dv,
        scale: {
          range: {
            min: 0,
            max: 240000,
          },
          outliers: {
            min: 0,
            max: 240000,
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
        <AntvG2 type="box.with.error" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
