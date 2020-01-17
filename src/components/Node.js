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

        console.log('fetching from ', url, '...');

        fetch(url).then(res => {
            console.log('fetch complete');
            return res.json();
        }).then(result => {
            console.log(result);
            this.setState({
                error: null,
                isLoaded: true,
                url: node.url,
                name: node.name,
                lastBlockNumber: result.blockNumber
            })
        },
            (error) => {
                console.error(error);
                this.setState({
                    isLoaded: true,
                    error: error.message
                });
            }).catch(error => {
                console.error(error)
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
                <div>
                    <b>Last Block</b>: {this.state.lastBlockNumber}
                </div>
            )
        }
    }
}

export default Node;