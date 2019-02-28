import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class PieSunburst extends Component {
  static displayName = 'PieSunburst';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const data = [
      { value: 251, type: '大事例一', name: '子事例一' },
      { value: 1048, type: '大事例一', name: '子事例二' },
      { value: 610, type: '大事例二', name: '子事例三' },
      { value: 434, type: '大事例二', name: '子事例四' },
      { value: 335, type: '大事例三', name: '子事例五' },
      { value: 250, type: '大事例三', name: '子事例六' },
    ];
    const ds = new DataSet();
    const dsSub = new DataSet();
    const dv = ds.createView().source(data);
    const dvSub = dsSub.createView().source(data);
    dv.transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });
    dvSub.transform({
      type: 'percent',
      field: 'value',
      dimension: 'name',
      as: 'percent',
    });
    return {
      axis: [
        { name: 'percent' },
      ],
      geom: [
        {
          position: 'percent',
          color: 'type',
          tooltip: [
            'type*percent',
            (item, percent) => {
              percent = (percent * 100).toFixed(2) + '%';
              return {
                name: item,
                value: percent,
              };
            },
          ],
          style: { lineWidth: 1, stroke: '#fff' },
          select: false,
        },
        {
          position: 'percent',
          color: ['name', ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4']],
          tooltip: [
            'name*percent',
            (item, percent) => {
              percent = (percent * 100).toFixed(2) + '%';
              return {
                name: item,
                value: percent,
              };
            },
          ],
          style: { lineWidth: 1, stroke: '#fff' },
          select: false,
        },
      ],
      label: [
        {
          content: 'type',
          offset: -10,
        },
        {
          content: 'name',
        },
      ],
      params: {
        height: 350,
        data: dv,
        dataSub: dvSub,
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
        <AntvG2 type="pie.sunburst" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
