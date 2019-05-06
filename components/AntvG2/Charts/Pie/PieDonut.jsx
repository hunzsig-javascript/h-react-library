import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, Guide } from 'bizcharts';

const { Html } = Guide;

export default class PieDonut extends Component {
  static displayName = 'PieDonut';

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
        <Coord type="theta" radius={0.75} innerRadius={0.6} />
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
       {/* <Legend position="right" offsetY={-(this.dataSet.params.height) / 2 + 120} offsetX={-100} />*/}
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Guide>
          <Html position={['50%', '50%']} html={this.dataSet.html} alignX="middle" alignY="middle" />
        </Guide>
        <Geom type="intervalStack" {...this.dataSet.geom[0]}>
          <Label {...this.dataSet.label[0]} />
        </Geom>
      </Chart>
    );
  }
}
