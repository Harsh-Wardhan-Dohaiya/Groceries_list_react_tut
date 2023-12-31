import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';

function App() {
  const [items,setItems]= useState([
    {
        id: 1,
        checked: true,
        item: "One kg of sugar"
    },
    {
        id: 2,
        checked: false,
        item: "item 2"
    },
    {
        id: 3,
        checked: false,
        item: "item 3"
    }
]);

const handleCheck = (id) => {
    const listItems = items.map((item)=> (item.id===id ? { ...item, checked: !item.checked} : item));
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems)); // item will be saved in our local storage under shoppinglist
}

const handleDelete = (id) => {
    const listItems=items.filter((item)=> item.id!==id);
    setItems(listItems);
    localStorage.setItem('shoppinglist', JSON.stringify(listItems));
}
  return (
    <div className="App">
      <Header title="Groceries list"/>
      <Content 
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer itemsLength={items.length}/>
    </div>
  );
}

export default App;
