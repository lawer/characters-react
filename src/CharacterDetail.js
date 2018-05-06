import React, {Component} from 'react';
import axios from "axios/index";
import {URL_API} from "./store/constants";

class CharacterDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: {}
    };
  }

  componentDidMount() {
    axios.get(`${URL_API}/characters/${this.props.match.params.id}`)
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

export default CharacterDetail;