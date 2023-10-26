const Content = () => {
    const handleNameChange = () =>{
        const names=['Bob','David','Kevin'];
        const int =Math.floor(Math.random()*3);
        return names[int];
    }
    const handleClick = () => {
        console.log('I was clicked');
    }
    const handleClick2 = (name) =>{
        console.log(`${name} clicked me`);
    }
    const handleClick3 = (e) => { // e is event
        console.log(e.target);
    }

    return (
        <main>
            <p onDoubleClick={handleClick} >Hello {handleNameChange()}</p> 
            <button onClick={handleClick}>Click Me!</button>
            <button onClick={() => {handleClick2("Harsh")}}>Click Me!</button>
            <button onClick={(e) => {handleClick3(e)}}>Click Me!</button>

        </main>
    )
}

export default Content