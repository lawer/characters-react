import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import axios from 'axios';


var urlApi = "https://secure-cliffs-32652.herokuapp.com/api"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={CharacterList}/>
          <Route path="/characters/:id/" component={CharacterDetail}/>
        </Switch>
      </div>
    );
  }
}

class CharacterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: []
    };
  }

  componentDidMount() {
    axios.get(`${urlApi}/characters`)
      .then(res => {
        const characters = res.data.characters;
        this.setState({characters});
      })
  }

  render() {
    return (
      <div className="container">
        <h1>GoT Characters</h1>

        <Link to="/characters/add" className="add btn btn-primary">Add Character</Link>

        <table className="table table-striped">
          <thead className="thead-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Alive</th>
            <th>Culture</th>
            <th>House</th>
            <th>Actions</th>
          </tr>
          </thead>

          <tbody>
          {this.state.characters.map(
            character =>
              <tr>
                <td className="align-middle">
                  <Link to={"/characters/" + character._id}>
                    <img src={character.image} alt="" className="img-fluid"/>
                  </Link>
                </td>
                <td className="align-middle">
                  <Link to={"/characters/" + character._id}>
                    {character.name}
                  </Link>
                </td>
                <td className="align-middle text-center">
                  {character.alive}
                </td>
                <td className="align-middle">
                  {character.culture}
                </td>
                <td className="align-middle">
                  {character.house}
                </td>
                <td>
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

class CharacterDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {
        _id: props.match.params.id
      }
    };
  }

  componentDidMount() {
    axios.get(`${urlApi}/characters/${this.state.character._id}`)
      .then(res => {
        const character = res.data[0];
        this.setState({character});
      })
  }

  render() {
    return (
      <div className="container">
        <h1>{this.state.character.name}</h1>

        <img src={this.state.character.image} alt=""/>

        <ul>
          <li>Alive: {this.state.character.alive}</li>
          <li>Culture: {this.state.character.culture}</li>
          <li>House: {this.state.character.house}</li>
        </ul>
      </div>
    );
  }
}

export default App;
