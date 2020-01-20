import React, { Component } from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, Box, Button } from '@material-ui/core';
import { Avatar, IconButton } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import BlocksIcon from '@material-ui/icons/Apps';
import HashIcon from '@material-ui/icons/Memory';
import BranchIcon from '@material-ui/icons/Share';
import PeersIcon from '@material-ui/icons/AccountTree';

import { Link } from "react-router-dom";

class NetworkItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            url: props.node.url,
            urlEncoded: encodeURIComponent(props.node.url),
            name: props.node.name,
            lastBlockNumber: '?',
            lastBlockHash: '?',
            peers: [],
            branches: '?'
        };
    }

    componentDidMount() {
        this.loadNodeInfo();
        this.loadPeersInfo();
    }

    loadNodeInfo() {
        let node = this.state;
        let url = node.url + '/api/node';

        fetch(url, {
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(result => {
            this.setState({
                error: null,
                isLoaded: true,
                url: result.publicUrl,
                name: result.name,
                branches: result.branches,
                lastBlockNumber: result.lastBlockNumber,
                lastBlockHash: result.lastBlockHash
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

    loadPeersInfo() {
        let node = this.state;
        let url = node.url + '/api/peer';

        fetch(url, {
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(result => {
            this.setState({
                peers: result
            })
        },
            (error) => {
                this.setState({
                    error: error.message
                });
            }).catch(error => {
                this.setState({
                    error: error
                });
            });
    }

    render() {
        if (this.state.error) {
            return (
                <Card>
                    <CardContent>
                        <Typography variant="h4" component="h2" color="primary">
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
                        <Typography variant="h4" component="h2" color="primary">
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
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                N
                            </Avatar>
                        }
                        action={
                            <Link to={`/node/${this.state.urlEncoded}`}>
                                <IconButton aria-label="settings">
                                    <SearchIcon />
                                </IconButton>
                            </Link>
                        }
                        title={
                            <Typography variant="h4" component="h2" color="primary">
                                {this.state.name}
                            </Typography>
                        }
                        subheader={this.state.url}

                    />
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <PeersIcon />
                                </ListItemAvatar>
                                {this.state.peers.map(p =>
                                    <ListItemText key={p.id} primary="Peer" secondary={p.name} />
                                )}
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <BlocksIcon />
                                </ListItemAvatar>
                                <ListItemText primary="Las block Number" secondary={this.state.lastBlockNumber} />
                                <ListItemAvatar>
                                    <BranchIcon />
                                </ListItemAvatar>
                                <ListItemText primary="Branches" secondary={this.state.branches} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <HashIcon />
                                </ListItemAvatar>
                                <ListItemText primary="Last block hash" secondary={this.state.lastBlockHash} />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            )
        }
    }
}

export default NetworkItem;