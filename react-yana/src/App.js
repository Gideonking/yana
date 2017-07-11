// import Dependencies
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

// Components
import NavMenu from './components/NavMenu';

// Pages
import HomePage from './pages/HomePage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import CoursesPage from './pages/CoursesPage';
import SingleCoursePage from './pages/SingleCoursePage';
import WordPage from './pages/WordPage'
import LanguagePage from './pages/LanguagePage';


import SignInPage from './pages/SignInPage';

class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <NavMenu />
            <Switch>
              <Route
                exact path='/'
                render={() => (<HomePage />)}/>

              <Route
                path='/faq'
                render={() => (<FaqPage />)} />

              <Route
                path='/contact'
                render={() => (<ContactPage />)}/>

              <Route
                path='/languages'
                render={() => (<LanguagePage />)}/>

              <Route
                path='/courses/:id'
                render={({match}) => (<SingleCoursePage courseId={match.params.id}/>)}/>

              <Route
                path='/courses'
                render={() => (<CoursesPage />)}/>

                <Route
                  path='/animal_exercise_page'
                  render={() => (<WordPage />)}/>

              <Route
                path='/sign_in'
                render={() => (<SignInPage />)}/>

              <Route render={
                ({ location }) => (
                  <div className="not-found-page-container">
                    <h1 className="not-found-page-msg text-center">
                      { location.pathname } Url Not Found
                    </h1>
                  </div>
                )
              }
            />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
