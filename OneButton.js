import React from 'react';

// for testing counter
class OneButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <button className="recordButton" onClick={this.props.handleClick}>1</button>
        )
    }
    
}

export default OneButton;