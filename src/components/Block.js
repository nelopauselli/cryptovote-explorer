import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardActions, Box, Button } from '@material-ui/core';

class Block extends Component {
    constructor(props) {
        super(props);
        console.log("props: ", props);

        let urlEncoded = props.url;
        let hash = props.hash;

        this.state = {
            url: decodeURIComponent(urlEncoded),
            hash: hash,
            urlEncoded: urlEncoded,
            block: {
                hash: null,
                communities: [],
                members: [],
                questions: [],
                urns: [],
                fiscals: [],
                votes: [],
                previousHash: null
            }
        }
    }

    componentDidMount() {
        this.moveTo(this.state.hash);

    }

    moveTo(hash) {
        console.log("moving to ", hash);

        let url = this.state.url + '/api/chain/' + (hash ? hash : '');

        fetch(url, {
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(result => {
            this.setState({
                block: result
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
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h3" color="primary">
                        Block number: {this.state.block.blockNumber}
                    </Typography>
                    <Typography variant="h6" component="h4" color="primary">
                        Previous Hash: {this.state.block.previousHash}
                    </Typography>
                    <Typography color="secondary">
                        {this.state.block.communities.length} communities
                        {this.state.block.communities.map(c =>
                            <Box key={c.id} component="span" m={1}>
                                <Link to={`/community/${c.id}`}>
                                    <Button>
                                        {c.name}
                                    </Button>
                                </Link>
                            </Box>
                        )}
                    </Typography>
                    <Typography color="secondary">
                        {this.state.block.members.length} members
                    </Typography>
                    <Typography color="secondary">
                        {this.state.block.questions.length} questions
                    </Typography>
                    <Typography color="secondary">
                        {this.state.block.urns.length} urns
                        {this.state.block.urns.map(u =>
                            <Box key={u.id} component="span" m={1}>
                                <Link to={`/urn/${u.id}`}>
                                    <Button>
                                        {u.name}
                                    </Button>
                                </Link>
                            </Box>
                        )}
                    </Typography>
                    <Typography color="secondary">
                        {this.state.block.fiscals.length} fiscals
                    </Typography>
                    <Typography color="secondary">
                        {this.state.block.votes.length} votes
                    </Typography>

                    <Typography variant="h6" component="h4" color="primary">
                        Hash: {this.state.block.hash}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => this.moveTo(this.state.block.previousHash)}>
                        Previous
                    </Button>
                    <Button onClick={() => this.moveTo()}>
                        Last
                    </Button>
                </CardActions>
            </Card>
        )
    }
}

export default Block;