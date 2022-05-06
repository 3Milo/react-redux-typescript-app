import { UsersList } from './features/usersList/UsersList';
import { Info } from './features/info/Info';
import { Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UsersList />}/>
        <Route path="/:username" element={<Info />}/>
      </Routes>
    </div>
  );
}

export default App;
