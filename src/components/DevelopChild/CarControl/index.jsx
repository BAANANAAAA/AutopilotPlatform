import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import car from './index.module.css'
import environment from './index.module.css'
import { ReactDOM } from 'react-dom'
import { styled } from '@mui/material/styles'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import staticIcon from '../../../asserts/photo/develop/static.png'
import moveIcon from '../../../asserts/photo/develop/move.png'
import resultIcon from '../../../asserts/photo/develop/result.png'

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ paddingLeft: '25px' }}>
                <div className={environment.show_box_tablehead}>
                  Kalman Parameters
                </div>
              </TableCell>
              <TableCell padding="checkbox" style={{ paddingRight: '45px' }}>
                <div className={environment.show_box_tablehead}>Value</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  Q
                </TableCell>
                <TableCell align="left">
                  {
                    <table align="left">
                      <tbody>
                        {parameters.kalman_parameters.Q.map((row, i) => (
                          <tr key={i}>
                            {row.map((col, j) => (
                              <td key={j}>{col.toFixed(1)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  }
                </TableCell>
              </TableRow>
            ))}
            {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  R
                </TableCell>
                <TableCell align="center">
                  {
                    <table align="center">
                      <tbody>
                        {parameters.kalman_parameters.R.map((row, i) => (
                          <tr key={i}>
                            {row.map((col, j) => (
                              <td key={j}>{col.toFixed(1)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  }
                </TableCell>
              </TableRow>
            ))} */}
            {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '50px' }}>
                  camera_angle
                </TableCell>
                <TableCell align="left">
                  {parameters.kalman_parameters.camera_angle}
                </TableCell>
              </TableRow>
            ))}
            {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '55px' }}>
                  really_angle
                </TableCell>
                <TableCell>
                  {parameters.kalman_parameters.really_angle}
                </TableCell>
              </TableRow>
            ))}
            {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '45px' }}>
                  receive_location
                </TableCell>
                <TableCell>
                  {parameters.kalman_parameters.receive_location}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr></hr>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ paddingLeft: '40px' }}>
                <div className={environment.show_box_tablehead}>
                  PID Parameters
                </div>
              </TableCell>
              <TableCell padding="checkbox" style={{ paddingRight: '22px' }}>
                <div className={environment.show_box_tablehead}>Value</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '90px' }}>
                  P
                </TableCell>
                <TableCell>{parameters.PID.P}</TableCell>
              </TableRow>
            ))}
            {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '90px' }}>
                  I
                </TableCell>
                <TableCell>{parameters.PID.I}</TableCell>
              </TableRow>
            ))}
            {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '90px' }}>
                  D
                </TableCell>
                <TableCell>{parameters.PID.D}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr></hr>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ paddingLeft: 45 }}>
                <div className={environment.show_box_tablehead}>
                  Kalman Matrix
                </div>
              </TableCell>
              <TableCell padding="checkbox" style={{ paddingLeft: 65 }}>
                <div className={environment.show_box_tablehead}>Value</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: 90 }}>
                  Q
                </TableCell>
                <TableCell>
                  {
                    <table align="center">
                      <tbody>
                        {parameters.kalman_parameters.Q.map((row, i) => (
                          <tr key={i}>
                            {row.map((col, j) => (
                              <td key={j}>{col.toFixed(1)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  }
                </TableCell>
              </TableRow>
            ))}
            {kalmanParameter.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: 90 }}>
                  R
                </TableCell>
                <TableCell>
                  {
                    <table align="center">
                      <tbody>
                        {parameters.kalman_parameters.R.map((row, i) => (
                          <tr key={i}>
                            {row.map((col, j) => (
                              <td key={j}>{col.toFixed(1)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}
