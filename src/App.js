import React, { useState , useEffect} from 'react';
import Character from './Character'
import './App.css'
import pic from './pic.png'
import Pagination from './Pagination';

function App() {

 const [info, setInfo] = useState("");

 const [print, setPrint] = useState([]);

 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage] = useState(12);


 const onInputChnage  = (e) => {
   setInfo(e.target.value);
 }
 
 const onFormSubmit = (e) => {
  e.preventDefault();
}

useEffect(() => {
  fetch(`https://www.breakingbadapi.com/api/characters?name=${info}`)  
  .then(res=>res.json())
  .then(data=>{
   setPrint(data);
  })
}, [print])


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = print.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div className='container'> 
       <img src={pic} className="responsive" alt=" "/>
          <div className ="search-bar ui segment">
                <form onSubmit={onFormSubmit} className="ui form">
                    <div className="field">
                        <input type="text"
                         placeholder="Find Your Favourite Character...."
                          value={info} 
                          onChange={onInputChnage}>
                        </input> <br/><br/><hr/>
                    </div>
                </form>

        <section className='cards'>
        {
         currentPosts.map((item)=>{
           return <Character key={item.char_id} item={item}/>
         })
        }
       </section>

       <Pagination
        postsPerPage={postsPerPage}
        totalPosts={print.length}
        paginate={paginate}
      />

          </div> 
          </div>     
  );
}
export default App;   