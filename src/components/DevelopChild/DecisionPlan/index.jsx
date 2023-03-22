import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import decision from './index.module.css'

import staticIcon from '../../../asserts/photo/develop/static.png'
import moveIcon from '../../../asserts/photo/develop/move.png'
import resultIcon from '../../../asserts/photo/develop/result.png'

// 决策规划模块
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
    return <div className={decision.container}>决策规划</div>
  }
}
