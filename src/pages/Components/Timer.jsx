import './Timer.css'
import { useState } from 'react'

function Timer() {
    const [running, setRunning] = useState(false);
    
    function handleRunPauseClick() {
        setRunning(prevRunning => !prevRunning);  // สลับค่าระหว่าง true/false
    }

    return (
        <div className='timer-container'>
            <h3 className='timer-title'> Timer </h3>
            <p><input className='timer-display' type="text" readOnly={true} placeholder='10d' /></p>
            <div className='timer-buttons'>
                <button className='btn btn-danger'>Reset</button>
                <button className='btn btn-success' onClick={handleRunPauseClick}>
                    {running ? 'Pause' : 'Run'}  {/* แสดงข้อความตามสถานะ */}
                </button>
            </div>
        </div>
    )
}

export default Timer;
