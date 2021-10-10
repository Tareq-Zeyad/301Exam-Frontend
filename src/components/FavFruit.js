import React from 'react';
import axios from 'axios';
import {Row} from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import FavItem from './FavItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateModal from './UpdateModal';

class FavFruit extends React.Component {

  constructor(props){
    super(props)
    this.state={
      FavFruitArr:[],
      showFlag: false,
      fruitName:'',
      fruitPrice:'',
      fruitId:''
    }
  }

  
  componentDidMount=()=>{
    const {user} = this.props.auth0;
    const userEmail = user.email;
    console.log(userEmail);
    console.log(this.props.auth0.user.email);

    const url=`http://localhost:3010/getFavoriteFruits?email=${this.props.auth0.user.email}`;
    axios
    .get(url)
    .then(result => {
      console.log(url);

      this.setState({
        FavFruitArr: result.data
      });
      console.log(result.data);
    })
    .catch(err=>{
      console.log(err);
    });
  };

  deleteItem=(object)=>{
   
    const id= object.id;
    const url = `http://localhost:3010/deleteItem/${id}`;
    axios
    .delete(url,object)
    .then(result=>{
      this.setState({
        FavFruitArr: result.data,
      })
    })
    .catch(err=>{
      console.log(err);
    })

  }

  updateFruit=(event)=>{
    event.preventDefault();
    const {user} = this.props.auth0;
    const email = user.email;
    const obj = {
      fruitName: event.target.fruitName.value,
      fruitPrice: event.target.fruitPrice.value,
      fruitId: this.state.fruitId, 
      email:email
    }
    

    // const id = object.id;
    const url = `http://localhost:3010/updateFavFruit/${this.state.fruitId}`
    axios
    .put(url,obj)
    .then(result=>{
      this.setState({
        FavFruitArr: result.data
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }

  handleClose = () => {
    this.setState({
      showFlag: false
    })
  }

  showUpdateForm = (item) => {
    this.setState({
      showFlag: true,
      fruitName: item.fruitName,
      fruitPrice: item.fruitPrice,
      fruitId: item._id
    })
  }


  render() {
    return(
      <>
      <UpdateModal
      show = {this.state.showFlag}
      handleClose = {this.handleClose}
      fruitName={this.state.fruitName}
      fruitPrice={this.state.fruitPrice}
      updateFruit={this.updateFruit}
      />
        <h1>My Favorite Fruits</h1>
        <Row>
        {this.state.FavFruitArr.map(item => {
            return (
              <FavItem
                item={item}
                deleteItem={this.deleteItem}
                showUpdateForm={this.showUpdateForm}
              />
            )
          })}
        </Row>
      </>
    )
  }
}

export default withAuth0(FavFruit);
