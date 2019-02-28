import React, { Component } from 'react';
import { Row, Col } from 'antd';

import BarBasic from './Bar/BarBasic';
import BarBasicColumn from './Bar/BarBasicColumn';
import BarColumnRange from './Bar/BarColumnRange';
import BarGroup from './Bar/BarGroup';
import BarGroupedColumn from './Bar/BarGroupedColumn';
import BarHistogram from './Bar/BarHistogram';
import BarHistogramBinWidth from './Bar/BarHistogramBinWidth';
import BarHistogramStacked from './Bar/BarHistogramStacked';
import BarRange from './Bar/BarRange';
import BarStacked from './Bar/BarStacked';
import BarStackedColumn from './Bar/BarStackedColumn';
import BarStackedPercentageColumn from './Bar/BarStackedPercentageColumn';
import BarWaterfall from './Bar/BarWaterfall';

import LineBasic from './Line/LineBasic';
import LineCurved from './Line/LineCurved';
import LineGradient from './Line/LineGradient';
import LineSeries from './Line/LineSeries';
import LineStep from './Line/LineStep';
import LineStepSeries from './Line/LineStepSeries';

import PieColorRose from './Pie/PieColorRose';
import PieDonut from './Pie/PieDonut';
import PieDonutRose from './Pie/PieDonutRose';
import PieInnerLabel from './Pie/PieInnerLabel';
import PieLabelLine from './Pie/PieLabelLine';
import PieRose from './Pie/PieRose';
import PieSunburst from './Pie/PieSunburst';

import PointBubble from './Point/PointBubble';
import PointJitter from './Point/PointJitter';
import PointScatter from './Point/PointScatter';
import PointScatterSeries from './Point/PointScatterSeries';

import AreaBasic from './Area/AreaBasic';
import AreaPercentage from './Area/AreaPercentage';
import AreaRange from './Area/AreaRange';
import AreaStacked from './Area/AreaStacked';
import AreaWithNegative from './Area/AreaWithNegative';

import BoxBasic from './Box/BoxBasic';
import BoxGrouped from './Box/BoxGrouped';
import BoxWithError from './Box/BoxWithError';

import CandlestickBasic from './Candlestick/CandlestickBasic';
import CandlestickKAndArea from './Candlestick/CandlestickKAndArea';


class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Row type="flex" justify="center" align="middle">
        {/* Bar */}
        <Col span={8}><BarBasic /></Col>
        <Col span={8}><BarBasicColumn /></Col>
        <Col span={8}><BarColumnRange /></Col>
        <Col span={8}><BarGroup /></Col>
        <Col span={8}><BarGroupedColumn /></Col>
        <Col span={8}><BarHistogram /></Col>
        <Col span={8}><BarHistogramBinWidth /></Col>
        <Col span={8}><BarHistogramStacked /></Col>
        <Col span={8}><BarRange /></Col>
        <Col span={8}><BarStacked /></Col>
        <Col span={8}><BarStackedColumn /></Col>
        <Col span={8}><BarStackedPercentageColumn /></Col>
        <Col span={8}><BarWaterfall /></Col>
        {/* Line */}
        <Col span={8}><LineBasic /></Col>
        <Col span={8}><LineCurved /></Col>
        <Col span={8}><LineGradient /></Col>
        <Col span={8}><LineSeries /></Col>
        <Col span={8}><LineStep /></Col>
        <Col span={8}><LineStepSeries /></Col>
        {/* Pie */}
        <Col span={8}><PieColorRose /></Col>
        <Col span={8}><PieDonut /></Col>
        <Col span={8}><PieDonutRose /></Col>
        <Col span={8}><PieInnerLabel /></Col>
        <Col span={8}><PieLabelLine /></Col>
        <Col span={8}><PieRose /></Col>
        <Col span={8}><PieSunburst /></Col>
        {/* Point */}
        <Col span={8}><PointBubble /></Col>
        <Col span={8}><PointJitter /></Col>
        <Col span={8}><PointScatter /></Col>
        <Col span={8}><PointScatterSeries /></Col>
        {/* Area */}
        <Col span={8}><AreaBasic /></Col>
        <Col span={8}><AreaPercentage /></Col>
        <Col span={8}><AreaRange /></Col>
        <Col span={8}><AreaStacked /></Col>
        <Col span={8}><AreaWithNegative /></Col>
        {/* Box */}
        <Col span={8}><BoxBasic /></Col>
        <Col span={8}><BoxGrouped /></Col>
        <Col span={8}><BoxWithError /></Col>
        {/* Candlestick */}
        <Col span={8}><CandlestickBasic /></Col>
        <Col span={8}><CandlestickKAndArea /></Col>
      </Row>
    );
  }
}

export default Index;
