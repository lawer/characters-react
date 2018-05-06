import React, {Component} from 'react';
import {Link} from "react-router-dom";
import actions from "./store/actions";
import {connect} from "react-redux";

class CharacterList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCharactersIfNeeded();
  }

  render() {
    return (
      <div className="container">
        <h1>GoT Characters</h1>

        <Link to="/characters/add" className="add btn btn-primary">Add Character</Link>

        <CharacterTable characters={this.props.characters}/>

      </div>
    );
  }
}

CharacterList = connect(store => store, actions)(CharacterList);

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
        character => <CharacterRow character={character} key={character._id}/>
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

export default CharacterList;