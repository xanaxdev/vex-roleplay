import  { useState } from "react"
import './assets/styles.scss'

const AdminPanel = () => {
    const [vehicleName, setVehicleName] = useState('adder')
    const [coords, setCoords] = useState({x: '', y: '', z: ''})


    const spawnVehicle = () => {
        mp.trigger('spawnVehicle', vehicleName);
    }

    const teleportToCoords = () => {
        mp.trigger('teleportToCoords', coords.x, coords.y, coords.z);
    }

    const teleportToWaypoint = () => {
        mp.trigger('teleportToWaypoint');
    }

    return (
        <div className="panel">
        <h2>Dev Panel</h2>
  
        <div className="section">
          <label>Pojazd</label>
          <input value={vehicleName} onChange={e => setVehicleName(e.target.value)} />
          <button onClick={spawnVehicle}>Zresp Pojazd</button>
        </div>
  
        <div className="section">
          <label>Teleportuj do koordynatów</label>
          <input placeholder="X" value={coords.x} onChange={e => setCoords({ ...coords, x: e.target.value })} />
          <input placeholder="Y" value={coords.y} onChange={e => setCoords({ ...coords, y: e.target.value })} />
          <input placeholder="Z" value={coords.z} onChange={e => setCoords({ ...coords, z: e.target.value })} />
          <button onClick={teleportToCoords}>Teleportuj</button>
        </div>
  
        <div className="section">
          <button onClick={teleportToWaypoint}>Teleportuj do waypointa</button>
        </div>
      </div>
    )
}

export default AdminPanel