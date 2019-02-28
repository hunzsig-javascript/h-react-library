import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

export default class PointJitter extends Component {
  static displayName = 'PointJitter';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.dataSet = this.props.dataSet;
  }

  render() {
    let position = [];
    this.dataSet.axis.forEach((axis) => {
      position.push(axis.name);
    });
    position = position.join('*');
    return (
      <Chart {...this.dataSet.params}>
        <Tooltip crosshairs={{ type: 'cross' }} />
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Legend reversed />
        <Geom type="point" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
