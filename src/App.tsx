import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useAuth from "./component/context/useAuth";
import { auth, database, FirebaseContext } from "./firebase";
import TopPage from "./component/top/Top";
import LoginPage from "./component/login/LoginPage";
import Header from "./component/common/Header";
import Footer from "./component/common/Footer";
import SignUpPage from "./component/signup/SignUpPage";
import PrivacyPage from "./component/static/PrivacyPage";
import TermPage from "./component/static/TermPage";

const App: React.FC = () => {
  const user = useAuth();
  return (
    <FirebaseContext.Provider value={{ user, auth, database }}>
      <Router>
        <div className='App'>
          <Header />
          <Switch>
            <Route path='/'>
              <Switch>
                <Route exact path='/' component={TopPage} />
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/signup' component={SignUpPage} />
                <Route exact path='/privacy' component={PrivacyPage} />
                <Route exact path='/term' component={TermPage} />
              </Switch>
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </FirebaseContext.Provider>
  );
};

export default App;
