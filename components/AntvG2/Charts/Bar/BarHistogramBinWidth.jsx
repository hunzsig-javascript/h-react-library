import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

export default class BarHistogramBinWidth extends Component {
  static displayName = 'BarHistogramBinWidth';

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
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Tooltip inPlot={false} crosshairs={false} position="top" />
        <Geom type="interval" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
