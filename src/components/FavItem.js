import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';

class FavItem extends React.Component {

  deleteThis = () => {
    const obj = {
      name: this.props.item.name,
      photo: this.props.item.image,
      price: this.props.item.price,
      email: this.props.auth0.user.email,
      id: this.props.item._id,
    };

    this.props.deleteItem(obj);
  };



  render() {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.item.photo} />
        <Card.Body>
          <Card.Title>{this.props.item.name}</Card.Title>
          <Card.Text>Price: {this.props.item.price}</Card.Text>
          <Button variant="primary" onClick={()=>this.props.showUpdateForm(this.props.item)}>
            Update
          </Button>
          <Button variant="danger" onClick={this.deleteThis}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    )
  }
}

export default withAuth0(FavItem);