import React, { useCallback, useState } from 'react';
import ListItem from '../ListItem/ListItem';

function UseCallback_Example(props) {
    const [theme, setTheme] = useState(false);
    const [num, setNumber] = useState(0);

    const toggleTheme = {
        backgroundColor: theme ? '#FFF' : '#000',
        color: theme ? '#000' : '#FFF'
    }

    const getItem = useCallback((inc) => {
        return [inc + num, inc + num + 1, inc + num + 2]
    }, [num])

return (
    <div style={toggleTheme}>
        <h2>UseCallback_Example</h2>
        <input type="text" onChange={(e) => setNumber(parseInt(e.target.value))} />
        <br /> <br />
        <button onClick={() => setTheme(!theme)}>Toggle theme</button>
        <ListItem getItem = {getItem} />

    </div>

);
}


export default UseCallback_Example;