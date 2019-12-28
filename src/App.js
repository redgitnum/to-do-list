import React from 'react';
import './App.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

let ListItem = ({item, deleteButton, completeButton}) => (
  <li className="list-group-item"><i onClick={completeButton} className="fas fa-check-circle mr-3 text-custom"></i>{item}<button type="button" className="close m-1" onClick={deleteButton}>&times;</button></li>
);
let List = ({items, deleteButton, completeButton}) => (
  <ul className="list-group">
    { 
      items.map((item,i)=> <ListItem key={i} item={item} completeButton={completeButton} deleteButton={deleteButton} />)
    }
  </ul>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
      list: cookies.get('list') || []
    };
  }
  
  onChange = (e) => {
    if(e.key === "Enter") {
      console.log('yay');
      this.setState({inputVal: e.target.value});
    }
    this.setState({inputVal: e.target.value});
    console.log(e.target.value);
  }
  addItem = () => {
    let {list, inputVal} = this.state;
    if(inputVal) {
      if(!list.includes(inputVal)) {
        this.setState({list: [...list, inputVal], inputVal: ''})
      }
      else {
        alert('already on the list');
      }
      
    }
  }
  Enter = (e) => {
    if(e.key === "Enter") {
      console.log('yeyy');
      this.addItem(e);
    }
  } 
  Delete = (e) => {
    
    let listArray = this.state.list;
    let indexDelete = listArray.indexOf(e.target.parentNode.innerText.slice(0,-2));
    console.log(listArray);
    console.log(e.target.parentNode.innerText.slice(0,-2));
    console.log(indexDelete);
    listArray.splice(indexDelete, 1);
    this.setState({list: listArray});
    console.log(listArray);
    // e.target.parentNode.remove();
  }
  Complete = (e) => {
    let oneItem = e.target.parentNode;
    let complete = oneItem.querySelector(".fa-check-circle");
    if(oneItem.style.textDecorationLine === "line-through") {
      oneItem.style.textDecorationLine = "none";
      oneItem.style.fontWeight = "bold";
      oneItem.style.background = "white";
      oneItem.style.color = "#272727";
      
      complete.className="fas fa-check-circle mr-3 text-custom";
    }
    else {
      oneItem.style.textDecorationLine = "line-through";
      oneItem.style.fontWeight = "100";
      oneItem.style.color = "green";
      oneItem.style.background = "rgba(145, 235, 145, 0.212)";
      complete.className="fas fa-check-circle mr-3 text-custom-off";
    }
    
    console.log(complete);
  } 
  render() {
    let {list, inputVal} = this.state;
    console.log(list)
    cookies.set('list', [...this.state.list])
    return (

      <div className="cont">
        <div className="alert alert-primary shadow rounded">
          <h4 className="alert-heading text-center mr-auto">
            TO DO LIST
          </h4>
          <div className="listCont"> 
              <List items={list} deleteButton={this.Delete} completeButton={this.Complete} />
          </div>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Item to add..." value={inputVal} onKeyDown={this.Enter} onChange={this.onChange}/>
              <div className="input-group-append">
                <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={this.addItem}>Add</button>
              </div>
            </div>
         </div> 
      </div>
      
    );
  }
}
export default App;
