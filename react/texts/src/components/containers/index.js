import React, { useState } from 'react';
import Headers from '../headers';
import Footers from '../footers';

import './style.scss'

function Container({ children, access }) {
    return (
        <div>
            <Headers />
            <main style={{ clear: 'both' }}>
                {React.Children.map(children, child => {
                    return React.cloneElement(child, {
                        params: () => {}
                    });
                })}
            </main>
            <p style={{ clear: 'both', height: '80px' }}></p>
            {!access && <Footers />}
        </div>
    );
}

export default Container;
