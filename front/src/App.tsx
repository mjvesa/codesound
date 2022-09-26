import { Button, Input } from "@mui/material";
import { useRef, useState } from "react";
import "./App.css";
import { Provider } from 'react-redux';
import { Provider as ReduxQueryProvider } from 'redux-query-react';
import store from './store';
export const getQueries = (state:any) => state.queries;
function App() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const [muzak, setMuzak] = useState('');

  const playSound = () => {
    const f = new Function('const t = arguments[0]; return ' + muzak + ';');
    console.log('pzzppzz' + muzak);
    // const A = new AudioContext
    // const S = A.createScriptProcessor (4096, 0, /*channels=*/1);
    // S.connect(A.destination);
    // S.onaudioprocess= e => {

    // let T=0;
    // for (let i = 0; i < 10; i++, T += 1 / A.sampleRate)
    //     e.outputBuffer.getChannelData(0)[i] = f(T);
    // }

    let audioCtx = new window.AudioContext();
    let myArrayBuffer = audioCtx.createBuffer(1, 44100 * 5, 44100);
    let nowBuffering = myArrayBuffer.getChannelData(0);
    let value = 0,
      prev = 0;
    for (let i = 0; i < myArrayBuffer.length; i++) {
      /*
      value = ((i & (2047 - 1024)) + ((((i * 100) / 99) & 2047) - 1024)) / 2048.0; //Math.random() * 2 - 1
      var filt = (Math.sin(i / 10000.0) + 1) * 16;
      value = (value + prev * filt) / (filt + 1);
      nowBuffering[i] = value;
      prev = value;
      */
      nowBuffering[i] = f(i);
    }
    var source = audioCtx.createBufferSource();
    source.buffer = myArrayBuffer;
    source.connect(audioCtx.destination);
    source.start();
  };
  return (  
  
  <Provider store={store}>
    <ReduxQueryProvider queriesSelector={getQueries}>
    <div className="App">
      <p>
          Insert muzak here:
          <Input type="textarea" id="muzak-input" onChange={ev => setMuzak(ev.target.value)}></Input>
          <Button onClick={playSound}>Play me</Button>
        </p>
    </div>
    </ReduxQueryProvider>
    </Provider>);
}

export default App;
