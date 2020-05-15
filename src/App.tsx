import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAuth from "./component/context/useAuth";
import { auth, database, FirebaseContext } from "./firebase";
import "./App.css";
import TopPage from "./component/top/Top";
import LoginPage from "./component/login/LoginPage";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";

const App: React.FC = () => {
  const user = useAuth();
  return (
    <div className='App'>
      <FirebaseContext.Provider value={{ user, auth, database }}>
        <Router>
          <Header />
          <Switch>
            <Route path='/'>
              <Switch>
                <Route exact path='/' component={TopPage} />
                <Route exact path='/login' component={LoginPage} />
              </Switch>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </FirebaseContext.Provider>
    </div>
  );
};

export default App;
