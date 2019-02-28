import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

import SampleData from './../../Data/stock-03';

export default class CandlestickKAndArea extends Component {
  static displayName = 'CandlestickKAndArea';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet();
    const dv = ds.createView().source(SampleData);
    dv.transform({
      type: 'map',
      callback: (obj) => {
        obj.stockRange = [obj.start, obj.end, obj.highest, obj.lowest];
        return obj;
      },
    });
    return {
      params: {
        height: 350,
        data: dv,
        scale: {
          date: {
            type: 'time',
            nice: false,
            mask: 'MM-DD',
            tickCount: 10,
          },
          range: {
            min: 20,
            max: 35,
            nice: false,
            tickInterval: 2,
          },
          mean: {
            min: 20,
            max: 35,
            nice: false,
          },
          stockRange: {
            min: 20,
            max: 35,
            nice: false,
          },
        },
        forceFit: true,
        padding: [30, 30, 80, 80],
      },
      axis: [
        { name: 'mean', visible: false },
        { name: 'stockRange', visible: false },
      ],
      geom: [
        {
          type: 'area',
          position: 'date*range',
          color: '#64b5f6',
        },
        {
          type: 'schema',
          position: 'date*stockRange',
          color: ['trend', (val) => {
            if (val === 'up') {
              return '#f04864';
            }

            if (val === 'down') {
              return '#2fc25b';
            }
          }],
          tooltip: 'start*end*highest*lowest',
          shape: "candle",
        },
        {
          type: 'line',
          position: 'date*mean',
          color: '#FACC14',
        },
      ],
      tooltip: `<li data-index={index} style="margin-bottom:4px;">
        <span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/>
        <span style="padding-left: 16px">开盘价：{start}</span><br/>
        <span style="padding-left: 16px">收盘价：{end}</span><br/>
        <span style="padding-left: 16px">最高价：{max}</span><br/>
        <span style="padding-left: 16px">最低价：{min}</span><br/>
        <span style="padding-left: 16px">成交量：{volumn}</span><br/>
        </li>`,
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="candlestick.k.and.area" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
