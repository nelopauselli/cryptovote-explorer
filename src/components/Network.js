import React, { Component } from 'react';
import { Grid, Breadcrumbs, Typography } from '@material-ui/core';

import NetworkItem from './NetworkItem'

class Network extends Component {
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
                { name: 'localhost', url: 'http://localhost:5000' },
            ]
        };
    }

    render() {
        return (
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">Network</Typography>
                </Breadcrumbs>
                <Grid container justify="center" spacing={2}>
                    {
                        this.state.nodes.map(node => (
                            <Grid item key={node.name} xs={5}>
                                <NetworkItem node={node} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>

        )
    }
}

export default Network;