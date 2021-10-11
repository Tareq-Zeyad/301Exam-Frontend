import React from 'react';
import axios from 'axios';
import { Row } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import FavItem from './FavItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateModal from './UpdateModal';

class FavFruit extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      FavFruitArr: [],
      showFlag: false,
      fruitName: '',
      fruitPrice: '',
      fruitId: '',
      fruitImage:''
    }
  }


  componentDidMount = () => {
    const { user } = this.props.auth0;
    const userEmail = user.email;
    console.log(userEmail);
    console.log(this.props.auth0.user.email);

    const url = `http://localhost:3010/getFavoriteFruits?email=${this.props.auth0.user.email}`;
    axios
      .get(url)
      .then(result => {
        console.log(url);

        this.setState({
          FavFruitArr: result.data
        });
        console.log(result.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteItem = (object) => {
    const { user } = this.props.auth0;
    const email = user.email;
    const obj = {
      email: email

    }
    console.log(email);
    const id = object.id;
    const url = `http://localhost:3010/deleteItem/${id}/${email}`;
    axios
      .delete(url, obj)
      .then(result => {
        console.log(result.data);

        this.setState({
          FavFruitArr: result.data,
        })
        console.log(this.state.FavFruitArr);
      })
      .catch(err => {
        console.log(err);
      })

  }

  updateFruit = (event) => {
    event.preventDefault();

    const { user } = this.props.auth0;
    const email = user.email;
    const obj = {
      fruitName: event.target.fruitName.value,
      fruitPrice: event.target.fruitPrice.value,
      fruitImage: event.target.fruitImage.value,
      fruitId: this.state.fruitId,
      email: email
    }
    console.log(obj);

    // const id = object.id;
    const url = `http://localhost:3010/updateFavFruit/${this.state.fruitId}`
    axios
      .put(url, obj)
      .then(result => {
        this.setState({
          FavFruitArr: result.data
        })
      })
      .catch(err => {
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
      fruitImage:item.fruitImage,
      fruitId: item._id
    })
  }


  render() {
    return (
      <>
        <UpdateModal
          show={this.state.showFlag}
          handleClose={this.handleClose}
          fruitName={this.state.fruitName}
          fruitPrice={this.state.fruitPrice}
          fruitImage={this.state.fruitImage}
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
