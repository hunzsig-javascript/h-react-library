import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, Coord } from 'bizcharts';

export default class BarGroup extends Component {
  static displayName = 'BarGroup';

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
        <Coord transpose scale={[1, -1]} />
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
