import React, { Component, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

import develop from './index.module.css'
import editIcon from '../../asserts/photo/develop/edit.png'
import switchIcon from '../../asserts/photo/develop/switch.png'
import openIcon from '../../asserts/photo/develop/open.png'

// 导入子模块【环境感知、决策规划、车辆控制】
import ObjectRenderContext from './ObjectRenderContext'
import EnvironmentAwarence from '../../components/DevelopChild/EnvironmentAwarence'
import DecisionPlan from '../../components/DevelopChild/DecisionPlan'
import CarControl from '../../components/DevelopChild/CarControl'
import MapUpdater from '../../components/DevelopChild/MapUpdater'
import { message } from 'antd'

export default class index extends Component {
  state = {
    menuFlag: 1, //左边顶部按钮切换标志，1，2，3
    playing: true,
    pannel: true,
    selectedKeys: [],
  }

  constructor(props) {
    super(props)
    // this.state = {
    //   objectStates: { 1: true }, // 初始状态为空对象
    // }
    // this.toggleObjectRender = this.toggleObjectRender.bind(this)
  }

  render() {
    let { menuFlag, playing, pannel } = this.state
    const { mqttData } = this.props
    console.log('this is data in develop', mqttData)

    return (
      <div className={develop.container}>
        <div className={develop.bg}>{<MapUpdater mqttData={mqttData} />}</div>

        {/* 悬浮开关 */}
        <div className={develop.tools} style={{ zIndex: pannel ? 0 : 2 }}>
          <img
            src={openIcon}
            style={{
              float: 'left',
              marginTop: '20px',
              marginLeft: '5px',
              cursor: 'pointer',
              width: '30px',
              height: '30px',
            }}
            onClick={this.controlPannel}
          />
        </div>

        {/* 左边编辑页面 */}
        <div className={develop.left} style={{ zIndex: pannel ? 2 : 0 }}>
          {/* 上方导航栏 */}
          <div className={develop.left_top}>
            {/* 标题 */}
            <span className={develop.left_top_top}>
              <img src={editIcon} />
              <p>开发者模式</p>
              <img
                src={switchIcon}
                style={{ float: 'right', cursor: 'pointer' }}
                onClick={this.controlPannel}
              />
            </span>
            {/* 按钮切换 */}
            <span className={develop.left_top_bottom}>
              <span
                className={
                  menuFlag == 1
                    ? develop.switch_btn_selected
                    : develop.switch_btn_static
                }
                onClick={(e) => this.switchMenu(1)}>
                环境感知
              </span>
              <span
                className={
                  menuFlag == 2
                    ? develop.switch_btn_selected
                    : develop.switch_btn_static
                }
                onClick={(e) => this.switchMenu(2)}>
                决策规划
              </span>
              <span
                className={
                  menuFlag == 3
                    ? develop.switch_btn_selected
                    : develop.switch_btn_static
                }
                onClick={(e) => this.switchMenu(3)}>
                车辆控制
              </span>
            </span>
          </div>

          {/* 底部内容展示页面 */}

          <div className={develop.left_bottom}>
            {menuFlag == 1 ? (
              <EnvironmentAwarence mqttData={mqttData} />
            ) : menuFlag == 2 ? (
              <DecisionPlan mqttData={mqttData} />
            ) : (
              <CarControl mqttData={mqttData} />
            )}
          </div>
        </div>
      </div>
    )
  }

  // ===========================  自定义函数  ====================================

  componentDidMount() {
    // 初始化地图
    //const map = new window.BMapGL.Map("map");// 创建地图实例
    //var point = new window.BMapGL.Point(109.111062, 21.02762360632489);  //  默认
    //map.centerAndZoom(point, 14);
  }

  // 切换菜单事件
  switchMenu = (flag) => {
    this.state.menuFlag = flag
    this.forceUpdate()
  }

  // 控制面板显示
  controlPannel = () => {
    let { pannel } = this.state
    this.state.pannel = !pannel
    this.forceUpdate()
  }
}
