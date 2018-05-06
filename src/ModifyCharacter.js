import React, {Component} from 'react';
import axios from "axios/index";
import {URL_API} from "./store/constants";
import actions from "./store/actions";
import {connect} from "react-redux";

class ModifyCharacter extends Component {
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

    this.props.modifyCharacter(this.state)
      .then(this.props.history.push("/"));

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

ModifyCharacter = connect(store => store, actions)(ModifyCharacter);

export default ModifyCharacter;