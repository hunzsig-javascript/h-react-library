import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

export default class LineCurved extends Component {
  static displayName = 'LineCurved';

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
        <Legend />
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="line" {...this.dataSet.geom[0]} />
        <Geom type={this.dataSet.geom[1].type || 'point'} {...this.dataSet.geom[1]} />
      </Chart>
    );
  }
}
