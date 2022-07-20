import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreament, increament } from '../../redux/Action/Counter.action';

function Counter(props) {
    const dispatch = useDispatch();
    const c = useSelector(state => state.counter);

    const handleIncreament = () => {
        dispatch(increament())
    }

    const handleDecreament = () => {
        dispatch(decreament())
    }

    return (
        <div>
            <button onClick={() => handleIncreament()}> + </button>
            {c.counter}
            <button onClick={() => handleDecreament()}> - </button>
        </div>
    );
}

export default Counter;