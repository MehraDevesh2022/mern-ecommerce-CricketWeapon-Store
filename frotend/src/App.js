import Footer from "./component/layouts/Footer/Footer";
import Header from "./component/layouts/Header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home/Home";
function App() {
  return (
    <Router>
     <Header/>
     <Switch>

       <Route exact path ="/">
          <Home/>
       </Route>
     </Switch>
      <Footer />
    </Router>
  );
}

export default App;
