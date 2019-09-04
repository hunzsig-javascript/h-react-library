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
        <Tooltip itemTpl='<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span><p>{name}</p><img style="width: 400px" src={value}></li>' />
        <Geom type="line" shape="smooth" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
