import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend } from 'bizcharts';

export default class CandlestickKAndArea extends Component {
  static displayName = 'CandlestickKAndArea';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.dataSet = this.props.dataSet;
    this.state = {};
  }

  render() {
    console.log(this.dataSet);
    return (
      <div>
        <Chart {...this.dataSet.params}>
          {
            this.dataSet.axis.map((axis, aidx) => {
              return <Axis key={aidx} {...axis} />;
            })
          }
          <Legend />
          <Tooltip showTitle={false} itemTpl={this.dataSet.tooltip} />
          <Geom {...this.dataSet.geom[0]} />
          <Geom {...this.dataSet.geom[1]} />
          <Geom {...this.dataSet.geom[2]} />
        </Chart>
      </div>
    );
  }
}
