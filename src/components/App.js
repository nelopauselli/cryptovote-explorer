import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import { Container, CssBaseline } from '@material-ui/core';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

import Network from './Network';
import Node from './Node';

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

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container bgcolor="primary" >
                <Router>
                        <Switch>
                            <Route path="/node/:url">
                                <NodeX />
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                            <Route path="/users">
                                <Users />
                            </Route>
                            <Route path="/">
                                <Network />
                            </Route>
                        </Switch>
                </Router>
            </Container>
        </ThemeProvider>
    );
}

function NodeX() {
    let { url } = useParams();
    console.log("url: ", url);
    return (
        <Node url={url}></Node>
    );
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
