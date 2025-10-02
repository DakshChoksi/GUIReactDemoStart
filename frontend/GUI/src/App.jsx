import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Dropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import  axios from 'axios'

function App() {

  let [selectedOption, setSelectedOption] = useState("")
  let [selectedOptionBool, setSelectedOptionBool] = useState(false)
  let [selectedOptionRobot, setSelectedOptionRobot] = useState("")
  let [selectedOptionRobotBool, setSelectedOptionRobotBool] = useState(false)
  let [primaryIP, setPrimaryIP] = useState([])
  let [primaryPort, setPrimaryPort] = useState(0)
  let [includeSceneConfig, setIncludeSceneConfig] = useState(false)
  let [secondaryIP, setSecondaryIP] = useState([])
  let [inter, setInterface] = useState("")
  let [sensorIP, setSensorIP] = useState([])
  let [sensorPort, setSensorPort] = useState(0)
  let [robotIP, setRobotIP] = useState([])
  let [robotPort, setRobotPort] = useState(0)
  let [robotStopChannels, setRobotStopChannels] = useState([""])
  let [robotSlowChannels, setRobotSlowChannels] = useState([""])
  let [systemReactionTime, setSystemReactionTime] = useState(null)
  let [robotStopTime, setRobotStopTime] = useState(null)
  let [maximumRobotSpeed, setmaxRobotSpeed] = useState(null)
  let [detectionError, setDetectionError] = useState(null)
  let [robotPositionError, setRobotPositionError] = useState(null)

  console.log(primaryIP)

  function HandleSelect(eventKey) {
    setSelectedOption(eventKey)
    setSelectedOptionBool(true)
  }
  function HandleSelectRobot(eventKey) {
    setSelectedOptionRobot(eventKey)
    setSelectedOptionRobotBool(true)
  }

  function ConfigSubmit(e) {
    e.preventDefault()

    let configs = {
      selectedOption: selectedOption,
      selectedOptionRobot,
      primaryIP,
      primaryPort,
      includeSceneConfig,
      secondaryIP,
      interface: inter,
      sensorIP,
      sensorPort,
      robotIP,
      robotPort,
      robotStopChannels,
      robotSlowChannels,
      systemReactionTime,
      robotStopTime,
      maximumRobotSpeed,
      detectionError,
      robotPositionError
    }

    axios.post("http://localhost:4000/SaveConfigs", configs)
    .then((response) => {
      console.log(response.data)
    })
    .catch(error => console.error(error))

  }

  function DeleteChannel(idx, channelType) {
    if (channelType == "Stop") {
      let tempStopCh = [...robotStopChannels]
      tempStopCh.splice(idx, 1)
      setRobotStopChannels(tempStopCh)
    }
    else {
      let tempSlowCh = [...robotSlowChannels]
      tempSlowCh.splice(idx, 1)
      setRobotSlowChannels(tempSlowCh)
    }
  }

  function AddChannel(channelType) {
    if (channelType == "Stop") {
      setRobotStopChannels(prevChannel => [...prevChannel, ""])
      console.log(robotStopChannels)
    }
    else {
      setRobotSlowChannels(prevChannel => [...prevChannel, ""])
      console.log(robotSlowChannels)
    }
  }

  return (
    <div>
      <form onSubmit={ConfigSubmit}>
        <h2>Scene</h2>
        <input type='file' accept='.xml' placeholder='Select xml File'></input>
        <h2>Ip Panel</h2>
        <h4>Primary</h4>
        <h5>IP: <input type='text' onChange={(e) => {
            let TempPrimaryIP = [...primaryIP]
            e.target.value == "undefined" ? TempPrimaryIP[0] = "" : TempPrimaryIP[0] = e.target.value
            setPrimaryIP(TempPrimaryIP)
          }}></input>.<input type='text' onChange={(e) => {
            let TempPrimaryIP = [...primaryIP]
            e.target.value == "undefined" ? TempPrimaryIP[1] = "" : TempPrimaryIP[1] = e.target.value
            setPrimaryIP(TempPrimaryIP)
          }}></input>.<input type='text' onChange={(e) => {
            let TempPrimaryIP = [...primaryIP]
            e.target.value == "undefined" ? TempPrimaryIP[2] = "" : TempPrimaryIP[2] = e.target.value
            setPrimaryIP(TempPrimaryIP)
          }}></input>.<input type='text' onChange={(e) => {
            let TempPrimaryIP = [...primaryIP]
            e.target.value == "undefined" ? TempPrimaryIP[3] = "" : TempPrimaryIP[3] = e.target.value
            setPrimaryIP(TempPrimaryIP)
          }}></input></h5>
        <input type='number' placeholder='Port' onChange={(e) => setPrimaryPort(e.target.value)}></input>
        <input type='checkbox' className='Scene config' onChange={(e) => setIncludeSceneConfig(!includeSceneConfig)}></input>
        <label className='Scene config'>Scene Configuration Only</label>
        <h4>Secondary</h4>
        <h5>IP: <input type='text' onChange={(e) => {
            let TempSecondaryIP = [...secondaryIP]
            e.target.value == "undefined" ? TempSecondaryIP[0] = "" : TempSecondaryIP[0] = e.target.value
            setSecondaryIP(TempSecondaryIP)
          }}></input>.<input type='text' onChange={(e) => {
            let TempSecondaryIP = [...secondaryIP]
            e.target.value == "undefined" ? TempSecondaryIP[1] = "" : TempSecondaryIP[1] = e.target.value
            setSecondaryIP(TempSecondaryIP)
          }}></input>.<input type='text' onChange={(e) => {
            let TempSecondaryIP = [...secondaryIP]
            e.target.value == "undefined" ? TempSecondaryIP[2] = "" : TempSecondaryIP[2] = e.target.value
            setSecondaryIP(TempSecondaryIP)
          }}></input>.<input type='text' onChange={(e) => {
            let TempSecondaryIP = [...secondaryIP]
            e.target.value == "undefined" ? TempSecondaryIP[3] = "" : TempSecondaryIP[3] = e.target.value
            setSecondaryIP(TempSecondaryIP)
          }}></input></h5>
        <input type='text' placeholder='Interface' onChange={(e) => setInterface(e.target.value)}></input>
        <h2>Sensors</h2>
        <Dropdown onSelect={HandleSelect}>
          <Dropdown.Toggle variant="success">
            {selectedOption ? selectedOption : 'Select an Option'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="RealSense">RealSense</Dropdown.Item>
            <Dropdown.Item eventKey="FemtoMega">FemtoMega</Dropdown.Item>
            <Dropdown.Item eventKey="Sick Visionary">Sick Visionary</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {
          selectedOptionBool ?
          <div>
            <h5>IP: <input type='text' onChange={(e) => {
              let TempSensorIP = [...sensorIP]
              e.target.value == "undefined" ? TempSensorIP[0] = "" : TempSensorIP[0] = e.target.value
              setSensorIP(TempSensorIP)
            }}></input>.<input type='text' onChange={(e) => {
              let TempSensorIP = [...sensorIP]
              e.target.value == "undefined" ? TempSensorIP[1] = "" : TempSensorIP[1] = e.target.value
              setSensorIP(TempSensorIP)
            }}></input>.<input type='text' onChange={(e) => {
              let TempSensorIP = [...sensorIP]
              e.target.value == "undefined" ? TempSensorIP[2] = "" : TempSensorIP[2] = e.target.value
              setSensorIP(TempSensorIP)
            }}></input>.<input type='text' onChange={(e) => {
              let TempSensorIP = [...sensorIP]
              e.target.value == "undefined" ? TempSensorIP[3] = "" : TempSensorIP[3] = e.target.value
              setSensorIP(TempSensorIP)
            }}></input></h5>
            <input type='number' placeholder='Port for Sensor' onChange={(e) => setSensorPort(e.target.value)}></input>
          </div>
          :
          <></>
        }
        <h2>Robots</h2>
        <Dropdown onSelect={HandleSelectRobot}>
          <Dropdown.Toggle variant='success'>
            {selectedOptionRobot ? selectedOptionRobot : "Select Option"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Denso: VP-G 6242">Denso: VP-G 6242</Dropdown.Item>
            <Dropdown.Item eventKey="ABB: IRB 6620">ABB: IRB 6620</Dropdown.Item>
            <Dropdown.Item eventKey="Yaskawa: HC10">Yaskawa: HC10</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {
          selectedOptionRobotBool ?
          <div>
            <h5>IP: <input type='text' onChange={(e) => {
              let TempRobotIP = [...robotIP]
              e.target.value == "undefined" ? TempRobotIP[0] = "" : TempRobotIP[0] = e.target.value
              setRobotIP(TempRobotIP)
            }}></input>.<input type='text' onChange={(e) => {
              let TempRobotIP = [...robotIP]
              e.target.value == "undefined" ? TempRobotIP[1] = "" : TempRobotIP[1] = e.target.value
              setRobotIP(TempRobotIP)
            }}></input>.<input type='text' onChange={(e) => {
              let TempRobotIP = [...robotIP]
              e.target.value == "undefined" ? TempRobotIP[2] = "" : TempRobotIP[2] = e.target.value
              setRobotIP(TempRobotIP)
            }}></input>.<input type='text' onChange={(e) => {
              let TempRobotIP = [...robotIP]
              e.target.value == "undefined" ? TempRobotIP[3] = "" : TempRobotIP[3] = e.target.value
              setRobotIP(TempRobotIP)
            }}></input></h5>
            <input type='text' placeholder='Port for Robot' onChange={(e) => setRobotPort(e.target.value)}></input>
            {
              robotStopChannels.map((channel, idx) => (
               <div key={idx}>
                  <input type='text' placeholder='Stop Channel' onChange={(e) => {
                    let TempStopCh = [...robotStopChannels]
                    e.target.value == "undefined" ? TempStopCh[idx] = "" : TempStopCh[idx] = e.target.value
                    setRobotStopChannels(TempStopCh)
                  }}></input>
                  <button onClick={() => DeleteChannel(idx, "Stop")} type='button'>Delete</button>
               </div>
              ))
            }
            <button onClick={() => AddChannel("Stop")} type='button'>Add Stop Channel</button>
            {
              robotSlowChannels.map((channel, idx) => (
                <div key={idx}>
                  <input type='text' placeholder='Slow Channel' onChange={(e) => {
                      let TempSlowCh = [...robotSlowChannels]
                      e.target.value == "undefined" ? TempSlowCh[idx] = "" : TempSlowCh[idx] = e.target.value
                      setRobotSlowChannels(TempSlowCh)
                    }}></input>
                  <button onClick={() => DeleteChannel(idx, "Slow")} type='button'>Delete</button>
                </div>
              ))
            }
            <button onClick={() => AddChannel("Slow")} type='button'>Add Slow Channel</button>
          </div>
          :
          <></>
        }
        <h2>Seperation Distance Config</h2>
        <input type='number' placeholder='System Reaction Time' onChange={(e) => setSystemReactionTime(e.target.value)}></input>
        <input type='number' placeholder='Robot Stop Time' onChange={(e) => setRobotStopTime(e.target.value)}></input>
        <input type='number' placeholder='Maximum Robot speed' onChange={(e) => setmaxRobotSpeed(e.target.value)}></input>
        <input type='number' placeholder='Detection Error' onChange={(e) => setDetectionError(e.target.value)}></input>
        <input type='number' placeholder='Robot Position Error' onChange={(e) => setRobotPositionError(e.target.value)}></input>
        <button type='submit'>Done</button>
      </form>
    </div>
  )
}

export default App
