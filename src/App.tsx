import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAuth from "./component/context/useAuth";
import { FirebaseContext } from "./firebase";
import "./App.css";
import TopPage from "./component/top/Top";

const App: React.FC = () => {
  const user = useAuth();
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/'>
            <FirebaseContext.Provider value={{ user }}>
              <Switch>
                <Route exact path='/' component={TopPage} />
              </Switch>
            </FirebaseContext.Provider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
