import React, {Component} from 'react';
import logo from '../logo.svg';
import './App.css';
import Header from "../components/Header";

class App extends Component {
    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);
        return (
            <div>
                {isAuth ? undefined : <Header/>}
                { this.props.children }
            </div>

        );
    }
}

export default App;
