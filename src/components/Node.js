import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from '@material-ui/core';

import Block from './Block';

class Node extends Component {
    constructor(props) {
        super(props);

        let urlEncoded = props.match.params.url;

        this.state = {
            url: decodeURIComponent(urlEncoded),
            urlEncoded: urlEncoded,
            name: '?'
        };
    }

    componentDidMount() {
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

    render() {
        return (
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Network
                    </Link>
                    <Typography color="textPrimary">{this.state.name}</Typography>
                </Breadcrumbs>
                <Block url={this.state.urlEncoded} hash={false}></Block>
            </div>

        )
    }
}

export default Node;