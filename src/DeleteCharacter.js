import React, {Component} from 'react';
import axios from "axios/index";
import {URL_API} from "./store/constants";
import actions from "./store/actions";
import {connect} from "react-redux";

class DeleteCharacter extends Component {
  componentDidMount() {
    this.props.deleteCharacter(this.props.match.params.id);
    this.props.history.push("/")
  }

  render() {
    return (
      <div className="container">
      </div>
    );
  }
}
DeleteCharacter = connect(store => store, actions)(DeleteCharacter);

export default DeleteCharacter;