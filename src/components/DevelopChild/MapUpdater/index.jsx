import React, { Component, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import indoormap from './index.module.css'
import ObjectStateContext from '../../../App.js'

import indoorMap from '../../../asserts/photo/map.png'
import carIcon from '../../../asserts/photo/develop/car.png'
import { object } from 'prop-types'

const pastDecisionStatic = [
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

const currentDecisionStatic = [
  {
    objID: 1,
    point: 1,
    x: 650,
    y: 280,
  },
]

const carStatusStatic = [
  {
    _id: '630383a0687c069ca0864c40e',
    id: 1,
    x: 300,
    y: 250,
    objID: 1,
    x_obj: 800,
    y_obj: 200,
    Integral_Angle: 0,
  },
]

const environmentObjects = [
  {
    id: 1,
    type: 'truck',
    location: { x: 600, y: 350 },
    dimensions: { w: 1.0, l: 1.0 },
    rotation: 60,
    is_static: 0,
    update_rate: 4,
    state_vector: { s: 1.0, v: 1.0 },
    current_prediction: { x: 1.0, y: 1.0 },
    camera_source: '000ffff',
  },
  {
    id: 2,
    type: 'truck',
    location: { x: 200, y: 300 },
    dimensions: { w: 1.0, l: 1.0 },
    rotation: 30,
    is_static: 0,
    update_rate: 4,
    state_vector: { s: 1.0, v: 1.0 },
    current_prediction: { x: 1.0, y: 1.0 },
    camera_source: '000xxxx',
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

function CarAnimation() {
  const [position, setPosition] = useState({ x: 700, y: 250 })

  useEffect(() => {
    const intervalId = setInterval(() => {
      const x = Math.floor(Math.random() * window.innerWidth)
      const y = Math.floor(Math.random() * window.innerHeight)
      setPosition({ x, y })
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        backgroundImage: { indoorMap },
        backgroundPosition: `${position.x}px ${position.y}px`,
      }}>
      🚗
    </div>
  )
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

function RowAutopilot(props) {
  const { data } = props
  const [showRect, setShowRect] = React.useState(true)

  function handleCheckboxChange(event) {
    setShowRect(event.target.checked)
  }

  return (
    <rect
      x={object.location.x}
      y={object.location.y}
      width="60"
      height="30"
      fill="green"
      transform={`rotate(${-object.rotation} ${object.location.x} ${
        object.location.y
      })`}
    />
  )
}

export default class index extends Component {
  state = {
    mqttData: this.props,
    showRect: {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
    },
  }
  // static contextType = ObjectRenderContext

  constructor(props) {
    super(props)
  }

  handleCheckboxChange = (event, id) => {
    this.setState((prevState) => ({
      showRect: {
        ...prevState.showRect,
        [id]: event.target.checked,
      },
    }))
  }

  componentDidMount() {
    //   axios
    //     .get('http://sjtu-profqian.natapp1.cc/api/threejs/PathPlan')
    //     .then((response) => {
    //       this.setState({ data: response.data })
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //     })
    this.setState({ mqttData: this.props })
  }

  render() {
    const { objectStates } = this.context
    const { showRect } = this.state
    const { mqttData } = this.props
    const { data } = mqttData
    // console.log('this is data!', data)

    var carStatus = carStatusStatic
    var pastDecision = pastDecisionStatic
    var currentDecision = currentDecisionStatic

    const [v] = data
    console.log('this is v!', v)
    if (v) {
      carStatus = v
      console.log('this is v.location!', v.location.x)
      pastDecision = v.pastDecision
      currentDecision = v.currentDecision
    }

    return (
      <div className={indoormap.container}>
        <div className={indoormap.checkbox}>
          {environmentObjects.map((object) => (
            <div key={object.id} className={indoormap.checkbox_text}>
              <label>
                <input
                  type="checkbox"
                  checked={showRect[object.id]}
                  onChange={(e) => this.handleCheckboxChange(e, object.id)}
                />
                <img
                  src={carIcon}
                  style={{ width: '25px', height: '25px', marginTop: '-2px' }}
                />
                {`${object.type} ${object.id}`}
              </label>
            </div>
          ))}
        </div>
        <div style={{ height: '100vh', width: '70vw' }}>
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

            {/* 渲染小车 */}
            {/* <CarAnimation /> */}
            <rect
              x={carStatus[0].x}
              y={carStatus[0].y}
              // x={carStatus.location.x}
              // y={carStatus.location.y}
              width="60"
              height="30"
              fill="purple"
              transform={`rotate(${-carStatus[0].Integral_Angle} ${
                carStatus[0].x
              } ${carStatus[0].y})`}
            />
            {renderTextOnMap(
              carStatus[0].x + 20,
              carStatus[0].y,
              // carStatus.location.x + 20,
              // carStatus.location.y,
              'autopilot',
              'purple'
            )}

            {environmentObjects.map((object) =>
              // objectStates[object.id] ? (
              this.state.showRect[object.id] ? (
                <rect
                  x={object.location.x}
                  y={object.location.y}
                  width="60"
                  height="30"
                  fill="green"
                  transform={`rotate(${-object.rotation} ${object.location.x} ${
                    object.location.y
                  })`}
                />
              ) : null
            )}

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
