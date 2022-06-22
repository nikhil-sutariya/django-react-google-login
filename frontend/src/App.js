import './App.css';
import { Routes, Route } from "react-router-dom";
import { Nav } from './component/Nav';
import { Home } from './views/Home';
import { About } from './views/About';
import { Login } from './views/Login';
import { Signup } from './views/Signup';
import { ProtectedRoutes } from './ProtectedRoutes';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
