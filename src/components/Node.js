import React, { Component } from 'react';
import { Link, useParams } from "react-router-dom";
import { Grid, Breadcrumbs, Typography } from '@material-ui/core';



class Node extends Component {
    constructor(props) {
        super(props);

        console.log("building Node");
        let url = decodeURIComponent(props.url);
        console.log("url: ", url);

        this.state = {
            url: url,
            name: '?',
            blocks: []
        };
    }

    componentDidMount() {
        this.loadNodeInfo();
        this.loadNodeLastBlock();
    }

    loadNodeInfo() {
        let url = this.state.url + '/api/node';

        fetch(url, {
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(result => {
            let blocks = [];
            for (let b = 0; b <= result.blockNumber; b++)
                blocks.push(b);

            this.setState({
                name: result.name
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

    loadNodeLastBlock() {
        let url = this.state.url + '/api/chain';

        fetch(url, {
            mode: 'cors',
        }).then(res => {
            return res.json();
        }).then(result => {
            let blocks = [];
            for (let b = 0; b <= result.blockNumber; b++)
                blocks.push(b);

            this.setState({
                hash: result.hash,
                blocks: blocks
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
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Network
                    </Link>
                    <Typography color="textPrimary">{this.state.name}</Typography>
                </Breadcrumbs>
                <Grid container justify="center" spacing={2}>
                    {
                        this.state.blocks.map(b => (
                            <Grid item key={b} xs={1}>
                                [ {b} ]
                            </Grid>
                        ))
                    }
                </Grid>
            </div>

        )
    }
}

export default Node;