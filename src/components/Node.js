import React, { Component } from 'react';
import { Card, CardContent, Typography, Box, Paper } from '@material-ui/core';
import Block from './Block'

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            url: props.node.url,
            name: props.node.name,
            lastBlockNumber: '?',
            blocks:[]
        };
    }

    componentDidMount() {
        let node = this.state;
        let url = node.url + '/api/chain';

        fetch(url, {
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(result => {
            let blocks = [];
            for (let b = 0; b <= result.blockNumber;b++)
                blocks.push(b);

            this.setState({
                error: null,
                isLoaded: true,
                url: node.url,
                name: node.name,
                lastBlockNumber: result.blockNumber,
                lastBlockHash: result.hash,
                blocks: blocks
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
                <Card>
                    <CardContent>
                        <Typography variant="h3" component="h1" color="primary">
                            {this.state.name}
                        </Typography>
                        <Typography color="error">
                            {this.state.error}
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
        else if (!this.state.isLoaded) {
            return (
                <Card>
                    <CardContent>
                        <Typography variant="h3" component="h1" color="primary">
                            {this.state.name}
                        </Typography>
                        <Typography>
                            Connecting...
                        </Typography>
                    </CardContent>
                </Card>
            )
        }
        else {
            return (
                <Card>
                    <CardContent>
                        <Typography variant="h3" component="h1" color="primary">
                            {this.state.name}
                        </Typography>
                        <Typography variant="h5" component="h2" color="secondary">
                            {this.state.blocks.map(b =>
                                <Box key={b} component="span" m={1}>[ {b} ]</Box>
                            )}
                        </Typography>
                        <Block url={this.state.url} hash={this.state.lastBlockHash} />
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