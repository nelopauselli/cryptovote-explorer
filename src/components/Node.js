import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Breadcrumbs } from '@material-ui/core';

import { Grid, Card, CardHeader, CardContent, Typography } from '@material-ui/core';

import { Avatar, Box } from '@material-ui/core';
import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';

import CommunityIcon from '@material-ui/icons/Forum';
import MembersIcon from '@material-ui/icons/People';
import BlocksIcon from '@material-ui/icons/Apps';
import HashIcon from '@material-ui/icons/Memory';
import BranchIcon from '@material-ui/icons/Share';
import PeersIcon from '@material-ui/icons/AccountTree';

import Block from './Block';

class Node extends Component {
    constructor(props) {
        super(props);

        let urlEncoded = props.match.params.url;

        this.state = {
            url: decodeURIComponent(urlEncoded),
            urlEncoded: urlEncoded,
            name: '?',
            peers: [],
            blocks: []
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
                publicUrl: result.publicUrl,
                name: result.name,
                branches: result.branches,
                lastBlockNumber: result.lastBlockNumber,
                lastBlockHash: result.lastBlockHash
            })

            this.loadBlocks(result.lastBlockHash);
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

    loadBlocks(hash) {
        let node = this.state;
        let url = node.url + '/api/chain/' + hash;

        fetch(url, {
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(result => {
            var blocks = this.state.blocks;
            blocks.push(result);
            this.setState({
                blocks: blocks
            });

            if (blocks.length < 4 && result.blockNumber > 0) {
                this.loadBlocks(result.previousHash);
            }
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
        return (
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Network
                    </Link>
                    <Typography color="textPrimary">{this.state.name}</Typography>
                </Breadcrumbs>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe">
                                        N
                            </Avatar>
                                }
                                title={
                                    <Typography variant="h4" component="h2" color="primary">
                                        {this.state.name}
                                    </Typography>
                                }
                                subheader={this.state.publicUrl}

                            />
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <Grid container direction="row"
                                            justify="center"
                                            alignItems="center">
                                            <Grid item xs={4}>
                                                <PeersIcon />
                                            </Grid>
                                            <Grid item xs={8}>
                                                {this.state.peers.map(p =>
                                                    <Typography key={p.id} color="textSecondary">
                                                        {p.name}
                                                    </Typography>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Grid container direction="row"
                                            justify="center"
                                            alignItems="center">
                                            <Grid item xs={4}>
                                                <BlocksIcon />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography color="textSecondary">
                                                    {this.state.lastBlockNumber}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <Grid container direction="row"
                                            justify="center"
                                            alignItems="center">
                                            <Grid item xs={4}>
                                                <BranchIcon />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography color="textSecondary">
                                                    {this.state.branches}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container direction="row"
                                            justify="center"
                                            alignItems="center">
                                            <Grid item xs={4}>
                                                <HashIcon />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography color="textSecondary">
                                                    {this.state.lastBlockHash}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    {this.state.blocks.map(b =>
                        <Grid item key={b.hash} xs={6}>
                            <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe">
                                            B
                                        </Avatar>
                                    }
                                    title={
                                        <Typography variant="h4" component="h2" color="primary">
                                            Block #{b.blockNumber}
                                        </Typography>
                                    }
                                    subheader={b.hash}
                                />
                                <CardContent>
                                    <List>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <CommunityIcon />
                                            </ListItemAvatar>
                                            <ListItemText primary="Community" secondary={b.communities.map(c => c.name).join(', ')} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <MembersIcon />
                                            </ListItemAvatar>
                                            <ListItemText primary="Member" secondary={b.members.map(c => c.name).join(', ')} />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <HashIcon />
                                            </ListItemAvatar>
                                            <ListItemText primary="Previous block hash" secondary={b.previousHash} />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </div>

        )
    }
}

export default Node;