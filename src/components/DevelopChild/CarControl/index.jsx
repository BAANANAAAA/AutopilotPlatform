import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import environment from './index.module.css'

import LineChart from '../../Echarts/lineChart'
import resultIcon from '../../../asserts/photo/develop/result.png'

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

const kalmanParameter = [
  {
    id: 1,
    kalman_parameters: {
      Q: [
        [0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0],
      ],
      R: [
        [0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0],
        [0.0, 0.0, 0.0, 0.0],
      ],
      camera_angle: [0, 0, 0],
      really_angle: [0, 0, 0],
      receive_location: [0, 0, 0],
      Kalman_location: [0, 0, 0],
    },
    PID: {
      P: 1.0,
      I: 1.0,
      D: 1.0,
    },
  },
]

// autopilot status行
function RowKalman(props) {
  const { data } = props
  var really_angle = kalmanParameter[0].kalman_parameters.really_angle
  var camera_angle = kalmanParameter[0].kalman_parameters.camera_angle
  var receive_location = kalmanParameter[0].kalman_parameters.receive_location
  const [v] = data
  if (v) {
    really_angle = v.kalman_parameters.really_angle
    camera_angle = v.kalman_parameters.camera_angle
    receive_location = v.kalman_parameters.receive_location
  }
  const [open, setOpen] = React.useState(true)

  return (
    <React.Fragment>
      <TableHead>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            {/* 设置开关按钮 */}
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{ paddingLeft: 0 }}>
            <div className={environment.show_box_tablehead}>
              Kalman Parameters
            </div>
          </TableCell>
          <TableCell align="left">
            <div className={environment.show_box_tablehead}>Value</div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell align="right">camera angle</TableCell>
                    <TableCell align="right">
                      <div>{`(${camera_angle[0]})`}</div>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell align="right">really angle</TableCell>
                    <TableCell align="right">
                      <div>{`(${really_angle[0]})`}</div>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell align="right">recive location</TableCell>
                    <TableCell align="right">
                      <div>{`(${receive_location[0]})`}</div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

// PID parameters行
function RowPID(props) {
  const { data } = props
  var P = kalmanParameter[0].PID.P
  var I = kalmanParameter[0].PID.I
  var D = kalmanParameter[0].PID.D
  const [v] = data
  if (v) {
    P = v.PID.P
    I = v.PID.I
    D = v.PID.D
  }
  const [open, setOpen] = React.useState(true)

  return (
    <React.Fragment>
      <TableHead>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            {/* 设置开关按钮 */}
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{ paddingLeft: 15 }}>
            <div className={environment.show_box_tablehead}>PID Parameters</div>
          </TableCell>
          <TableCell style={{ paddingLeft: 30 }}>
            <div className={environment.show_box_tablehead}>Value</div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell align="right">P</TableCell>
                    <TableCell align="right">{P}</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell align="right">I</TableCell>
                    <TableCell align="right">{I}</TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell align="right">D</TableCell>
                    <TableCell align="right">{D}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

// Kalman Matrix行
function RowKalmanMatrix(props) {
  const { data } = props
  var Q = kalmanParameter[0].kalman_parameters.Q
  var R = kalmanParameter[0].kalman_parameters.R
  const [v] = data
  if (v) {
    Q = v.kalman_parameters.Q
    R = v.kalman_parameters.R
  }

  const [open, setOpen] = React.useState(true)

  return (
    <React.Fragment>
      <TableHead>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            {/* 设置开关按钮 */}
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell style={{ paddingLeft: 25 }}>
            <div className={environment.show_box_tablehead}>Kalman Matrix</div>
          </TableCell>
          <TableCell style={{ paddingLeft: 30 }}>
            <div className={environment.show_box_tablehead}>Value</div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableBody>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell style={{ paddingLeft: 130 }}>Q</TableCell>
                    <TableCell align="right">
                      {
                        <table align="right">
                          <tbody>
                            {Q.map((row, i) => (
                              <tr key={i}>
                                {row.map((col, j) => (
                                  <td key={j}>
                                    {col.toFixed()}
                                    {j !== row.length - 1 ? ',' : null}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell style={{ paddingLeft: 130 }}>R</TableCell>
                    <TableCell align="right">
                      {
                        <table align="right">
                          <tbody>
                            {R.map((row, i) => (
                              <tr key={i}>
                                {row.map((col, j) => (
                                  <td key={j}>
                                    {col.toFixed(0)}
                                    {j !== row.length - 1 ? ',' : null}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

//chart测试数据
const chartTestData = {
  labels: [
    '-9s',
    '-8s',
    '-7s',
    '-6s',
    '-5s',
    '-4s',
    '-3s',
    '-2s',
    '-1s',
    'now',
  ],
  values: [9, 5, 2, 4, 4, 5, 6, 14, 8, 9, 2, 5, 12],
}

function generateChartData(type, data, dataQueue) {
  // console.log(data)

  if (type === 'P') {
    dataQueue.push(data[0].PID.P)
  } else if (type === 'I') {
    dataQueue.push(data[0].PID.I)
  } else if (type === 'D') {
    dataQueue.push(data[0].PID.D)
  }
  dataQueue.push(chartTestData.values)

  if (dataQueue.length > 10) {
    dataQueue.shift()
  }

  const dataArray = dataQueue.slice()

  const labels = [
    '-9s',
    '-8s',
    '-7s',
    '-6s',
    '-5s',
    '-4s',
    '-3s',
    '-2s',
    '-1s',
    'now',
  ]

  return {
    title: `${type} in last 10s`,
    labels,
    dataArray,
  }
}

function generateTestChartData(type, value, dataQueue) {
  // console.log(data)
  dataQueue.push(value)

  if (dataQueue.length > 10) {
    dataQueue.shift()
  }

  const dataArray = dataQueue.slice()

  const labels = [
    '-9s',
    '-8s',
    '-7s',
    '-6s',
    '-5s',
    '-4s',
    '-3s',
    '-2s',
    '-1s',
    'now',
  ]

  return {
    title: `${type} in last 10s`,
    labels,
    dataArray,
  }
}

// 车辆控制模块
export default class index extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // axios
    //   .get('http://sjtu-profqian.natapp1.cc/api/threejs/kalman')
    //   .then((response) => {
    //     this.setState({ data: response.data })
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
    this.setState({ mqttData: this.props })
  }

  render() {
    const PdataQueue = []
    const IdataQueue = []
    const DdataQueue = []
    const { mqttData } = this.props
    const { data } = mqttData
    var Pchart, Ichart, Dchart
    chartTestData.values.map(
      (value) => (
        (Pchart = generateTestChartData('P', value, PdataQueue)),
        (Ichart = generateTestChartData('I', value, IdataQueue)),
        (Dchart = generateTestChartData('D', value, DdataQueue))
      )
    )
    // var Pchart = generateChartData('P', kalmanParameter, PdataQueue)
    // var Ichart = generateChartData('I', kalmanParameter, IdataQueue)
    // var Dchart = generateChartData('D', kalmanParameter, DdataQueue)
    // const [v] = data
    // if (v) {
    //   Pchart = generateChartData(v.kalmanParameter, PdataQueue)
    //   Ichart = generateChartData(v.kalmanParameter, IdataQueue)
    //   Dchart = generateChartData(v.kalmanParameter, DdataQueue)
    // }

    return (
      <div className={environment.table}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <RowKalman data={data} />
          </Table>

          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <RowPID data={data} />
          </Table>

          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <RowKalmanMatrix data={data} />
          </Table>
        </TableContainer>

        <div className={environment.show_box}>
          <span className={environment.show_box_top}>
            <img src={resultIcon} />
            <p>PID</p>
          </span>
          <span className={environment.show_box_bottom}>
            <LineChart
              title={Pchart.title}
              labels={Pchart.labels}
              values={Pchart.dataArray}
            />
          </span>
          <span className={environment.show_box_bottom}>
            <LineChart
              title={Ichart.title}
              labels={Ichart.labels}
              values={Ichart.dataArray}
            />
          </span>
          <span className={environment.show_box_bottom}>
            <LineChart
              title={Dchart.title}
              labels={Dchart.labels}
              values={Dchart.dataArray}
            />
          </span>
        </div>
      </div>
    )
  }
}
