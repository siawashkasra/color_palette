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

  findPalette(id) {
    return seedColors.find( palette => palette.id === id )
  }
  render(){
    return (
      <Switch>
        <Route 
          exact path="/palette/new" 
          render={() => <NewPaletteForm />} />
        <Route 
          exact path="/" 
          render={ () => 
          <PaletteList palettes={seedColors} />
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
