import { UsersList } from './features/usersList/UsersList';
import { UserInfo } from './features/userInfo/UserInfo';
import { Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UsersList />}/>
        <Route path="/:username" element={<UserInfo />}/>
      </Routes>
    </div>
  );
}

export default App;
