import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/fig3/Home';
import LogIn from './pages/fig2/LogIn';
import SignUp from './pages/fig1/SignUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogIn />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
