import React, { useState } from 'react';
import ListItem from '../ListItem/ListItem';

function UseCallback_Example(props) {
    const [theme, setTheme] = useState(false);
    const [num, setNumber] = useState(0);

    const toggleTheme = {
        backgroundColor: theme ? '#FFF' : '#000',
        color: theme ? '#000' : '#FFF'
    }

    const getItem = (inc) => {
        return inc
    }

    return (
        <div style={toggleTheme}>
            <h2>UseCallback_Example</h2>
            <button onClick={() => setTheme(!theme)}>Toggle theme</button>
            <br /> <br />
            <input type="text" onChange={(e) => setNumber(parseInt(e.target.value))} />
            <ListItem getItem = {getItem}/>

        </div>

    );
}

export default UseCallback_Example;