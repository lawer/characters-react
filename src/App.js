import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import axios from 'axios';
import {Form, Text} from "react-form";


const urlApi = "http://localhost:3000/api";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={CharacterList}/>
          <Route exact path="/characters/add/" component={AddCharacter}/>
          <Route exact path="/characters/:id/" component={CharacterDetail}/>
          <Route exact path="/characters/:id/delete" component={DeleteCharacter}/>
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

        <CharacterTable characters={this.state.characters}/>

      </div>
    );
  }
}

function CharacterTable(props) {
  return (
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
      {props.characters.map(
        character => <CharacterRow character={character}/>
      )}
      </tbody>
    </table>
  );
}

function CharacterRow({character}) {
  return (
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
        <Link to={"/characters/" + character._id + "/delete"} className="btn btn-danger">Delete</Link>
        <Link to={"/characters/" + character._id + "/modify"} className="btn btn-warning">Modify</Link>
      </td>
    </tr>
  )
}

class CharacterDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {}
    };
  }

  componentDidMount() {
    axios.get(`${urlApi}/characters/${this.props.match.params.id}`)
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

class AddCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {}
    };
  }

  addCharacter(character) {
    this.setState({character});

    axios.post(`${urlApi}/characters`, character)
      .then(res => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Add Character</h1>

        <Form onSubmit={character => this.addCharacter(character)}>
          {formApi => (
            <form onSubmit={formApi.submitForm} id="form1" className="mb-4">
              <label htmlFor="name">Name</label>
              <Text field="name" id="name"/>
              <br/>

              <label htmlFor="image">Image</label>
              <Text field="image" id="image"/>
              <br/>

              <label htmlFor="alive">Alive</label>
              <Text field="alive" id="alive"/>
              <br/>

              <label htmlFor="culture">Culture</label>
              <Text field="culture" id="culture"/>
              <br/>

              <label htmlFor="house">House</label>
              <Text field="house" id="house"/>
              <br/>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

class DeleteCharacter extends Component {

  componentDidMount() {
    axios.delete(`${urlApi}/characters/${this.props.match.params.id}`)
      .then(res => {
        console.log(res);
        this.props.history.push("/")
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="container">
      </div>
    );
  }
}

export default App;
