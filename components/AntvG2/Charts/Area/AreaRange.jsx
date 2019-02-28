import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, View } from 'bizcharts';

export default class AreaRange extends Component {
  static displayName = 'AreaRange';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.dataSet = this.props.dataSet;
  }

  render() {
    let position = [];
    this.dataSet.axis.forEach((axis) => {
      position.push(axis.name);
    });
    position = position.join('*');
    return (
      <Chart data={[1]} {...this.dataSet.params}>
        <Tooltip crosshairs={{ type: 'line' }} />
        <View data={this.dataSet.params.data} >
          {
            this.dataSet.axis.map((axis, aidx) => {
              return <Axis key={aidx} {...axis} />;
            })
          }
          <Geom type="area" position={position} {...this.dataSet.geom[0]} />
        </View>
        <View data={this.dataSet.params.dataSub} >
          <Geom type="line" position={position} {...this.dataSet.geom[1]} />
          <Geom type="point" position={position} {...this.dataSet.geom[2]} />
        </View>
      </Chart>
    );
  }
}
