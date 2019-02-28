import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

import SampleData from './../../Data/candle-sticks';

export default class CandlestickBasic extends Component {
  static displayName = 'CandlestickBasic';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const ds = new DataSet({
      state: {
        start: '2015-04-07',
        end: '2015-07-28',
      },
    });
    const dv = ds.createView().source(SampleData);
    dv.transform({
      type: 'filter',
      callback: (obj) => {
        const date = obj.time;
        return date <= ds.state.end && date >= ds.state.start;
      },
    }).transform({
      type: 'map',
      callback: (obj) => {
        obj.trend = (obj.start <= obj.end) ? '上涨' : '下跌';
        obj.range = [obj.start, obj.end, obj.max, obj.min];
        return obj;
      },
    });
    return {
      ds: ds,
      params: {
        height: 350,
        scale: {
          time: {
            type: 'timeCat',
            nice: false,
            range: [0, 1],
          },
          trend: {
            values: ['上涨', '下跌'],
          },
          volumn: { alias: '成交量' },
          start: { alias: '开盘价' },
          end: { alias: '收盘价' },
          max: { alias: '最高价' },
          min: { alias: '最低价' },
          range: { alias: '股票价格' },
        },
        forceFit: true,
        padding: [30, 30, 50, 80],
        animate: false,
      },
      view: [
        {
          end: { x: 1, y: 0.5 },
          data: dv,
          axis: [
            { name: 'time' },
            { name: 'range' },
          ],
          geom: {
            type: 'schema',
            position: 'time*range',
            size: 2,
            shape: 'candle',
            color: ['trend', (val) => {
              if (val === '上涨') {
                return '#f04864';
              }

              if (val === '下跌') {
                return '#2fc25b';
              }
            }],
            tooltip: ['time*start*end*max*min', (time, start, end, max, min) => {
              return {
                name: time,
                value: '<br><span style="padding-left: 16px">开盘价：' + start + '</span><br/>'
                  + '<span style="padding-left: 16px">收盘价：' + end + '</span><br/>'
                  + '<span style="padding-left: 16px">最高价：' + max + '</span><br/>'
                  + '<span style="padding-left: 16px">最低价：' + min + '</span>',
              };
            }],
          },
        },
        {
          start: { x: 0, y: 0.65 },
          data: dv,
          scale: {
            volumn: { tickCount: 2 },
          },
          axis: [
            {
              name: 'volumn',
              label: {
                formatter: (val) => {
                  return parseInt(val / 1000, 10) + 'k';
                },
              },
            },
            { name: 'time', tickLine: null, label: null },
          ],
          geom: {
            type: 'interval',
            position: 'time*volumn',
            size: 2,
            shape: 'candle',
            color: ['trend', (val) => {
              if (val === '上涨') {
                return '#f04864';
              }

              if (val === '下跌') {
                return '#2fc25b';
              }
            }],
            tooltip: ['time*volumn', (time, volumn) => {
              return {
                name: time,
                value: '<br/><span style="padding-left: 16px">成交量：' + volumn + '</span><br/>',
              };
            }],
          },
        },
      ],
      slider: {
        padding: [10, 20, 0, 80],
        width: 'auto',
        height: 26,
        xAxis: 'time',
        yAxis: 'volumn',
        scales: { time: { type: 'timeCat', nice: false } },
        data: SampleData,
      },
    };
  };

  render() {
    return (
      <div style={{ width: '100%', padding: '40px' }}>
        <AntvG2 type="candlestick.basic" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
