import React, { Component } from 'react';

import LineBasic from './Charts/Line/LineBasic';
import LineSeries from './Charts/Line/LineSeries';
import LineCurved from './Charts/Line/LineCurved';
import LineStep from './Charts/Line/LineStep';
import LineStepSeries from './Charts/Line/LineStepSeries';
import LineGradient from './Charts/Line/LineGradient';
import BarGroupedColumn from './Charts/Bar/BarGroupedColumn';

export default class AntvG2 extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    if (typeof this.props.onRef === 'function') {
      this.props.onRef(this);
    }
    this.state = {};
  }

  render() {
    const dataSet = this.props.dataSet || {};
    let chart = null;
    switch (this.props.type) {
    case 'line.base':
      chart = React.createElement(LineBasic, { dataSet: dataSet });
      break;
    case 'line.series':
      chart = React.createElement(LineSeries, { dataSet: dataSet });
      break;
    case 'line.curved':
      chart = React.createElement(LineCurved, { dataSet: dataSet });
      break;
    case 'line.step':
      chart = React.createElement(LineStep, { dataSet: dataSet });
      break;
    case 'line.step.series':
      chart = React.createElement(LineStepSeries, { dataSet: dataSet });
      break;
    case 'line.gradient':
      chart = React.createElement(LineGradient, { dataSet: dataSet });
      break;
    case 'bar.grouped.column':
      chart = React.createElement(BarGroupedColumn, { dataSet: dataSet });
      break;
    default:
      break;
    }
    return chart;
  }
}
