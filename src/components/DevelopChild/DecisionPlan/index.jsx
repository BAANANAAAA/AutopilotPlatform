import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import decision from './index.module.css'

import staticIcon from '../../../asserts/photo/develop/static.png'
import moveIcon from '../../../asserts/photo/develop/move.png'
import resultIcon from '../../../asserts/photo/develop/result.png'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const carStatus = [
  {
    _id: '630383a0687c069ca0864c40e',
    id: 1,
    x: 10,
    y: 11,
    objID: 1,
    x_obj: 10,
    y_obj: 11,
    Integral_Angle: 90.0,
  },
]

const currentDecision = [
  {
    _id: '630383a0687c069ca0864c40e',
    objID: 1,
    point: 1,
    x: 10,
    y: 11,
  },
]

const pastDecision = [
  {
    _id: '630383a0687c069ca0864c40e',
    point_1: {
      x: 10,
      y: 11,
    },
    point_2: {
      x: 10,
      y: 11,
    },
    point_3: {
      x: 10,
      y: 11,
    },
    point_4: {
      x: 10,
      y: 11,
    },
    point_5: {
      x: 10,
      y: 11,
    },
  },
]

function Coordinate({ x, y }) {
  return <div>{`(${x},${y})`}</div>
}

// 决策规划
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
    const { data } = this.state
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ paddingLeft: '45px' }}>
                <div className={decision.show_box_tablehead}>
                  Autopilot Status
                </div>
              </TableCell>
              <TableCell padding="checkbox" style={{ paddingLeft: '15px' }}>
                <div className={decision.show_box_tablehead}>Value</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {carStatus.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '50px' }}>
                  autopilot position
                </TableCell>
                <TableCell align="left">
                  <div>
                    <Coordinate x={parameters.x} y={parameters.y} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {carStatus.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '55px' }}>
                  current decision
                </TableCell>
                <TableCell align="left">
                  <div>
                    <Coordinate x={parameters.x_obj} y={parameters.y_obj} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {carStatus.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '60px' }}>
                  intergral angle
                </TableCell>
                <TableCell align="left">{parameters.Integral_Angle}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr></hr>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ paddingLeft: '40px' }}>
                <div className={decision.show_box_tablehead}>
                  Current Decision
                </div>
              </TableCell>
              <TableCell padding="checkbox" style={{ paddingLeft: '15px' }}>
                <div className={decision.show_box_tablehead}>Position</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableCell
              component="th"
              scope="row"
              style={{ paddingLeft: '50px' }}>
              current decision
            </TableCell>
            <TableCell>
              {currentDecision.map((parameters) => (
                <TableRow>
                  <Coordinate x={parameters.x} y={parameters.y} />
                </TableRow>
              ))}
            </TableCell>
          </TableBody>
        </Table>
        <hr></hr>
        <Table sx={{ minWidth: 100 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ paddingLeft: '50px' }}>
                <div className={decision.show_box_tablehead}>
                  Past Decisions
                </div>
              </TableCell>
              <TableCell padding="checkbox" style={{ paddingLeft: '8px' }}>
                <div className={decision.show_box_tablehead}>Position</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastDecision.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '80px' }}>
                  point 1
                </TableCell>
                <TableCell align="left">
                  <div>
                    <Coordinate
                      x={parameters.point_1.x}
                      y={parameters.point_1.y}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pastDecision.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '80px' }}>
                  point 2
                </TableCell>
                <TableCell align="left">
                  <div>
                    <Coordinate
                      x={parameters.point_2.x}
                      y={parameters.point_2.y}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pastDecision.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '80px' }}>
                  point 3
                </TableCell>
                <TableCell align="left">
                  <div>
                    <Coordinate
                      x={parameters.point_3.x}
                      y={parameters.point_3.y}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pastDecision.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '80px' }}>
                  point 4
                </TableCell>
                <TableCell align="left">
                  <div>
                    <Coordinate
                      x={parameters.point_4.x}
                      y={parameters.point_4.y}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {pastDecision.map((parameters) => (
              <TableRow
                key={parameters.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ paddingLeft: '80px' }}>
                  point 5
                </TableCell>
                <TableCell align="left">
                  <div>
                    <Coordinate
                      x={parameters.point_5.x}
                      y={parameters.point_5.y}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}
