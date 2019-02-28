import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

export default class BoxGrouped extends Component {
  static displayName = 'BoxGrouped';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.dataSet = this.props.dataSet;
  }

  render() {
    return (
      <Chart {...this.dataSet.params}>
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Tooltip crosshairs={{ type: 'rect' }} />
        <Legend marker="circle" />
        <Geom type="schema" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
