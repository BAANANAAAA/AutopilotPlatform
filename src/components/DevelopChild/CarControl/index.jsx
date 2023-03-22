import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import car from './index.module.css'

import staticIcon from '../../../asserts/photo/develop/static.png'
import moveIcon from '../../../asserts/photo/develop/move.png'
import resultIcon from '../../../asserts/photo/develop/result.png'

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
    return <div className={car.container}>车辆控制</div>
  }
}
