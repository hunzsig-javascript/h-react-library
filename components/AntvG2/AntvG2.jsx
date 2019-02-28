import React, { Component } from 'react';
import Loadable from 'react-loadable';

import AntvLoading from './AntvLoading';

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
    const setType = this.props.type.split('.');
    const mainType = setType.shift();
    const subType = setType.join('.');
    switch (mainType) {
    /* line */
    case 'line':
      switch (subType) {
      case 'base':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Line/LineBasic'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'curved':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Line/LineCurved'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'gradient':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Line/LineGradient'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'step':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Line/LineStep'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'step.series':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Line/LineStepSeries'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'series':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Line/LineSeries'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      default:
        console.error(`antv G2 error main type: ${subType}`);
        break;
      }
      break;
    /* bar */
    case 'bar':
      switch (subType) {
      case 'basic':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarBasic'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'basic.column':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarBasicColumn'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'column.range':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarColumnRange'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'group':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarGroup'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'grouped.column':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarGroupedColumn'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'histogram':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarHistogram'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'histogram.bin.width':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarHistogramBinWidth'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'histogram.stacked':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarHistogramStacked'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'range':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarRange'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'stacked':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarStacked'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'stacked.column':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarStackedColumn'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'stacked.percentage.column':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarStackedPercentageColumn'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'waterfall':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Bar/BarWaterfall'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      default:
        console.error(`antv G2 error main type: ${subType}`);
        break;
      }
      break;
    /* pie */
    case 'pie':
      switch (subType) {
      case 'color.rose':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Pie/PieColorRose'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'donut':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Pie/PieDonut'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'donut.rose':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Pie/PieDonutRose'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'inner.label':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Pie/PieInnerLabel'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'label.line':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Pie/PieLabelLine'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'rose':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Pie/PieRose'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'sunburst':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Pie/PieSunburst'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      default:
        console.error(`antv G2 error main type: ${subType}`);
        break;
      }
      break;
    /* point */
    case 'point':
      switch (subType) {
      case 'bubble':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Point/PointBubble'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'jitter':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Point/PointJitter'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'scatter':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Point/PointScatter'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'scatter.series':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Point/PointScatterSeries'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      default:
        console.error(`antv G2 error main type: ${subType}`);
        break;
      }
      break;
    /* area */
    case 'area':
      switch (subType) {
      case 'basic':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Area/AreaBasic'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'percentage':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Area/AreaPercentage'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'range':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Area/AreaRange'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'stacked':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Area/AreaStacked'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'with.negative':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Area/AreaWithNegative'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      default:
        console.error(`antv G2 error main type: ${subType}`);
        break;
      }
      break;
    /* box */
    case 'box':
      switch (subType) {
      case 'basic':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Box/BoxBasic'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'grouped':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Box/BoxGrouped'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'with.error':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Box/BoxWithError'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      default:
        console.error(`antv G2 error main type: ${subType}`);
        break;
      }
      break;
    /* candlestick */
    case 'candlestick':
      switch (subType) {
      case 'basic':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Candlestick/CandlestickBasic'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      case 'k.and.area':
        chart = React.createElement(Loadable({ loader: () => import('./Charts/Candlestick/CandlestickKAndArea'), loading: AntvLoading }), { dataSet: dataSet });
        break;
      default:
        console.error(`antv G2 error main type: ${subType}`);
        break;
      }
      break;
    default:
      console.error(`antv G2 error main type: ${mainType}`);
      break;
    }
    return chart;
  }
}
