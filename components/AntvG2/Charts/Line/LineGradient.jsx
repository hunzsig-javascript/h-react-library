import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';

export default class LineGradient extends Component {
  static displayName = 'LineGradient';

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
            return (
              <Axis key={aidx} title={null} tickLine={null} {...axis} />
            );
          })
        }
        <Tooltip />
        <Geom type="line" shape="smooth" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
