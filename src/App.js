import React, {useEffect} from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Items from './Items';
import Paginator from './Paginator';

function App() {

  const [domain , setDomain] = React.useState('')
  const [amount, setAmount] = React.useState('')
  const [distance, setDistance] = React.useState('')
  const [date, setDate] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [showForm , setShowForm] = React.useState(false)
  const [items, setItems] = React.useState([])
  const [filtered, setFiltered] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [colsPerPage] = React.useState(6)

  const indexOfLastCol = currentPage * colsPerPage
  const indexOfFirstCol = indexOfLastCol - colsPerPage
  const currentCols = filtered.slice(indexOfFirstCol, indexOfLastCol)

  const pagenate = pageNumber => setCurrentPage(pageNumber);


  useEffect(() => {
    const items = axios.get('http://localhost:3001/items', null)
    .then((res, error) => { if(error){console.log(error.message)} else {setItems(res.data)}})
  },[])


  useEffect(() => {
    onFilter(items, search)
    console.log(items)
    },[items, search])


  function onFilter(items, search){
    const result = items.filter(( item ) => {
      return !search || item.domain.includes(search)
    })
    setFiltered(result)
  }

  const changeDomain = (event) => {
    setDomain( event.target.value )
  }
  const changeAmount = (event) => {
    setAmount(event.target.value )
  }
  const changeDistance = (event) => {
    setDistance(event.target.value )
  }
  const changeDate = (event) => {
    setDate(event.target.value)
  }
  const onLoading = (load) => {
    setLoading(load)
  }
  const onSearch = (event) => {
    setSearch(event.target.value)
  }

  const submit = (event) => {
    event.preventDefault()
    onLoading(true)
    const data = { domain, amount, distance,  date }
    axios.post('http://localhost:3001/create', data)
    .then((res, error) => { if(error){
                  onLoading(false); 
                  console.log(error.message)
                  } else {
                    onLoading(false)
                    setItems(res.data)
                  } })
    .catch(error => { onLoading(false) })
  }

  const onRemove = (index) => {
      const data =  { "index" : index }
      axios.post('http://localhost:3001/remove', data).
      then((res) => setItems(res.data)).catch(error => { console.log(error) })
  }

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const table = {
    "backgroundColor" : "#fff",
    "color" : "black",
    "borderRadius" : "10px",
    "maxHeight" : "500px",
    "minHeight" : "360px"
  }
  const heading = {
    borderLeft : "1px solid grey",
    borderBottom : "1px solid grey",
    padding : "6px",
    backgroundColor : "#f0f0f0",
    paddingLeft : "16px",
    textAlign : "left",
    fontSize : "22px"
  }
  const noDisplay = {
    display : "none"
  }
  const display = {
  }

  return (
    <div className="App">
      <header className="App-header">
    <div className="container">
      <div className="row">

        <div className="col-4">
          <div className="input-group mb-3">
            <input onChange = {onSearch} 
                   type="text" 
                   class="form-control" 
                   placeholder="Поиск по названию" 
                   aria-describedby="button-addon1"/>
          </div>
        </div>

        <div className="col-4 pb-3">Таблица</div>
        <div style={{ fontSize : "18px",textAlign : "right"}} className="col-4">Всего: {filtered.length}</div>

        <div style={table} className="container-fluid table">
          <div className="row">
              <div style={heading} className="col">№</div>
              <div style={heading} className="col">Название:</div>
              <div style={heading} className="col">Количество:</div>
              <div style={heading} className="col">Растояние:</div>
              <div style={heading} className="col">Дата:</div>
              <div style={heading} className='col-1'></div>
          </div>
          <Items onRemove={onRemove} filtered={filtered} currentCols={currentCols} /> 

        </div>
        <Paginator
        colsPerPage={colsPerPage}
        totalCols={filtered.length}
        pagenate={pagenate}
        />
        <div class="container-fluid row">
          <div className="col-10">
          <form onSubmit={submit} className="form-inline" style={showForm == false ? noDisplay : display }>
            <div className="form-group mb-2">
              <input onChange={changeDomain} type="text" className="form-control" id="domain" placeholder="Название"/>
            </div>
            <div className="form-group mx-sm-2 mb-2">
              <input onChange={changeAmount} style={{ width : "110px", fontSize : "14px", textAlign : "left", }} 
                      type="number" 
                      class="form-control" 
                      id="amount" 
                      placeholder="Количество" />
            </div>
            <div className="form-group mx-sm-2 mb-2">
              <input onChange={changeDistance} style={{ width : "110px", fontSize : "14px", textAlign : "left", }} 
                      type="number" 
                      class="form-control" 
                      id="distance" placeholder="Растояние метр." />
            </div>
            <div className="form-group mx-sm-2 mb-2">
              <input onChange={changeDate} style={{ width : "160px", fontSize : "14px", textAlign : "left", }} 
                      type="date" 
                      class="form-control" 
                      id="date" placeholder="Дата" />
            </div>
            {loading ?  <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
              : <button type="submit" class="btn btn-primary mb-2">Принять</button>  }
        </form>

        </div>
          <div className="col-2" style={{ fontSize : "18px",textAlign : "right"}} >
            <button onClick={toggleForm} type="button" className="btn btn-primary">Добавить</button>
          </div>
        </div>
    </div>
</div>
      </header>
    </div>
  );
}

export default App;
