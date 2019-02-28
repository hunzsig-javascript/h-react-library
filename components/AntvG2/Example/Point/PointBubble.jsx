import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';
import SampleData from '../../Data/bubble';

export default class PointBubble extends Component {
  static displayName = 'PointBubble';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const colorMap = {
      Asia: '#e04240',
      Americas: '#e0de1b',
      Europe: '#7be08a',
      Oceania: '#7ea9e0',
    };
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
        {
          name: 'GDP',
          label: {
            formatter: (value) => {
              return (value / 1000).toFixed(0) + 'k';
            }, // 格式化坐标轴的显示
          },
        },
        { name: 'LifeExpectancy' },
      ],
      geom: [
        {
          position: 'GDP*LifeExpectancy',
          color: ['continent', (val) => {
            return colorMap[val];
          }],
          tooltip: 'Country*Population*GDP*LifeExpectancy',
          opacity: 0.65,
          shape: "circle",
          size: [
            'Population',
            [4, 65],
          ],
          style: [
            'continent',
            {
              lineWidth: 1,
              strokeOpacity: 1,
              fillOpacity: 0.3,
              opacity: 0.65,
              stroke: (val) => {
                return colorMap[val];
              },
            },
          ],
        },
      ],
      params: {
        height: 350,
        data: dv,
        forceFit: true,
        padding: [30, 30, 80, 80],
        scale: {
          LifeExpectancy: {
            alias: '人均寿命（年）',
          },
          Population: {
            type: 'pow',
            alias: '人口总数',
          },
          GDP: {
            alias: '人均国内生产总值($)',
          },
          Country: {
            alias: '国家/地区',
          },
        },
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="point.bubble" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
