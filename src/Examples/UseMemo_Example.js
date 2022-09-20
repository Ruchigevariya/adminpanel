import React, { useMemo, useState } from 'react';

function UseMemo_Example(props) {
    const [counter, setCounter] = useState(0);
    const [num, setNumber] = useState(0);

    const findFactorial = (n) => {
        console.log("findFactorial");
        
        if(n > 1){
            return n * findFactorial(n - 1);
        }else{
            return 1;
        }
        
    }

    // without UseMemo
    // const result = findFactorial(num)

    // With UseMemo 
    const result = useMemo(() => {
        return findFactorial(num)
    },[num])

    return (
        <div>
            <h2>UseMemo_Example</h2>
            <br />
            <br />

            <input type="text" onChange={(e) => setNumber(parseInt(e.target.value))}/>

            <br />

            <button onClick={() => setCounter(counter + 1)}>Counter</button>

            counter:{counter}
            <br/>
            <br/>
            factorial:{result}
        </div>
    );
}

export default UseMemo_Example;