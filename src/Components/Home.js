import React, { Component } from 'react';
import './Home.css'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        error: null,
        isLoaded: false,
        items:[],
        postBody:{
            make: "Make",
            model: "Model",
            seats:'Seats'
            }
        
        }
    }
  //Sends a GET request to the express middleware which returns an array of all the car items stored in cars.json
  getCar() {
        fetch("https://car-app-server.herokuapp.com/api")
        .then(res => res.json())
        .then(
        (result) => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result.items
        }); },
        (error) => {
        this.setState({
        isLoaded: true,
        error
        }); 
      }) }

  //Sends a DELETE request to the express middleware which deletes a car item from the cars.json file
  onDeleteStudent = (itemId) => {           
    // Default options are marked with *
    return fetch('https://car-app-server.herokuapp.com/car/'+itemId, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then(
      (result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          items: result.items
      }); },
      (error) => {
      this.setState({
      isLoaded: true,
      error
      }); 
    })           
  }

  //Sends a POST request to the express middleware which adds a car item to the cars.json file
  postCar = (data) => {
  // Default options are marked with 
    return fetch('https://car-app-server.herokuapp.com/car', {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match"Content-Type" header
    })
    .then(response => response.json())
    .then(
      (result) => {
        console.log(result)
        this.setState({
          isLoaded: true,
          items: result.items
      }); },
      (error) => {
      this.setState({
      isLoaded: true,
      error
      });
    })
    
  }

  //Sends a PUT request to the express middleware which changes either the seats or model field
  putCar = (id,data) => {
    // Default options are marked with 
    return fetch('https://car-app-server.herokuapp.com/car/'+id, {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // body data type must match"Content-Type" header
      })
        .then(response => response.json())
        .then(
          (result) => {
            console.log(result)
            this.setState({
            isLoaded: true,
            items: result.items
          }); },
          (error) => {
            this.setState({
            isLoaded: true,
            error
          });
      })
  }

  handleModelEdit = (event,id,index) => {
    // 1. Make a shallow copy of the items
    let items = [...this.state.items];
    console.log(items);
    // 2. Make a shallow copy of the item you want to mutate
    let item = {...items[index]};
    console.log(item)
    // 3. Replace the property you're intested in
    item.model = event.target.value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    this.setState({items});
  }

  handleSeatsEdit = (event,id,index) => {
    // 1. Make a shallow copy of the items
    let items = [...this.state.items];
    // 2. Make a shallow copy of the item you want to mutate
    let item = {...items[index]};
    // 3. Replace the property you're intested in
    item.seats = event.target.value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    this.setState({items});
  }

  //updates the make property in state postbody  upon change of its correspond input field  
  handleMakeChange = (event) => {
    this.setState({ 
      postBody: {
        ...this.state.postBody,
        make: event.target.value,
      }  
    });
  }
          
  //updates the make property in the postBody state upon change of its correspond input field  
  handleSeatsChange = (event) => {
    this.setState({          
      postBody: {
        ...this.state.postBody,
        seats: event.target.value,
      } 
    });
  }  
  //updates the model property in the postBody state upon change of its correspond input field        
  handleModelChange = (event) => {
    this.setState({            
      postBody: {
      ...this.state.postBody,
      model: event.target.value,
      } 
    });
  }
  //calls the postCar function and resets the state of the postBody to its default values upon clicking of the 'add' button  
  handleSubmit = (event) => {
    this.postCar(this.state.postBody);
    this.setState({postBody:{
      make: "Make",
      model: "Model",
      seats:'Seats'
      }})
    //console.log(this.state.postBody)
    event.preventDefault();
  };
  //calls the putCar function and determines which data to pass into it upon clicking of the 'edit' icon button
  handleIconClick = (id,par,index) =>{
    console.log("this is " + id)
    if(par === "model"){
      console.log("Edit item" + this.state.items[index].model)
      this.putCar(id,{model: this.state.items[index].model});      
    }else if(par === "seats"){
      console.log("Edit item" + this.state.items[index].seats);
      this.putCar(id,{seats:this.state.items[index].seats});
    }
  }

  //calls the getCar method
  componentDidMount(){
    this.getCar();
  }
      
  render() {
    let dataRows
    if(this.state.isLoaded){
      dataRows = this.state.items.map((item,index) => (
        <tr key = {item.id}>
          <td>{item.id}</td>
          <td>{item.make}</td>
          <td><input value = {this.state.items[index].model} onChange={(e) => this.handleModelEdit(e,item.id,index)}/></td>
          <td><button className = "icon"><i class="fas fa-edit" onClick = {(e) => this.handleIconClick(item.id,"model",index)}></i></button></td>
          <td><input value = {this.state.items[index].seats} onChange={(e) => this.handleSeatsEdit(e,item.id,index)}/></td>
          <td><button className = "icon"><i class="fas fa-edit" onClick = {(e) => this.handleIconClick(item.id,"seats",index)}></i></button></td>
          <td><button className = "button" onClick = {() => this.onDeleteStudent(item.id)}>Delete</button></td>
        </tr>))
        }
  return (
      <div className = "filter">
          <table> 
            <thead>                  
              <tr>
                <th>ID</th>
                <th>Make</th>
                <th>Model</th>
                <th>Edit</th>
                <th>Seats</th>
                <th>Edit</th>
                <th>Actions</th>
              </tr>
              </thead>  
              <tbody>
                {dataRows}

              <tr>
                <td>#</td>
                <td><input type="text" id="make" onChange={this.handleMakeChange} value={this.state.postBody.make}/></td>
                <td><input type="text" id="model" onChange={this.handleModelChange} value={this.state.postBody.model}/></td>
                <td></td>
                <td><input type="text" id="seats" onChange={this.handleSeatsChange} value={this.state.postBody.seats}/></td>
                <td></td>
                <td><button className = "button" onClick={this.handleSubmit} >Add</button></td>
              </tr> 
            </tbody>
          </table>
      </div>
    );
    }
}

export default Home;