import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Coord } from 'bizcharts';

export default class BarRange extends Component {
  static displayName = 'BarRange';

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
        <Coord transpose />
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Tooltip />
        <Geom type="interval" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
