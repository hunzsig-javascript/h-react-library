import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

export default class LineStepSeries extends Component {
  static displayName = 'LineStepSeries';

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
        <Tooltip crosshairs={{ type: 'y' }} />
        <Geom type="line" shape="hv" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
