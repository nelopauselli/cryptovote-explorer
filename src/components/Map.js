import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from '@material-ui/core';

class MapNode {
    constructor(args) {
        this.id = args.id;
        this.name = args.name;
        this.peers = args.peers;
        this.position = args.position;

        this.hexagonAngle = 0.523598776; // 30 degrees in radians
        this.sideLength = 80;

        this.hexHeight = Math.sin(this.hexagonAngle) * this.sideLength;
        this.hexRadius = Math.cos(this.hexagonAngle) * this.sideLength;
        this.hexRectangleHeight = this.sideLength + 2 * this.hexHeight;
        this.hexRectangleWidth = 2 * this.hexRadius;

    }

    render(context) {
        let x = this.position.x;
        let y = this.position.y;

        context.beginPath();
        context.moveTo(x + this.hexRadius, y);
        context.lineTo(x + this.hexRectangleWidth, y + this.hexHeight);
        context.lineTo(x + this.hexRectangleWidth, y + this.hexHeight + this.sideLength);
        context.lineTo(x + this.hexRadius, y + this.hexRectangleHeight);
        context.lineTo(x, y + this.sideLength + this.hexHeight);
        context.lineTo(x, y + this.hexHeight);
        context.closePath();

        context.fillStyle = "green";
        context.fill();

        context.fillStyle = "white";
        context.font = "20px Georgia";
        let textWidth = context.measureText(this.name).width;
        context.fillText(this.name, this.position.x + (this.hexRadius * 2 - textWidth) / 2, this.position.y + this.hexRadius + 10);
    }

    renderPath(context, target) {
        context.strokeStyle = '#FFF';
        context.lineWidth = 2;

        let noise = (Math.random()-.5) * this.hexRadius * .8;

        context.beginPath();
        context.moveTo(this.position.x + this.hexRadius + noise, this.position.y + this.hexRadius+noise);
        context.lineTo(target.position.x + this.hexRadius+noise, target.position.y + this.hexRadius+noise);
        context.stroke();
    }
}

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screen: {
                width: window.innerWidth,
                height: window.innerHeight-70,
                ratio: window.devicePixelRatio || 1,
            },
            context: null,
        }
    }

    componentDidMount() {
        const context = this.refs.canvas.getContext('2d');
        this.setState({
            context: context
        });
        this.draw(context);
    }

    draw(context) {
        let nodes = [
            new MapNode({
                id: 'n1',
                url: 'http://cryptovote1/',
                name: 'cryptovote1',
                peers: ['n2', 'n3'],
                position: {
                    x: Math.random() * this.state.screen.width,
                    y: Math.random() * this.state.screen.height
                }
            }),
            new MapNode({
                id: 'n2',
                url: 'http://cryptovote2/',
                name: 'cryptovote2',
                peers: ['n3'],
                position: {
                    x: Math.random() * this.state.screen.width,
                    y: Math.random() * this.state.screen.height
                }
            }),
            new MapNode({
                id: 'n3',
                url: 'http://cryptovote3/',
                name: 'cryptovote3',
                peers: ['n1'],
                position: {
                    x: Math.random() * this.state.screen.width,
                    y: Math.random() * this.state.screen.height
                }
            }),
        ];

        context.save();

        nodes.map(node => {
            node.peers.map(peer => {
                var target = nodes.find(n => n.id == peer);
                node.renderPath(context, target);
            })
        });

        nodes.map(node => {
            node.render(context);
        });

        context.restore();
    }

    render() {
        return (
            <div>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/">
                        Network
                    </Link>
                    <Typography color="textPrimary">Map</Typography>
                </Breadcrumbs>
                <canvas ref="canvas"
                    width={this.state.screen.width * this.state.screen.ratio}
                    height={this.state.screen.height * this.state.screen.ratio}
                />
            </div>
        );
    }
}

export default Map;