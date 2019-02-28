import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View } from 'bizcharts';

export default class PieSunburst extends Component {
  static displayName = 'PieSunburst';

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
        <Coord type="theta" radius={0.5} />
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Legend position="right" offsetY={-(this.dataSet.params.height) / 2 + 120} offsetX={-100} />
        <Tooltip
          showTitle={false}
          itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
        />
        <Geom type="intervalStack" {...this.dataSet.geom[0]}>
          <Label {...this.dataSet.label[0]} />
        </Geom>
        <View data={this.dataSet.params.dataSub} scale={this.dataSet.params.scale} >
          <Coord type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
          <Geom type="intervalStack" {...this.dataSet.geom[1]}>
            <Label {...this.dataSet.label[1]} />
          </Geom>
        </View>
      </Chart>
    );
  }
}
