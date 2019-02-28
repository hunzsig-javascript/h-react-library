import React, { Component } from 'react';
import { Chart, Axis, Geom, Tooltip, Legend, Util, Shape } from 'bizcharts';

function getRectPath(points) {
  const path = [];
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([action, point.x, point.y]);
    }
  }
  const first = points[0];
  path.push(['L', first.x, first.y]);
  path.push(['z']);
  return path;
}

function getFillAttrs(cfg) {
  const defaultAttrs = Shape.interval;
  const attrs = Util.mix({}, defaultAttrs, {
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity,
  }, cfg.style);
  return attrs;
}

Shape.registerShape('interval', 'waterfall', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let rectPath = getRectPath(cfg.points);
    rectPath = this.parsePath(rectPath);
    const interval = container.addShape('path', {
      attrs: Util.mix(attrs, {
        path: rectPath,
      }),
    });

    if (cfg.nextPoints) {
      let linkPath = [
        ['M', cfg.points[2].x, cfg.points[2].y],
        ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y],
      ];

      if (cfg.nextPoints[0].y === 0) {
        linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y];
      }
      linkPath = this.parsePath(linkPath);
      container.addShape('path', {
        attrs: {
          path: linkPath,
          stroke: 'rgba(0, 0, 0, 0.8)',
          lineDash: [1, 3],
        },
      });
    }
    return interval;
  },
});

export default class BarWaterfall extends Component {
  static displayName = 'BarWaterfall';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
    this.dataSet = this.props.dataSet;
  }

  render() {
    return (
      <Chart {...this.dataSet.chartParams}>
        <Legend
          custom={true}
          clickable={false}
          {...this.dataSet.legend}
        />
        {
          this.dataSet.axis.map((axis, aidx) => {
            return <Axis key={aidx} {...axis} />;
          })
        }
        <Tooltip />
        <Geom type="interval" {...this.dataSet.geom[0]} />
      </Chart>
    );
  }
}
