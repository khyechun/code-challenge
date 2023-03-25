import './App.css';
import { Routes, Route } from 'react-router-dom';
import Form from './features/form';

function App() {
  return <>

    <div className="App">
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </div>
  </>
}


export default App;
