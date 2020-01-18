import React, { Component } from 'react';
import { Card, CardContent, Typography  } from '@material-ui/core';

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
                <Card>
                    <CardContent>
                        <Typography variant="h3" component="h1">
                            {this.state.name}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            #{this.state.lastBlockNumber}
                        </Typography>
                        <Typography color="textSecondary">
                            {this.state.lastBlockHash}
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
    }
}

export default Node;