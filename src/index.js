import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//1. Create the Main Component that will Contain everything
//1a. Everything is Title, Grid, Generation count
//2. set up contructor and super() for props passing later
//3. In the Main state, initialize the generation variable that will be used later
//4. Create Grid component

class Box extends React.Component {
    //This selectBox belongs to Box Component, but will call the selectBox function
    //of the selectBox function from the Main Component
    selectBox = () => {
        this.props.selectBox(this.props.row, this.props.col)
    }

    render() {
        return(
            <div
                className = {this.props.boxClass}
                id = {this.props.id}
                onClick = {this.selectBox}    
            />
            //this.selectBox indicates the selectBox function in this Component.
        );
    }
}

class Grid extends React.Component {
    render() {
        const width = this.props.cols * 14;
        let rowsArr = []

        let boxClass = "";
        //For every coordinate of rows and cols
        //Create a box ID
        //use CSS for box on and box off
        //push a Box Component per coordinate
        //The Box component will have properties and selected function
        for (let i = 0; i < this.props.rows; i++) {
            for (let j = 0; j < this.props.rows; j++) {
                let boxId = i + "_" + j;

                boxClass = this.props.gridFull[i][j] ? "box on" : "box off"
                rowsArr.push(
                    <Box 
                        boxClass = {boxClass}
                        key = {boxId}
                        boxId = {boxId}
                        row = {i}
                        col = {j}
                        selectBox = {this.props.selectBox}
                    />
                );
            }
        }
        return(
            <div className="grid" style={{width: width}}>
                {rowsArr}
            </div>
        );
    }
}

class Main extends React.Component {
    constructor() {
        super();
        //speed, rows, cols not in state so it can be referenced inside the state
        this.speed = 100;
        this.rows = 30;
        this.cols = 50;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))

        }
    }

    selectBox = (row, col) => {
        let gridCopy = arrayClone(this.state.gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        this.setState({
            gridFull: gridCopy
        });
    }

    seed = () => {
        let gridCopy = arrayClone(this.state.gridFull);
        for (let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        this.setState({
            gridFull: gridCopy
        })
    }

    playButton = () => {
        clearInterval(this.intervalId)
        this.intervalId = setInterval(this.playButton, this.speed);
    }

    play = () => {
        let g = this.state.gridFull;
        let g2 = arrayClone(this.state.gridFull);
        
    }

    //Lifecycle Hook: componentDidMount(){}
    //Loads once component runs
    componentDidMount() {
        this.seed();
    }

    render() {
        return (
            <div>
                <h1>The Game of Life</h1>
                <Grid 
                    gridFull = {this.state.gridFull}
                    rows = {this.rows}
                    cols = {this.cols}
                    selectBox = {this.selectBox}
                />
                <h2>Generation: {this.state.generation} </h2>
            </div>
        );
    }
}

function arrayClone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));