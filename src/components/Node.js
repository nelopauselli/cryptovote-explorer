import React, { Component } from 'react';

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            url: props.node.url,
            name: props.node.name,
            lastBlockNumber: '?'
        };
    }

    componentDidMount() {
        let node = this.state;
        let url = node.url + '/api/chain';

        fetch(url,{
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(result => {
            this.setState({
                error: null,
                isLoaded: true,
                url: node.url,
                name: node.name,
                lastBlockNumber: result.blockNumber,
                lastBlockHash: result.hash
            })
        },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error.message
                });
            }).catch(error => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            });

    }

    render() {
        if (this.state.error) {
            return (
                <div className='error'> {this.state.error} </div>
            )
        }
        else if (!this.state.isLoaded) {
            return (
                <div>Connecting...</div>
            )
        }
        else {
            return (
                <dl>
                    <dt>Chain Length</dt>
                    <dd>{this.state.lastBlockNumber}</dd>
                    <dt>Last Block Hash</dt>
                    <dd>{this.state.lastBlockHash}</dd>
                </dl>
            )
        }
    }
}

export default Node;