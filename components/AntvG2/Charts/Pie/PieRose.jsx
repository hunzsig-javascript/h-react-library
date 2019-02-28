import React, { Component } from 'react';
import { Chart, Geom, Tooltip, Coord } from 'bizcharts';

export default class PieRose extends Component {
  static displayName = 'PieRose';

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
        <Geom type="interval" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
