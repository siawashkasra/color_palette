import { Component } from "react";
import { Link } from 'react-router-dom'
import MiniPalette from "./MiniPalette";
import { withStyles } from '@mui/styles';
import PaletteListStyles from "./styles/PaletteListStyles";


class PaletteList extends Component {
    render() {
        const { palettes, classes } = this.props
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        { palettes.map( palette => <p><Link to={`/palette/${palette.id}`}><MiniPalette {...palette} /></Link></p>) }
                    </div>
                </div>
            </div>
        )
    }
}


export default withStyles(PaletteListStyles)(PaletteList);