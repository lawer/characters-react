import React, {Component} from 'react';
import {Link, Route, Switch} from "react-router-dom";
import axios from 'axios';

const urlApi = "http://localhost:3000/api";

class App extends Component {
  render() {
    return (
      <div className="App">

        <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
          <Link to="/" className="navbar-brand">Characters</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Switch>
          <Route exact path="/" component={CharacterList}/>
          <Route exact path="/register" component={Login}/>
          <Route exact path="/login" component={Register}/>
          <Route exact path="/characters/add/" component={AddCharacter}/>
          <Route exact path="/characters/:id/" component={CharacterDetail}/>
          <Route exact path="/characters/:id/delete" component={DeleteCharacter}/>
          <Route exact path="/characters/:id/modify" component={ModifyCharacter}/>
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

  updateInputValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitForm(event) {
    event.preventDefault();

    axios.post(`${urlApi}/characters/`, this.state)
      .then(res => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Modify Character</h1>

        <form onSubmit={character => this.submitForm(character)}>
          <label htmlFor="name">Name</label>
          <input name="name"
                 id="name"
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <label htmlFor="image">Image</label>
          <input name="image"
                 id="image"
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <label htmlFor="alive">Alive</label>
          <input name="alive"
                 id="alive"
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <label htmlFor="culture">Culture</label>
          <input name="culture"
                 id="culture"
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <label htmlFor="house">House</label>
          <input name="house"
                 id="house"
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
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

class ModifyCharacter extends Component {
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
        this.setState(character);
      })
  }

  updateInputValue(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitForm(event) {
    event.preventDefault();

    axios.post(`${urlApi}/characters/${this.state._id}`, this.state)
      .then(res => {
        this.props.history.push("/")
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Modify Character</h1>

        <form onSubmit={character => this.submitForm(character)}>
          <label htmlFor="name">Name</label>
          <input name="name"
                 id="name"
                 value={this.state.name}
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <label htmlFor="image">Image</label>
          <input name="image"
                 id="image"
                 value={this.state.image}
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <label htmlFor="alive">Alive</label>
          <input name="alive"
                 id="alive"
                 value={this.state.alive}
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <label htmlFor="culture">Culture</label>
          <input name="culture"
                 id="culture"
                 value={this.state.culture}
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <label htmlFor="house">House</label>
          <input name="house"
                 id="house"
                 value={this.state.house}
                 onChange={data => this.updateInputValue(data)}
          />
          <br/>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

class Register extends Component{
  render(){
    return
  };
}

class Login extends Component{
  render(){
    return
  };
}

export default App;
