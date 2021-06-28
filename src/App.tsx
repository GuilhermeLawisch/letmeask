import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from './context/AuthContext';
import { ToggleContextProvider } from "./context/ToggleContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <ToggleContextProvider>
            <Toaster />
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/rooms/new" component={NewRoom}/>
              <Route path="/rooms/:id" component={Room} />
              <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
          </ToggleContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
