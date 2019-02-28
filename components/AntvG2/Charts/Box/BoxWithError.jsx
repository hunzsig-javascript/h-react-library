import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, View } from 'bizcharts';

export default class BoxWithError extends Component {
  static displayName = 'BoxWithError';

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
      <Chart {...this.dataSet.params}>
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Tooltip
          showTitle={false}
          crosshairs={{ type: 'rect', style: { fill: '#E4E8F1', fillOpacity: 0.43 } }}
          itemTpl='<li data-index={index} style="margin-bottom:4px;"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}<br/><span style="padding-left: 16px">最大值：{high}</span><br/><span style="padding-left: 16px">上四分位数：{q3}</span><br/><span style="padding-left: 16px">中位数：{median}</span><br/><span style="padding-left: 16px">下四分位数：{q1}</span><br/><span style="padding-left: 16px">最小值：{low}</span><br/></li>'
        />
        <Geom {...this.dataSet.geom[0]} />
        <View data={this.dataSet.params.dataSub} >
          <Geom {...this.dataSet.geom[1]} />
        </View>
      </Chart>
    );
  }
}
