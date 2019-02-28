import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';

export default class PieLabelLine extends Component {
  static displayName = 'PieLabelLine';

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
        <Coord type="theta" radius={0.75} />
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Legend position="right" offsetY={-(this.dataSet.params.height || window.innerHeight) / 2 + 120} offsetX={-100} />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Geom type="intervalStack" {...this.dataSet.geom[0]}>
          <Label
            content="percent"
            formatter={
              (val, item) => {
                return item.point.item + ': ' + val;
              }
            }
          />
        </Geom>
      </Chart>
    );
  }
}
