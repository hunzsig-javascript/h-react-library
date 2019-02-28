import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

export default class AreaPercentage extends Component {
  static displayName = 'AreaPercentage';

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
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Legend />
        <Tooltip crosshairs={{ type: 'line' }} />
        <Geom type="areaStack" position={position} {...this.dataSet.geom[0]} />
        <Geom type="lineStack" position={position} {...this.dataSet.geom[1]} />
      </Chart>
    );
  }
}
