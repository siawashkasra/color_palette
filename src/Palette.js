import { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import Navbar from "./Navbar";


class Palette extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level: 500,
            format: 'hex'
        }
        this.changeLevel = this.changeLevel.bind(this)
        this.changeFormat = this.changeFormat.bind(this)
    }

    changeLevel(level) {
        this.setState({level})
    }

    changeFormat(format) {
        console.log(format)
        this.setState({format})
    }

    render(){
        const { colors, paletteName, emoji, id } = this.props.palette;
        const level = this.state.level;
        const format = this.state.format
        
        const colorBoxes = colors[level].map(color => {
            return <ColorBox
                             background={color[format]} 
                             name={color.name} 
                             key={color.id}
                             moreUrl={`/palette/${id}/${color.id}`}
                    />
        });
        return(
            <div className="Palette">
                <Navbar 
                    level={level}
                    changeLevel ={this.changeLevel}
                    changeFormat = {this.changeFormat}
                />
                {/* Navbar goes here */}
                <div className="Palette-colors">
                { colorBoxes }
                </div>
                <footer className="Palette-footer">
                    { paletteName }
                    <span className="emoji">{ emoji }</span>
                </footer>
            </div>
        )
    }
}


export default Palette