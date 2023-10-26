import { useState } from "react";

const Content = () => {
    const [name, setName] = useState('Dave');
    const [count, setCount] = useState(0);

    const handleNameChange = () =>{
        const names=['Bob','David','Kevin'];
        const int =Math.floor(Math.random()*3);
        setName(names[int]);
    }
    
    const handleClick = () => {
        setCount(count+1)
        setCount(count+1)
        console.log(`count is ${count}`);
    }
    const handleClick2 = (name) =>{
        console.log(`Count is ${count}`);
    }

    return (
        <main>
            <p onDoubleClick={handleClick} >Hello {name}</p>
            <button onClick={handleNameChange}>Click Me!</button>
            <button onClick={handleClick}>Click Me!</button>
            <button onClick={handleClick2}>Click Me!</button>

        </main>
    )
}

export default Content