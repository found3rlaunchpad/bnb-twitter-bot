import logo from './logo.svg';
import './App.css';
import { getStatus, startBot ,stopBot} from './connectFunctions';

function App() {

  const handleStart = async()=>{
    console.log(await startBot())
  }

  const handleStop = async()=>{
    console.log(await stopBot())
  }

  const handleGetStatus = async()=>{
    console.log(await getStatus())
  }


  return (
    <div>
      <button
      onClick={handleStart}
      >Start</button>
      <button
      onClick={handleStop}
      >Stop</button>
      <button
      onClick={handleGetStatus}
      >Status</button>
    </div>
  );
}

export default App;
