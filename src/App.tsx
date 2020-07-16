import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TopPage from "./components/pages/top/Top";
import LoginPage from "./components/pages/login/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUpPage from "./components/pages/signup/SignUpPage";
import PrivacyPage from "./components/pages/static/PrivacyPage";
import TermPage from "./components/pages/static/TermPage";
import AddIdea from "./components/modal/AddIdea";
import MyIdeaList from "./components/pages/mylist/MyIdeaList";
import IdeaContextProvider from "./contexts/IdeaContext";
import FirebaseContextProvider from "./contexts/FirebaseContext";

const App: React.FC = () => {
  return (
    <FirebaseContextProvider>
      <IdeaContextProvider>
        <Router>
          <div className='App'>
            <Header />
            <Switch>
              <Route path='/'>
                <Switch>
                  <Route exact path='/' component={TopPage} />
                  <Route exact path='/add' component={AddIdea} />
                  <Route exact path='/my_ideas' component={MyIdeaList} />
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
      </IdeaContextProvider>
    </FirebaseContextProvider>
  );
};

export default App;
