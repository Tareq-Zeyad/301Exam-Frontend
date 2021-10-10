import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { withAuth0 } from "@auth0/auth0-react";



class Fruititem extends React.Component {

    addToFavorites = () => {
        const obj = {
            name: this.props.item.name,
            photo: this.props.item.image,
            price: this.props.item.price,
            email: this.props.auth0.user.email
        }
        this.props.addToFavoritesCollection(obj);
    };


    render() {
        return (
            <>
                <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={this.props.item.image} />
                    <Card.Body>
                        <Card.Title>{this.props.item.name}</Card.Title>
                        <Card.Text>Price: {this.props.item.price}</Card.Text>
                        <Button variant="primary" onClick={this.addToFavorites}>Add To Favorites</Button>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default withAuth0(Fruititem);