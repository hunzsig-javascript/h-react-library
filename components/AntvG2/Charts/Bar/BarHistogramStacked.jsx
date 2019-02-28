import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

export default class BarHistogramStacked extends Component {
  static displayName = 'BarHistogramStacked';

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
        {
          this.dataSet.axis.map((axis, aidx) => {
            return (
              <Axis key={aidx} {...axis} />
            );
          })
        }
        <Tooltip inPlot={false} crosshairs={false} position="top" />
        <Geom type="intervalStack" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
