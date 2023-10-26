import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState , useEffect} from 'react';

function App() {
  const [items,setItems]= useState(JSON.parse(localStorage.getItem('shoppinglist')) || []);

  const [newItem, setNewItem]=useState('')

  const [search, setSearch] = useState('')

  console.log("Before useEffect")
  useEffect (()=> {
    console.log("Inside useEffect")
  },[items])
  console.log("After useEffect")

  const addItem = (item) => {
    const id = items.length ? items[items.length-1].id +1 : 1
    const myNewItem={id, checked: false, item}
    const listItems=[...items,myNewItem];
    setItems(listItems);
    localStorage.setItem('shoppinglist',JSON.stringify(listItems));
  }

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

  const handleSubmit = (e) => {
    e.preventDefault(); //prevents the page from reloading
    if(!newItem) return;
    addItem(newItem);
    setNewItem(''); // so that the AddItem space appears blank agains
  }

  return (
    <div className="App">
      <Header title="Groceries list"/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer itemsLength={items.length}/>
    </div>
  );
}

export default App;
