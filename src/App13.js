import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState , useEffect} from 'react';

function App() {
  const API_URL ='http://localhost:3500/items';

  const [items,setItems]= useState([]); // we will fetch data from the API using useEffect at the time of loading

  const [newItem, setNewItem]=useState('')

  const [search, setSearch] = useState('')

  const [fetchError, setFetchError] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect (()=> {

    const fetchItems = async () => {
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data');
        const listItems= await response.json(); //converting the received item to json object
        console.log(listItems);
        setItems(listItems);
        setFetchError(null)
      } catch (err){
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(()=>{
      (async () => await fetchItems())();
    },2000) // we are waiting for 2 seconds for the api to load 
    
    // Being an async function it needs to be called 
    // (async () => await fetchItems())(); 
    // as fetchItems is not returning anything we could have also called it directly by writing fetchItems()
    // This async IIFE(instantly invoked function expression) is required when function returns anything

  },[])

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
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color:"red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && 
        <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        }
      </main>
      <Footer itemsLength={items.length}/>
    </div>
  );
}

export default App;
