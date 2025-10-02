import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Dropdown} from 'react-bootstrap'

function App() {

  let [selectedOption, setSelectedOption] = useState(null)
  let [selectedOptionRobot, setSelectedOptionRobot] = useState(null)
  

  function HandleSelect(eventKey) {
    setSelectedOption(eventKey)
  }
  function HandleSelectRobot(eventKey) {
    setSelectedOptionRobot(eventKey)
  }

  return (
    <div>
      <form>
        <h2>Scene</h2>
        <input type='file' accept='.xml' placeholder='Select xml File'></input>
        <h2>Ip Panel</h2>
        <h4>Primary</h4>
        <h5>IP: <input type='text'></input>.<input type='text'></input>.<input type='text'></input>.<input type='text'></input></h5>
        <input type='number' placeholder='Port'></input>
        <input type='checkbox' className='Scene config'></input>
        <label className='Scene config'>Scene Configuration Only</label>
        <h4>Secondary</h4>
        <h5>IP: <input type='text'></input>.<input type='text'></input>.<input type='text'></input>.<input type='text'></input></h5>
        <input type='text' placeholder='Interface'></input>
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
          selectedOption ?
          <div>
            <h5>IP: <input type='text'></input>.<input type='text'></input>.<input type='text'></input>.<input type='text'></input></h5>
            <input type='text' placeholder='Port for Sensor'></input>
          </div>
          :
          <></>
        }
        <h2>Robots</h2>
        <Dropdown onSelect={HandleSelectRobot}>
          <Dropdown.Toggle variant='success'>
            {selectedOptionRobot ? setSelectedOptionRobot : "Select Option"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Denso: VP-G 6242</Dropdown.Item>
            <Dropdown.Item>ABB: IRB 6620</Dropdown.Item>
            <Dropdown.Item>Yaskawa: HC10</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {
          selectedOptionRobot ?
          <div>
            <h5>IP: <input type='text'></input>.<input type='text'></input>.<input type='text'></input>.<input type='text'></input></h5>
            <input type='text' placeholder='Port for Robot'></input>
            <input type='text' placeholder='Stop Channel'></input>
            <input type='text' placeholder='Slow Channel'></input>
          </div>
          :
          <></>
        }
        <h2>Seperation Distance Config</h2>
        <input type='number' placeholder='System Reaction Time'></input>
        <input type='number' placeholder='Robot Stop Time'></input>
        <input type='number' placeholder='Maximum Robot speed'></input>
        <input type='number' placeholder='Detection Error'></input>
        <input type='number' placeholder='Robot Position Error'></input>
      </form>
    </div>
  )
}

export default App
