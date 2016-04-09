import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './Demo';
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
ReactDOM.render(<Demo />, document.querySelector('#content'));
