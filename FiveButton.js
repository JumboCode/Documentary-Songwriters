import React from 'react';

// for testing counter
class FiveButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <button className="recordButton" onClick={this.props.handleClick}>5</button>
        )
    }
    
}

export default FiveButton;