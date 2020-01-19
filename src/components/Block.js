import React, { Component } from 'react';
import { Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';

class Block extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: props.url,
            hash: props.hash,
        };
    }

    componentDidMount() {
        let block = this.state;
        let url = block.url + '/api/chain/' + block.hash;

        fetch(url, {
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(result => {
            this.setState({
                blockNumber: result.blockNumber,
                communities: result.communities.length,
                members: result.members.length,
                questions: result.questions.length,
                urns: result.urns.length,
                fiscals: result.fiscals.length,
                votes: result.votes.length
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
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h3" color="primary">
                        Block number: {this.state.blockNumber}
                    </Typography>
                    <Typography color="secondary">
                        Communities: {this.state.communities}
                    </Typography>
                    <Typography color="secondary">
                        Members: {this.state.members}
                    </Typography>
                    <Typography color="secondary">
                        Questions: {this.state.questions}
                    </Typography>
                    <Typography color="secondary">
                        Urns: {this.state.urns}
                    </Typography>
                    <Typography color="secondary">
                        Fiscals: {this.state.fiscals}
                    </Typography>
                    <Typography color="secondary">
                        Votes: {this.state.votes}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Previous</Button>
                    <Button size="small">Next</Button>
                </CardActions>
            </Card>
        )
    }
}

export default Block;