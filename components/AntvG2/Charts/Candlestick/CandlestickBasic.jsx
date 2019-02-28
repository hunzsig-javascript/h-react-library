import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, View } from 'bizcharts';
import Slider from 'bizcharts-plugin-slider';

export default class CandlestickBasic extends Component {
  static displayName = 'CandlestickBasic';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.dataSet = this.props.dataSet;
    console.log(this.dataSet);
    this.state = {};
  }

  onChange = (obj) => {
    const { startText, endText } = obj;
    this.dataSet.ds.setState('start', startText);
    this.dataSet.ds.setState('end', endText);
  };

  render() {
    console.log(this.dataSet);
    return (
      <div>
        <Chart {...this.dataSet.params}>
          <Legend offset={20} />
          <Tooltip showTitle={false} itemTpl='<li data-index={index}><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}{value}</li>' />
          <View {...this.dataSet.view[0]}>
            {
              this.dataSet.view[0].axis.map((axis, aidx) => {
                return <Axis key={aidx} {...axis} />;
              })
            }
            <Geom {...this.dataSet.view[0].geom} />
          </View>
          <View {...this.dataSet.view[1]}>
            {
              this.dataSet.view[1].axis.map((axis, aidx) => {
                return <Axis key={aidx} {...axis} />;
              })
            }
            <Geom {...this.dataSet.view[1].geom} />
          </View>
        </Chart>
        <Slider
          {...this.dataSet.slider}
          start={this.dataSet.ds.state.start}
          end={this.dataSet.ds.state.end}
          onChange={this.onChange.bind(this)}
        />
      </div>
    );
  }
}
