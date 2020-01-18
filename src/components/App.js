import React, { Component } from 'react';
import { Container,  Grid, Typography } from '@material-ui/core';

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
            <Container fixed>
            <Typography component="div" style={{ backgroundColor: '#050', height: '100vh' }}>
                <Grid container justify="center" spacing={2}>
                    {
                        this.state.nodes.map(node => (
                            <Grid item key={node.name} xs={5}>
                                <Node node={node} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Typography>
            </Container>
        )
    }
}

export default App;