import { Component } from 'react';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom'
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      palettes: seedColors
    }

    this.savePalette = this.savePalette.bind(this)
  }

  savePalette(newPalette) {
    this.setState({palettes: [...this.state.palettes, newPalette]})
  }

  findPalette(id) {
    return this.state.palettes.find( palette => palette.id === id )
  }
  render(){
    return (
      <Switch>
        <Route 
          exact path="/palette/new" 
          render={(routeProps) => 
            <NewPaletteForm 
              savePalette={this.savePalette} 
              {...routeProps} palettes={this.state.palettes} />} />
        <Route 
          exact path="/" 
          render={ () => 
          <PaletteList palettes={this.state.palettes} />
           } />
        <Route 
          exact path="/palette/:id" 
          render={ (routeProps) => 
          <Palette 
            palette={generatePalette(this.findPalette(routeProps.match.params.id))}
          />} 
        />
        <Route
          exact path="/palette/:paletteId/:colorId"
          render={ (routeProps) => 
            <SingleColorPalette 
              palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
            />
          }
         />
      </Switch>
    )
  }
}
  
export default App;
