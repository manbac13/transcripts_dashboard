import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Diarization from './Pages/Diarization/Diarization';
import EvaluationPlayer from './Pages/EvaluationPlayer/EvaluationPlayer';
import Home from './Pages/Home/Home';
import Stt from './Pages/Stt/Stt';
import View from './Pages/View/View';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/stt" element={<Stt />} />
          <Route path="/evaluationplayer" element={<EvaluationPlayer />} />
          <Route path="/view" element={<View />} />
          <Route path="/diarization" element={<Diarization />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
