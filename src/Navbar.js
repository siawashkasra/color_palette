import { Component } from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css'


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            format: 'hex',
            open: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.closeSnackBar = this.closeSnackBar.bind(this)
    }
    
    handleChange(e) {
        this.setState({format: e.target.value})
        this.props.changeFormat(e.target.value)
        this.setState({open: true})
    }
    
    closeSnackBar() {
        this.setState({open: false})
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
                <div className="select-container">
                    <Select value={this.state.format} onChange={this.handleChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255, 0.3)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{vertical: 'btoom', horizontal:"left"}}
                    open={this.state.open}
                    autoHideDuration={3000}
                    message={<span id='message-id'>Format changed!</span>}
                    action={[
                        <IconButton 
                        onClick={this.closeSnackBar}
                        color="inherit"
                        key="close"
                        aria-label="close"
                        onClose={this.closeSnackBar}
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                />
            </header>
        )
    }
}


export default Navbar;