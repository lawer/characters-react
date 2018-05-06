import React from 'react';
import {Link, Route, Switch} from "react-router-dom";

import CharacterList from "./CharacterList";
import CharacterDetail from "./CharacterDetail";
import AddCharacter from "./AddCharacter";
import DeleteCharacter from "./DeleteCharacter";
import ModifyCharacter from "./ModifyCharacter";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <NavBar/>

      <Switch>
        <Route exact path="/" component={CharacterList}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/characters/add/" component={AddCharacter}/>
        <Route exact path="/characters/:id/" component={CharacterDetail}/>
        <Route exact path="/characters/:id/delete" component={DeleteCharacter}/>
        <Route exact path="/characters/:id/modify" component={ModifyCharacter}/>
      </Switch>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
      <Link to="/" className="navbar-brand">Characters</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
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
  )
}

export default App;