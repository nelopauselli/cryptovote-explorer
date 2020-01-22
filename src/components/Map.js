import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from '@material-ui/core';

class MapNode {
    constructor(args) {
        this.id = args.id;
        this.name = args.name;
        this.peers = args.peers;
        this.position = args.position;

        this.radius = args.radius || 4;
    }

    distanceTo(position) {
        let d = Math.sqrt(Math.pow(Math.abs(this.position.x - position.x), 2) + Math.pow(Math.abs(this.position.y - position.y), 2));
        return d;
    }

    render(context) {
        let x = this.position.x;
        let y = this.position.y;

        context.beginPath();
        context.arc(x, y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
    }

    renderPath(context, target) {
        context.strokeStyle = '#FFF';
        context.lineWidth = .2;

        let noise = (Math.random() - .5) * this.radius * .8;

        context.beginPath();
        context.moveTo(this.position.x + noise, this.position.y + noise);
        context.lineTo(target.position.x + noise, target.position.y + noise);
        context.stroke();
    }
}

class Map extends Component {

    constructor(props) {
        super(props);

        this.state = {
            screen: {
                width: window.innerWidth,
                height: window.innerHeight - 70,
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
        let nodes = [];

        let width = this.refs.canvas.width;
        let height = this.refs.canvas.height;

        for (let i = 0; i < 50; i++) {
            let id = `n-${i}`;
            let name = `cryptovote${i}`;

            let position;
            while (true) {
                let x = Math.random() * width;
                let y = Math.random() * height;

                let other = nodes.find(n => n.distanceTo({ x, y }) < 70);
                if (other === undefined) {
                    position = { x: x, y: y };
                    break;
                }
            }

            let node = new MapNode({
                id: id,
                url: `http://${name}/`,
                name: name,
                position: position,
                peers: []
            });

            nodes.push(node);
        }
        nodes.map(node => {
            let distances = nodes.map(n => ({ id: n.id, distance: n.distanceTo(node.position) }));
            let nears = distances.sort((a, b) => (a.distance > b.distance) ? 1 : (a.distance < b.distance) ? -1 : 0);
            node.peers = nears.slice(1, 5).map(n=>n.id);
        });

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