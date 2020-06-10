import React, { Component } from 'react';

import Cookies from 'universal-cookie';

// import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Route, Switch } from "react-router-dom";

import { Navbar } from './Navbar';
import { Toolbar } from './Toolbar';

import { PageHome } from './pages/PageHome';
import { PageQueue } from './pages/PageQueue';
import { PageCollector } from './pages/PageCollector';
import { PageLogs } from './pages/PageLogs';

import { Loginform } from './Loginform';
import { Footer } from './Footer';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
})

// function App() {
export class App extends Component {
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)
  }
  handler(someValue) {
    this.setState({
      someVar: someValue
    })
  }

  render() {
    const cookies = new Cookies();
    const cookie = cookies.get('beaker.session.id')

    if (cookie) {
      return (
        <div className="App">
          <Switch>
            <Navbar />
          </Switch>
          <Toolbar />

          <div id="content" className="px-2">
            <Switch>
              <Route path="/" exact component={PageHome} />
              <Route path="/queue" component={PageQueue} />
              <Route path="/collector" component={PageCollector} />
              <Route path="/logs" component={PageLogs} />
            </Switch>
          </div>

          <GoTop scrollStepInPx="50" delayInMs="30" />
          <Footer />
        </div>
      );
    }
    else {
      return <div className="App">
        <Loginform handler={this.handler} />
      </div>
    }
  }
}

export default App;


class GoTop extends React.Component {
  state = {
       intervalId: 0,
       thePosition: false
   };

  componentDidMount() {
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        this.setState({ thePosition: true })
      }
      else {
        this.setState({ thePosition: false })
      }
    });

    window.scrollTo(0, 0);
  }

  onScrollStep = () => {
    if (window.pageYOffset === 0){
      clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }

  scrollToTop = () => {
    let intervalId = setInterval(this.onScrollStep, this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  renderGoTopIcon = () => {
    if (this.state.thePosition){
      return (
        <div className="go-top position-fixed" onClick={this.scrollToTop} style={{cursor: 'pointer',bottom: '30px',right: '0',color: '#ffffff',backgroundColor: '#c679e3',zIndex: 1,width: '90px',textAlign: 'center',height: '45px',borderRadius: '10px 0 0 10px',lineHeight: '46px'}}>
          Go Top
        </div>
      )
    }
  }

  render(){
    return (
      <React.Fragment>
        {this.renderGoTopIcon()}
      </React.Fragment>
    )
  }
}