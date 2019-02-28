import React, { Component } from 'react';
import { DataSet } from '@antv/data-set';
import AntvG2 from '../../AntvG2';

export default class PieDonutRose extends Component {
  static displayName = 'PieDonutRose';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  dataBuild = () => {
    const data = [
      { year: '2001', population: 41.8 },
      { year: '2002', population: 38 },
      { year: '2003', population: 33.7 },
      { year: '2004', population: 30.7 },
      { year: '2005', population: 25.8 },
      { year: '2006', population: 31.7 },
      { year: '2007', population: 33 },
      { year: '2008', population: 46 },
      { year: '2009', population: 38.3 },
      { year: '2010', population: 28 },
      { year: '2011', population: 42.5 },
      { year: '2012', population: 30.3 },
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'percent',
      field: 'population',
      dimension: 'year',
      as: 'percent',
    });
    return {
      axis: [
        { name: 'year' },
        { name: 'percent' },
      ],
      geom: [
        {
          position: 'year*percent',
          color: 'year',
          style: { lineWidth: 1, stroke: '#fff' },
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
        <AntvG2 type="pie.donut.rose" dataSet={this.dataBuild()} />
      </div>
    );
  }
}
