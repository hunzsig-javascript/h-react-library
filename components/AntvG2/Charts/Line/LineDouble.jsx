import React, { Component } from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts';

export default class LineDouble extends Component {
  static displayName = 'LineDouble';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.dataSet = this.props.dataSet;
  }

  render() {
    return (
      <div style={{width: '100%'}}>
        <Chart
          {...this.dataSet.params}
        >
          {
            this.dataSet.axis.map((axis, aidx) => {
              console.log(axis);
              return (
                <Axis key={aidx} title={null} tickLine={null} {...axis} />
              );
            })
          }
          <Tooltip />
          <Geom type="line" {...this.dataSet.geom[1]} />
          <Geom type="point" {...this.dataSet.geom[2]} />
          <Geom type="line" {...this.dataSet.geom[0]} />
        </Chart>
      </div>
    );
  }
}
