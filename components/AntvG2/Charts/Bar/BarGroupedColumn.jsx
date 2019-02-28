import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

export default class BarGroupedColumn extends Component {
  static displayName = 'BarGroupedColumn';

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
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Legend />
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="interval" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
