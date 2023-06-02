// 根组件
import { React, useState } from "react"
import './App.css'
import mqtt from 'precompiled-mqtt'

// 引入路由组件
import { Switch, Route, Redirect } from 'react-router-dom'

// 引入路由配置
import { adminRoutes } from './routes'

import Frame from './components/Frame'
import ObjectRenderContext from "./pages/Develop/ObjectRenderContext"

export const ObjectStateContext = ObjectRenderContext

function App () {
  const [mqttData, setMqttData] = useState({ data: [] })
  const [objectStates, setObjectStates] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  })

  function toggleObjectRender (objectId) {
    setObjectStates((prevState) => ({
      ...prevState,
      [objectId]: !prevState[objectId],
    }))
  }


  // mqtt连接设定信息
  const topic1 = 'kalman'
  const topic2 = 'dyna_data'
  const topic3 = 'vehicle_data'
  const WebSocket_URL = 'ws://121.43.37.161:8085/mqtt'
  const options = {
    // 超时时间
    connectTimeout: 4000,

    // 认证信息
    clientId: 'test_react', //可自己定义，最好不要重复
    username: 'zhangyihan', //emq 用户名
    password: '480110', //密码

    // 心跳时间
    keepalive: 60,
    clean: true,
  }
  const client = mqtt.connect(WebSocket_URL, options)

  // 连接成功后初始化mqtt订阅
  client.on('connect', () => {
    console.log('Connected to', WebSocket_URL)

    // 订阅主题
    client.subscribe(topic1, (err) => {
      console.log(err || `sucessfully subscribed on topic ${topic1}`)
    })
  })

  client.on('message', (topic1, message) => {
    const res1 = JSON.parse(message.toString().replace(/'/g, '"'))
    // setMqttData(res1)
    console.log("receivde data from kalman", mqttData)
  })

  client.on('connect', () => {
    console.log('Connected to', WebSocket_URL)

    client.subscribe(topic2, (err) => {
      console.log(err || `sucessfully subscribed on topic ${topic2}`)
    })
  })

  // dynamic data
  client.on('message', (topic2, message) => {
    const res2 = JSON.parse(message.toString().replace(/'/g, '"'))
    // setMqttData(res)
    console.log("receivde data from dynamic", res2)
  })

  // vehicle data
  client.on('connect', () => {
    console.log('Connected to', WebSocket_URL)

    client.subscribe(topic3, (err) => {
      console.log(err || `sucessfully subscribed on topic ${topic3}`)
    })
  })

  client.on('message', (topic3, message) => {
    const res3 = JSON.parse(message.toString().replace(/'/g, '"'))
    setMqttData(res3)
    console.log("receivde data from vehicle", res3)
  })



  return (
    <Frame>
      <ObjectRenderContext.Provider
        value={{
          objectStates, toggleObjectRender
        }}>
        <div className='insert'>
          <Switch>
            {adminRoutes.map(route => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  render={routeProps => {
                    return <route.component {...routeProps}
                      data={route.data} mqttData={mqttData}>
                    </route.component>
                  }}>
                </Route>
              )
            })}
            <Redirect to="/404" />
          </Switch>
        </div>
      </ObjectRenderContext.Provider>
    </Frame>
  )
}

export default App