import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from './context/AuthContext'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Toaster />
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/rooms/new" component={NewRoom}/>
            <Route path="/rooms/:id" component={Room} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
