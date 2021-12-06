import React, { Component } from 'react';

class Post extends Component {

    


 postCar(url = ``, data ) {
 // Default options are marked with *
    return fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match"Content-Type" header
    })
    .then(response => response.json());
}
    render() {
        return (
            <div>
                <form >
                    <label for="make">Make:</label>
                    <input type="text" id="make" value="Mike"/>
                    <label for="model">Model:</label>
                    <input type="text" id="model" value="Walker"/>
                    <label for="seats">seats:</label>
                    <input type="text" id="seats" value="Walker"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default Post;