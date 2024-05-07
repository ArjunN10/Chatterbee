import './App.css';
import {Routes,Route} from "react-router-dom"
import Conversation from "./pages/Conversation"

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Conversation/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
