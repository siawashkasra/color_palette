import { Component } from 'react';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers';
import { Route, Switch } from 'react-router-dom'
import { palette } from '@mui/system';

class App extends Component {

  findPalette(id) {
    return seedColors.find( palette => palette.id === id )
  }
  render(){
    return (
      <Switch>
        <Route exact path="/" render={ () => <h1>Salam</h1>} />
        <Route 
          exact path="/palette/:id" 
          render={ (routeProps) => 
          <Palette 
            palette={generatePalette(this.findPalette(routeProps.match.params.id))}
          />} 
        />
      </Switch>
      // <div>
      //   <Palette palette={generatePalette(seedColors[3])}/>
      // </div>
    )
  }
}
  
export default App;
