import React, { Component } from 'react';
import Node from './Node'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            nodes: [
                //{ name: 'localhost', url: 'http://localhost:5000', lastBlockNumber: '?' },
                { name: 'cryptovote1', url: 'http://192.168.0.128:8081' },
                { name: 'cryptovote2', url: 'http://192.168.0.128:8082' },
                { name: 'cryptovote3', url: 'http://192.168.0.128:8083' },
            ]
        };
    }

    render() {
        return (
            <div>
                {this.state.nodes.map(node => (
                    <div key={node.name}>
                        <h1>{node.name}</h1>
                        <Node node={node} />
                    </div>
                ))}
            </div >
        )
    }
}

export default App;