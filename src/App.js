import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
import ProductFeature from './features/Product';
import CartFeature from './features/Cart';
function App() {
 
  return (
    <div className="App">
        <Header />
        <Switch>
          <Redirect from="/home" to="/" exact/>
          <Route path="/products" component={ProductFeature} />
          <Route path="/cart" component={CartFeature} />

          <Route component={NotFound}/>
        </Switch>
    </div>
  );
}

export default App;
