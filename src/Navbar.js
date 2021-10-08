import { Component } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css'


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            format: 'hex'
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(e) {
        this.setState({format: e.target.value})
        this.props.changeFormat(e.target.value)
    }
    render() {
        const {level, changeLevel} = this.props
        return(
            <header className="Navbar">
                <div className="logo">
                    <a href="#">reactcolorpicker</a>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider 
                            defaultValue={level}
                            min={100}
                            max={900}
                            step={100}
                            onAfterChange={changeLevel}
                    />
                    </div>
                </div>
                <div className="select-contaner">
                    <Select value={this.state.format} onChange={this.handleChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255, 0.3)</MenuItem>
                    </Select>
                </div>
            </header>
        )
    }
}


export default Navbar;