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
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';

import Network from './Network';
import Node from './Node';

const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: purple,
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
            <Container>
                <Router>
                    <Switch>
                        <Route path="/node/:url" component={Node}>
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

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
