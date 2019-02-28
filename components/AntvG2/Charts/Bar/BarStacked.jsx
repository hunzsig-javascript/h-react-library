import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, Coord } from 'bizcharts';

export default class BarStacked extends Component {
  static displayName = 'BarStacked';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.dataSet = this.props.dataSet;
  }

  render() {
    return (
      <Chart {...this.dataSet.chartParams}>
        <Legend />
        <Coord transpose />
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Tooltip />
        <Geom type="intervalStack" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
