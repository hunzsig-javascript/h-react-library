import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class PieDonut extends Component {
  static displayName = 'PieDonut';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const qty = 200;
    const dv = ds.createView().source([
      { item: '事例一', count: 40 },
      { item: '事例二', count: 21 },
      { item: '事例三', count: 17 },
      { item: '事例四', count: 13 },
      { item: '事例五', count: 9 },
    ]);
    dv.transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent',
    });
    return {
      axis: [
        { name: 'percent' },
      ],
      geom: [
        {
          position: 'percent',
          color: 'item',
          tooltip: [
            'item*percent',
            (item, percent) => {
              percent = percent * 100 + '%';
              return {
                name: item,
                value: percent,
              };
            },
          ],
          style: { lineWidth: 1, stroke: '#fff' },
        },
      ],
      label: [
        {
          content: 'percent',
          formatter: (val, item) => {
            return item.point.item + ': ' + val;
          },
        },
      ],
      html: `<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">主机<br><span style="color:#262626;font-size:2.5em">${qty}</span>台</div>`,
      params: {
        height: 350,
        data: dv,
        scale: {
          percent: {
            formatter: (val) => {
              val = (val * 100) + '%';
              return val;
            },
          },
        },
        forceFit: true,
        padding: [30, 30, 30, 80],
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="pie.donut" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
