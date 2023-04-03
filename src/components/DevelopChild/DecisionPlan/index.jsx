import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import decision from './index.module.css'

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
      x: 1,
      y: 1,
    },
    point_2: {
      x: 2,
      y: 2,
    },
    point_3: {
      x: 3,
      y: 3,
    },
    point_4: {
      x: 4,
      y: 4,
    },
    point_5: {
      x: 5,
      y: 5,
    },
  },
]

// 用于将x,y渲染为(x,y)格式
function Coordinate({ x, y }) {
  return <div>{`(${x},${y})`}</div>
}

// autopilot status行
function RowAutopilot(props) {
  const { carStatus } = props
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
          <TableCell style={{ paddingLeft: 10 }}>
            <div className={decision.show_box_tablehead}>Autopilot Status</div>
          </TableCell>
          <TableCell align="left">
            <div className={decision.show_box_tablehead}>Value</div>
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
                    <TableCell align="right">autopilot position</TableCell>
                    <TableCell align="right">
                      <div>
                        <Coordinate
                          x={carStatus[0].x_obj}
                          y={carStatus[0].y_obj}
                        />
                      </div>
                    </TableCell>
                  </TableRow>

                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell align="right">intergral angle</TableCell>
                    <TableCell align="right">
                      {carStatus[0].Integral_Angle}
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

// current decision行
function RowCurrentDecision(props) {
  const { currentDecision } = props
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
          <TableCell style={{ paddingLeft: 20 }}>
            <div className={decision.show_box_tablehead}>Current Decision</div>
          </TableCell>
          <TableCell align="left">
            <div className={decision.show_box_tablehead}>Position</div>
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
                    <TableCell style={{ paddingLeft: 105 }}>
                      current goal
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <Coordinate
                          x={currentDecision[0].x}
                          y={currentDecision[0].y}
                        />
                      </div>
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

// past decisions行
function RowPastDecisions(props) {
  const { pastDecision } = props
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
            <div className={decision.show_box_tablehead}>Past Decisions</div>
          </TableCell>
          <TableCell style={{ paddingLeft: 25 }}>
            <div className={decision.show_box_tablehead}>Position</div>
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
                    <TableCell style={{ paddingLeft: 95 }}>
                      past position 1
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <Coordinate
                          x={pastDecision[0].point_1.x}
                          y={pastDecision[0].point_1.y}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell style={{ paddingLeft: 95 }}>
                      past position 2
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <Coordinate
                          x={pastDecision[0].point_2.x}
                          y={pastDecision[0].point_2.y}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell style={{ paddingLeft: 95 }}>
                      past position 3
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <Coordinate
                          x={pastDecision[0].point_3.x}
                          y={pastDecision[0].point_3.y}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell style={{ paddingLeft: 95 }}>
                      past position 4
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <Coordinate
                          x={pastDecision[0].point_4.x}
                          y={pastDecision[0].point_4.y}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      '&:last-child td, &:last-child th': {
                        border: 0,
                      },
                    }}>
                    <TableCell style={{ paddingLeft: 95 }}>
                      past position 5
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <Coordinate
                          x={pastDecision[0].point_5.x}
                          y={pastDecision[0].point_5.y}
                        />
                      </div>
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
      <div className={decision.table}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 100 }} aria-label="collapsible table">
            <RowAutopilot carStatus={carStatus} />
          </Table>

          <Table sx={{ minWidth: 100 }} aria-label="collapsible table">
            <RowCurrentDecision currentDecision={currentDecision} />
          </Table>

          <Table sx={{ minWidth: 100 }} aria-label="collapsible table">
            <RowPastDecisions pastDecision={pastDecision} />
          </Table>
        </TableContainer>
      </div>
    )
  }
}
