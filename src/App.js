import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import people from './people';
import city from './city';
import food from './food';
import nature from './nature'

class C extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: 10,
        };
    }

    render() {
        return (
            <svg 
                id = "sunFrame"
                width={parseInt(this.props.r)*2+10}
                height={parseInt(this.props.r)*2+10}
            >
                <defs>
                    <radialGradient id="sunGradient">
                        <stop offset="100%"/>
                    </radialGradient>
                </defs>
                <path
                    id="sun" 
                    d={this.arc(parseInt(this.props.r)+5, parseInt(this.props.r)+5, parseInt(this.props.r), 45, 315)} 
                    stroke="black" 
                    strokeWidth={this.state.weight} 
                    fill="none"
                />
            </svg>
        );
    }

    polarToCart(cx, cy, r, degrees) {
        let radians = (degrees*Math.PI)/180;

        return {
            x: cx + (r*Math.cos(radians)),
            y: cy + (r*Math.sin(radians))
        };
    }

    arc(x, y, r, startAngle, endAngle) {
        let start = this.polarToCart(x, y, r, startAngle);
        let end = this.polarToCart(x, y, r, endAngle);

        let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        let d = [
            "M", start.x, start.y,
            "A", r, r, 0, largeArcFlag, 1, end.x, end.y
        ].join(" ");

        return d;
    }
}
function Sky(props) {
    const s = props.size;
    return (
        <svg 
            id="skyFrame"
            width={s}
            height={s}
        >
            <defs>
                <radialGradient id="skyGradient">
                    <stop id="sky1" offset="50%"/>
                    <stop id="sky2" offset="100%"/>
                </radialGradient>
            </defs>
            <rect 
                id="sky"
                width={s}
                height={s}
                fill="none"
                stroke="black"
            />
        </svg>
    );
}
function Acadia(props) {
    const s = parseInt(props.size);
    return (
        <svg 
            id="acadiaFrame"
            width={s}
            height={s}
        >
            <defs>
                <linearGradient id="acadiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop id="acadia1" offset="10%"></stop>
                    <stop id="acadia2" offset="90%"></stop>
                </linearGradient>
            </defs>
            <path 
                className="mountain"
                d={"M0 0 L0 "+s+" L"+s/3+" "+s+" Z"}
            />
            <path
                className="mountain"
                d={"M"+s/3+" "+s+" L"+s/2+" "+2*s/3+" L"+2*s/3+" "+s+" Z"}
            />
            <path
                className="mountain"
                d={"M"+2*s/3+" "+s+" L"+s+" 0 L"+s+" "+s+" Z"}
            />
        </svg>
    );
}
function W(props) {
    const s = parseInt(props.size);
    return (
        <svg 
            id="wFrame"
            width={s}
            height={s}
        >
            <path
                id="w"
                d={"M 0 0 L"+s/3+" "+s+" L"+s/2+" "+2*s/3+" L"+2*s/3+" "+s+" L"+s+" 0"}
            />
        </svg>
    );
}
function Frame(props) {
    return (
        <svg id="frameFrame"
            width={props.size}
            height={props.size} 
            onClick={props.onClick}
        >
            <rect id="frame"
                width={props.size}
                height={props.size}
            />
        </svg>
    );
}
function FirstName(props) {
    return(
        <svg 
            id="firstNameFrame"
            height={props.size}
            width={props.size}
        >
            <text 
                id="firstName"
                y={props.size}
                x="5px"
            >
                h r i s t i n e
            </text>
        </svg>
    );
}
function LastName(props) {
    return(
        <svg 
            id="lastNameFrame"
            height={props.size}
        >
            <text 
                id="lastName"
                x="0px"
                y={parseInt(props.size)-10}
            >
                u
            </text>
        </svg>
    );
}

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        
        this.state = {
            index: 0,
            arr: people
        };
    }

    render() {
        return(
            <div id="gallery">
                <div id="navigation">
                    <div class="tab" id="people" onClick={() => this.newDir(people)}>People<hr /></div>
                    <div class="tab" id="nature" onClick={() => this.newDir(nature)}>Nature<hr /></div>
                    <div class="tab" id="city" onClick={() => this.newDir(city)}>City<hr /></div>
                    <div class="tab" id="food" onClick={() => this.newDir(food)}>Food<hr /></div>
                </div>
                <div class="galleryContainer">
                    <img id="main" src={this.state.arr[this.state.index]} class="visible" />
                    <a class="previous" onClick={this.previous}>&#10094;</a>
                    <a class="next" onClick={this.next}>&#10095;</a>
                </div>
            </div>
        );
    }
    next() {
        let former = this.state.index;
        let latter = this.state.index + 1;
        if(latter >= this.state.arr.length) {
            latter = 0;
        }
        setTimeout(() => {
            this.setState({
                index : latter,
                arr : this.state.arr
            });
        }, 250);
        
    }
    previous() {
        let former = this.state.index;
        let latter = former - 1;
        if(latter < 0) {
            latter = this.state.arr.length - 1;
        }

        this.setState({
            index : latter,
            arr : this.state.arr
        });
        
    }
    newDir(file) {
        this.setState({
            index : this.state.index,
            arr : file
        });
    }

    
}

class Gieppetto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 100
        };
    }

    render() {
        const size = this.state.size;
        this.handleClick();
        return(
            <div id="master">
                {this.renderSky(size)}
                {this.renderSun(parseInt(size)-10)}
                {this.renderFirstName(size)}
                {this.renderMountains(size)}
                {this.renderLetterW(size)}
                {this.renderFrame(size)}
                {this.renderLastName(size)}
                <h1 id="title">Photography</h1>
            </div>
        );
    }

    renderSky(s) {
        return (
            <Sky size={s} />
        );
    }
    renderSun(s) {
        return (
            <C r={parseInt(s)/2} />
        );
    }
    renderMountains(s) {
        return (
            <Acadia size={s} />
        );
    }
    renderLetterW(s) {
        return (
            <W size={s} />
        );
    }
    renderFrame(s) {
        return (
            <Frame size={s} onClick={() => this.handleClick()} />
        );
    }
    renderFirstName(s) {
        return (
            <FirstName size={s} />
        );
    }
    renderLastName(s) {
        return (
            <LastName size={s} />
        );
    }

    resize(s) {
        this.setState({
            size : s
        });
    }

    handleClick() {
        let gallery = <Gallery />;
        let cont = document.querySelector("#content");
        ReactDOM.render(gallery, cont);
    }
}

export default Gieppetto;