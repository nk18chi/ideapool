import React, { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TopPage } from "./components/pages/TopPage";
import { SignUpPage } from "./components/pages/SignUpPage";
import { LoginPage } from "./components/pages/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivacyPage from "./components/pages/static/PrivacyPage";
import TermPage from "./components/pages/static/TermPage";
import AddIdea from "./components/modal/AddIdea";
import MyIdeaList from "./components/pages/MyIdeaList";
import IdeaContextProvider from "./contexts/IdeaContext";
import FirebaseContextProvider from "./contexts/FirebaseContext";
import { GlobalStyles } from "./components/style/GlobalStyles";
import { StylesProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { ForgetPasswordPage } from "./components/pages/ForgetPasswordPage";

const App: FC = () => {
  return (
    <FirebaseContextProvider>
      <IdeaContextProvider>
        <Router>
          <StylesProvider injectFirst>
            <GlobalStyles />
            <div className='App'>
              <Header />
              <Container maxWidth='md'>
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
                      <Route exact path='/forget_password' component={ForgetPasswordPage} />
                    </Switch>
                  </Route>
                </Switch>
              </Container>
              <Footer />
            </div>
          </StylesProvider>
        </Router>
      </IdeaContextProvider>
    </FirebaseContextProvider>
  );
};

export default App;
