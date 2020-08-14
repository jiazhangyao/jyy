import React, { Component } from 'react';

class titleInfo extends Component {
    render() {
        return (
            <div className='chartTitle'>
                <span style={{float: 'left', fontWeight: 'bold'}}>
                    <div className='squareInfo'></div>
                    {this.props.title}
                </span>
            </div>
        );
    }
}

export default titleInfo;
