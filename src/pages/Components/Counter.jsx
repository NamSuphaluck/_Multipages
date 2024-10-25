import { useState } from 'react';
import PropTypes from 'prop-types'; 
import './Counter.css';

function Counter(props) {
    const [value, setValue] = useState(props.value || 0); 

    const increment = () => setValue(value + 1);
    const decrement = () => setValue(value - 1); 

    return (
        <div className="counter-container">
            <h3 className='counter-title'> {props.name || "Counter"} </h3> 
            <button className='btn btn-danger' onClick={decrement}> - </button>
            <span className='value'> {value} </span>
            <button className='btn btn-success' onClick={increment}> + </button>
        </div>
    );
}


Counter.propTypes = {
    value: PropTypes.number,
    name: PropTypes.string,
};

export default Counter;
