import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Coord, Legend } from 'bizcharts';

export default class PieColorRose extends Component {
  static displayName = 'PieColorRose';

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
        <Coord type="polar" />
        <Tooltip />
        <Legend
          position="right"
          offsetY={-this.dataSet.params.height / 2 + 180}
          offsetX={-160}
        />
        <Geom type="interval" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
