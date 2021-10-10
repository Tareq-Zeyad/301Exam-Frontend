import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import FruitItem from './FruitItem';
import { Row } from 'react-bootstrap';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fruitArr: [],
    }
  }

  componentDidMount = () => {
    const url = 'http://localhost:3010/getFruits';
    axios
      .get(url)
      .then(result => {
        this.setState({
          fruitArr: result.data.fruits,
        })
        console.log(this.state.fruitArr);
      })
      .catch(err => {
        console.log(err);
      })
  }

   addToFavoritesCollection=(object)=>{
    
    const url = 'http://localhost:3010/addToFavorites';

    axios
    .post(url,object)
    .then(result=>{
      console.log('added to favorites successfuly');
    })
    .catch(err=>{
      console.log(err);
    })
    
  }

  

  render() {
    return (
      <>
        <h1>Fruits Basket</h1>
        <Row>
          {this.state.fruitArr.map(item => {
            return (
              <FruitItem
                item={item}
                addToFavoritesCollection={this.addToFavoritesCollection}
              />
            )
          })}
        </Row>
      </>
    )
  }
}

export default Home;
