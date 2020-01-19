import React, { Component } from 'react';
import { Container, Grid, CssBaseline } from '@material-ui/core';
import { AppBar, Toolbar, IconButton, MenuIcon, Typography, Box } from '@material-ui/core';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: purple,
        secondary: green,
    },
    status: {
        danger: 'orange',
    },
    overrides: {
        MuiContainer: {
            root: {
                margin: "20px",
            }
        },
        MuiCard: {
            block: {
                "background-color": "red"
            }
        }
    },
});

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
                { name: 'cryptovote4', url: 'http://192.168.0.128:8084' },
            ]
        };
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container bgcolor="primary" >
                    <Grid container justify="center" spacing={2}>
                        {
                            this.state.nodes.map(node => (
                                <Grid item key={node.name} xs={5}>
                                    <Node node={node} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        )
    }
}

export default App;