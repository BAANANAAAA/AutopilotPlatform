import React, { Component, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import indoormap from './index.module.css'

import staticIcon from '../../../asserts/photo/develop/static.png'
import moveIcon from '../../../asserts/photo/develop/move.png'
import resultIcon from '../../../asserts/photo/develop/result.png'
import indoorMap from '../../../asserts/photo/map.png'

const pastDecision = [
  {
    point_1: {
      x: 250,
      y: 500,
    },
    point_2: {
      x: 300,
      y: 400,
    },
    point_3: {
      x: 150,
      y: 600,
    },
    point_4: {
      x: 400,
      y: 400,
    },
    point_5: {
      x: 500,
      y: 350,
    },
  },
]

const currentDecision = [
  {
    objID: 1,
    point: 1,
    x: 650,
    y: 280,
  },
]

const carStatus = [
  {
    _id: '630383a0687c069ca0864c40e',
    id: 1,
    x: 10,
    y: 11,
    objID: 1,
    x_obj: 800,
    y_obj: 200,
    Integral_Angle: 90.0,
  },
]

// 定义地图尺寸和坐标原点
const mapWidth = window.innerWidth
const mapHeight = window.innerHeight
const originX = 700
const originY = 250

// 将现实坐标系转换为地图坐标系
function convertCoord(x, y) {
  const mapX = originX + 28.24 * x
  const mapY = originY - 32.92 * y
  return { mapX, mapY }
}

function getX(data) {
  const x = data[0].x
  return x
}

function getY(data) {
  const y = data[0].y
  return y
}

// 在地图上渲染点
function renderPastDecisionOnMap(point, color) {
  // const { MapX, MapY } = convertCoord(point.x, point.y)
  return <circle cx={point.x} cy={point.y} r="5" fill={color} />
}

function renderCurrentDecisionOnMap(point, color) {
  // const { MapX, MapY } = convertCoord(point.x, point.y)
  const { x, y } = point[0]
  return <circle cx={x} cy={y} r="5" fill={color} />
}

function renderUltimateGoalOnMap(point, color) {
  const x = point[0].x_obj
  const y = point[0].y_obj
  return <circle cx={x} cy={y} r="5" fill={color} />
}

function renderTextOnMap(x, y, text, color) {
  return (
    <text
      text
      x={x + 10}
      y={y - 10}
      fontSize={20}
      fontWeight="bold"
      fill={color}>
      {text}
    </text>
  )
}

// 定义坐标系样式
const axisStyleX = {
  stroke: 'green',
  strokeWidth: '5px',
}

const axisStyleY = {
  stroke: 'red',
  strokeWidth: '5px',
}

export default class index extends Component {
  state = { data: null }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    axios
      .get('http://sjtu-profqian.natapp1.cc/api/threejs/PathPlan')
      .then((response) => {
        this.setState({ data: response.data })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    // const { data } = this.state

    return (
      <div className={indoormap.container}>
        <div style={{ height: '100vh', width: '75vw' }}>
          <svg
            style={{ height: '100%', width: '100%', objectFit: 'contain' }}
            viewBox={`0 0 ${mapWidth} ${mapHeight}`}>
            {/* 绘制地图 */}
            <image href={indoorMap} x="0" y="0" width="100%" height="100%" />

            {/* 绘制 x 轴 */}
            <line
              x1={-mapWidth}
              y1={originY}
              x2={mapWidth - 40}
              y2={originY}
              style={axisStyleX}
              markerEnd="url(#arrowhead-x)"
            />
            <text x={mapWidth - 80} y={originY - 10} fontSize={30} fill="green">
              X
            </text>
            <marker
              id="arrowhead-x"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="3"
              markerHeight="3"
              orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="green" />
            </marker>

            {/* 绘制 y 轴 */}
            <line
              x1={originX}
              y1={-mapHeight + 900}
              x2={originX}
              y2={mapHeight + 50}
              style={axisStyleY}
              markerEnd="url(#arrowhead-y)"
            />
            <text
              text
              x={originX + 10}
              y={mapHeight + 50}
              fontSize={30}
              fill="red">
              Y
            </text>
            <marker
              id="arrowhead-y"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="3"
              markerHeight="3"
              orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="red" />
            </marker>

            {/* 绘制坐标原点 */}
            <circle cx={originX} cy={originY} r="6" fill="red" />

            {renderTextOnMap(
              pastDecision[0].point_1.x,
              pastDecision[0].point_1.y,
              'past goal 1',
              'blue'
            )}
            {pastDecision.map((points) =>
              renderPastDecisionOnMap(points.point_1, 'blue')
            )}

            {renderTextOnMap(
              pastDecision[0].point_2.x,
              pastDecision[0].point_2.y,
              'past goal 2',
              'blue'
            )}
            {pastDecision.map((points) =>
              renderPastDecisionOnMap(points.point_2, 'blue')
            )}

            {renderTextOnMap(
              pastDecision[0].point_3.x,
              pastDecision[0].point_3.y,
              'past goal 3',
              'blue'
            )}
            {pastDecision.map((points) =>
              renderPastDecisionOnMap(points.point_3, 'blue')
            )}

            {renderTextOnMap(
              pastDecision[0].point_4.x,
              pastDecision[0].point_4.y,
              'past goal 4',
              'blue'
            )}
            {pastDecision.map((points) =>
              renderPastDecisionOnMap(points.point_5, 'blue')
            )}

            {renderTextOnMap(
              pastDecision[0].point_5.x,
              pastDecision[0].point_5.y,
              'past goal 5',
              'blue'
            )}
            {pastDecision.map((points) =>
              renderPastDecisionOnMap(points.point_4, 'blue')
            )}

            {/* 当前决策 */}

            {renderTextOnMap(
              currentDecision[0].x,
              currentDecision[0].y,
              'current goal',
              'orange'
            )}
            {renderCurrentDecisionOnMap(currentDecision, 'orange')}

            {/* 小车目标点 */}
            {renderTextOnMap(
              carStatus[0].x_obj,
              carStatus[0].y_obj,
              'goal',
              'red'
            )}
            {renderUltimateGoalOnMap(carStatus, 'red')}
          </svg>
        </div>
      </div>
    )
  }
}
