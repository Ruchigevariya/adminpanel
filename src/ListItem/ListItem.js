import React, { useEffect, useState } from 'react';

function ListItem({ getItem }) {
    const [item , setItem] = useState(0)
    
    useEffect(() => {
        setItem(getItem)
    }, [5])

    return (
        <div>
        {
            inc.map((i) => {
                
            })
        }
 
        </div>
    );
}

export default ListItem;