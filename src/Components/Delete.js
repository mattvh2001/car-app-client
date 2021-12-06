import React, { Component } from 'react';

class Delete extends Component {
    render() {
        return (
            <div>
                <form>
                <label for="carID">Enter the car id:</label>
                    <input type="text" id="carID" value="Walker"/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default Delete;