import React, { Component, createContext, useState } from 'react'
import {
  DownOutlined,
  FrownFilled,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from '@ant-design/icons'
import { Tree } from 'antd'
import axios from 'axios'
import environment from './index.module.css'
import ObjectRenderContext from '../../../pages/Develop/ObjectRenderContext.js'

import staticIcon from '../../../asserts/photo/develop/static.png'
import moveIcon from '../../../asserts/photo/develop/move.png'
import resultIcon from '../../../asserts/photo/develop/result.png'
import bodyIcon from '../../../asserts/photo/develop/body.png'
import dotIcon from '../../../asserts/photo/develop/dot.png'
import carIcon from '../../../asserts/photo/develop/car.png'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

import LineChart from '../../Echarts/lineChart'
import { object } from 'prop-types'

export const TreeContext = createContext({
  checkedKeys: [],
  setCheckedKeys: () => {},
})

const environmentObjects = [
  {
    id: 1,
    type: 'truck',
    location: { x: 1.0, y: 1.0 },
    dimensions: { w: 1.0, l: 1.0 },
    rotation: 1.0,
    is_static: 0,
    update_rate: 4,
    state_vector: { s: 1.0, v: 1.0 },
    current_prediction: { x: 1.0, y: 1.0 },
    camera_source: '000ffff',
  },
  {
    id: 2,
    type: 'building',
    location: { x: 1.0, y: 1.0 },
    dimensions: { w: 1.0, l: 1.0 },
    rotation: 1.0,
    is_static: 0,
    update_rate: 4,
    state_vector: { s: 1.0, v: 1.0 },
    current_prediction: { x: 1.0, y: 1.0 },
    camera_source: '000xxxx',
  },
]

// 用于将后端数据转化为tree结构
function transformData(data) {
  return data.map((item) => {
    return {
      title: item.id,
      key: item.id.toString(),
      children: [
        {
          title: `type: ${item.type}`,
          key: `${item.id}-0`,
          icon: (
            <img
              src={dotIcon}
              style={{ width: '15px', height: '15px', marginTop: '-3px' }}
            />
          ),
        },
        {
          title: `camera source: ${item.camera_source}`,
          key: `${item.id}-1`,
          icon: (
            <img
              src={dotIcon}
              style={{ width: '15px', height: '15px', marginTop: '-3px' }}
            />
          ),
        },
      ],
    }
  })
}

// static区域测试数据示例
const staticTreeData = [
  {
    title: '0000ffff',
    key: '0-0',
    children: [
      {
        title: 'type: car',
        key: '0-0-0',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
      {
        title: 'camera_source: 0111xxx',
        key: '0-0-1',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
    ],
  },
  {
    title: '0000ffff',
    key: '0-1',
    children: [
      {
        title: 'type: car',
        key: '0-1-0',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
      {
        title: 'camera_source: 0111xxx',
        key: '0-1-1',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
    ],
  },
  {
    title: '0000ffff',
    key: '0-2',
    children: [
      {
        title: 'type: car',
        key: '0-2-0',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
      {
        title: 'camera_source: 0111xxx',
        key: '0-2-1',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
    ],
  },
]

// moving区域测试数据示例
const moveTreeData = [
  {
    title: '0000ffff',
    key: '0-0',
    children: [
      {
        title: 'type: car',
        key: '0-0-0',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
      {
        title: 'camera_source: 0111xxx',
        key: '0-0-1',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
    ],
  },
  {
    title: '0000ffff',
    key: '0-1',
    children: [
      {
        title: 'type: car',
        key: '0-1-0',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
      {
        title: 'camera_source: 0111xxx',
        key: '0-1-1',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
    ],
  },
  {
    title: '0000ffff',
    key: '0-2',
    children: [
      {
        title: 'type: car',
        key: '0-2-0',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
      {
        title: 'camera_source: 0111xxx',
        key: '0-2-1',
        icon: (
          <img
            src={dotIcon}
            style={{ width: '15px', height: '15px', marginTop: '-3px' }}
          />
        ),
      },
    ],
  },
]

//图标测试数据
const chart = {
  title: '测试结果',
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  values: [150, 230, 224, 218, 135, 147, 260],
}

// 环境感知模块
export default class index extends Component {
  state = {
    mqttData: this.props,
    showRect: false,
  }
  static contextType = ObjectRenderContext

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // axios
    //   .get('http://sjtu-profqian.natapp1.cc/api/threejs/obstacles')
    //   .then((response) => {
    //     this.setState({ data: response.data })
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }

  handleCheckboxChange(checkedKeys, { checked, checkedNodes, node, event }) {
    const nodeTitle = node.title // 获取当前节点的 title

    this.setState((prevState) => ({
      showRect: {
        ...prevState.showRect,
        [node.title]: event.target.checked,
      },
    }))
  }

  render() {
    var rawData = environmentObjects
    const { mqttData } = this.props
    const { data } = mqttData
    const [v] = data
    if (v) {
      rawData = v
    }

    var transformedData = transformData(rawData)

    return (
      <div className={environment.table}>
        <div className={environment.container}>
          <div className={environment.show_box}>
            <span className={environment.show_box_top}>
              <img src={staticIcon} />
              <p>Static</p>
            </span>
            <span className={environment.show_box_bottom}>
              <Tree
                showIcon
                selectable={true}
                switcherIcon={
                  <img
                    src={bodyIcon}
                    style={{ width: '25px', height: '25px', marginTop: '-2px' }}
                  />
                }
                treeData={transformedData}
                style={{
                  backgroundColor: '#323232',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 550,
                }}
              />
            </span>
          </div>

          <div className={environment.show_box}>
            <span className={environment.show_box_top}>
              <img src={moveIcon} />
              <p>Moving</p>
            </span>
            <span className={environment.show_box_bottom}>
              <Tree
                showIcon
                selectable={true}
                switcherIcon={
                  <img
                    src={carIcon}
                    style={{
                      width: '25px',
                      height: '25px',
                      marginTop: '-1.5px',
                    }}
                  />
                }
                treeData={transformedData}
                style={{
                  backgroundColor: '#323232',
                  color: 'white',
                  fontSize: '18px',
                  fontWeight: 550,
                }}
              />
            </span>
          </div>

          <div className={environment.show_box}>
            <span className={environment.show_box_top}>
              <img src={resultIcon} />
              <p>Overview</p>
            </span>
            <span className={environment.show_box_bottom}>
              <LineChart
                title={chart.title}
                labels={chart.labels}
                values={chart.values}
              />
            </span>
          </div>
        </div>
      </div>
    )
  }
}
