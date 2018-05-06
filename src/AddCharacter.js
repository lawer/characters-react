import React, {Component} from 'react';
import axios from "axios/index";
import {URL_API} from "./store/constants";

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

    axios.post(`${URL_API}/characters/`, this.state)
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

export default AddCharacter;