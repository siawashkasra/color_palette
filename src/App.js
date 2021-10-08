import { Component } from 'react';
import './App.css';
import Palette from './Palette';
import seedColors from './seedColors'
import { generatePalette } from './colorHelpers';


class App extends Component {
  render(){
    return (
      <div>
        <Palette palette={generatePalette(seedColors[3])}/>
      </div>
    )
  }
}
  
export default App;
