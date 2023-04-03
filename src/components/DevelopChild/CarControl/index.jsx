import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import environment from './index.module.css'

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
  const { kalmanParameter } = props
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
                      {kalmanParameter[0].kalman_parameters.camera_angle}
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
                      {kalmanParameter[0].kalman_parameters.really_angle}
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
                      {kalmanParameter[0].kalman_parameters.receive_location}
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
  const { kalmanParameter } = props
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
                    <TableCell align="right">
                      {kalmanParameter[0].PID.P}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell align="right">I</TableCell>
                    <TableCell align="right">
                      {kalmanParameter[0].PID.I}
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell align="right">D</TableCell>
                    <TableCell align="right">
                      {kalmanParameter[0].PID.D}
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

// Kalman Matrix行
function RowKalmanMatrix(props) {
  const { kalmanParameter } = props
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
                            {kalmanParameter[0].kalman_parameters.Q.map(
                              (row, i) => (
                                <tr key={i}>
                                  {row.map((col, j) => (
                                    <td key={j}>{col.toFixed(1)}</td>
                                  ))}
                                </tr>
                              )
                            )}
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
                            {kalmanParameter[0].kalman_parameters.R.map(
                              (row, i) => (
                                <tr key={i}>
                                  {row.map((col, j) => (
                                    <td key={j}>{col.toFixed(1)}</td>
                                  ))}
                                </tr>
                              )
                            )}
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

// 车辆控制模块
export default class index extends Component {
  state = {
    data: null,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    axios
      .get('http://sjtu-profqian.natapp1.cc/api/threejs/kalman')
      .then((response) => {
        this.setState({ data: response.data })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    const { data } = this.state
    return (
      <div className={environment.table}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <RowKalman kalmanParameter={kalmanParameter} />
          </Table>

          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <RowPID kalmanParameter={kalmanParameter} />
          </Table>

          <Table sx={{ minWidth: 100 }} aria-label="simple table">
            <RowKalmanMatrix kalmanParameter={kalmanParameter} />
          </Table>
        </TableContainer>
      </div>
    )
  }
}
