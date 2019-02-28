import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class BarWaterfall extends Component {
  static displayName = 'BarWaterfall';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const data = [
      { type: '日用品', money: 300 },
      { type: '伙食费', money: 900 },
      { type: '交通费', money: 200 },
      { type: '水电费', money: 300 },
      { type: '房租', money: 1200 },
      { type: '商场消费', money: 1000 },
      { type: '应酬交际', money: 2000 },
      { type: '总费用', money: 5900 },
    ];
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      if (i > 0 && i < data.length - 1) {
        if (Array.isArray(data[i - 1].money)) {
          item.money = [data[i - 1].money[1], item.money + data[i - 1].money[1]];
        } else {
          item.money = [data[i - 1].money, item.money + data[i - 1].money];
        }
      }
    }
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'fold',
      fields: ['money'],
      key: 'fee',
      value: 'money',
    });
    return {
      legend: {
        items: [
          { value: '各项花销', marker: { symbol: 'square', fill: '#1890FF', radius: 5 } },
          { value: '总费用', marker: { symbol: 'square', fill: '#8c8c8c', radius: 5 } },
        ],
      },
      axis: [
        { name: 'type' },
        { name: 'money' },
      ],
      geom: [
        {
          position: 'type*money',
          color: [
            'type',
            (type) => {
              if (type === '总费用') {
                return 'rgba(0, 0, 0, 0.65)';
              }
              return '#1890FF';
            },
          ],
          tooltip: ['type*money', (type, money) => {
            if (Array.isArray(money)) {
              return {
                name: '生活费',
                value: money[1] - money[0],
              };
            }
            return {
              name: '生活费',
              value: money,
            };
          }],
          shape: 'waterfall',
        },
      ],
      chartParams: {
        height: 350,
        data: dv,
        forceFit: true,
        padding: [30, 30, 80, 80],
        scale: {
          percent: {
            min: 0,
            formatter(val) {
              return (val * 100).toFixed(2) + '%';
            },
          },
        },
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="bar.waterfall" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
