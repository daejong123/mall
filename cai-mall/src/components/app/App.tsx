import * as React from 'react';
import './App.css';
import Header from '../../containers/Header';
import Main from '../../containers/Main';
import Footer from '../footer/Footer';
import { History } from 'history';
interface IProps {
  history: History;
}

class App extends React.Component<IProps> {
  public render() {
    return (
      <div className="App">
        <Header history={this.props.history} />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
