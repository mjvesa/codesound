import { useEffect, useRef, useState } from "react";
import { Button, Grid, Input } from "@mui/material";
import { useQuery } from "react-query";

interface Song {
  id: number;
  name: string;
  code: string;
}

export const SongEditor = () => {
  const inputRef = useRef(null);
  const [muzak, setMuzak] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);

  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:8080/songs").then((res) => res.json())
  );

  useEffect(() => {
    setSongs(data);
  }, data);

  const playSound = () => {
    const f = new Function("const t = arguments[0]; return " + muzak + ";");
    console.log("pzzppzz" + muzak);
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
    <Grid>
      <div>
        {isLoading ? (
          <div>Loading</div>
        ) : (
          data.map((x: Song) => (
            <div>
              <b>{x.name}</b>
              <span>{x.code}</span>
            </div>
          ))
        )}
      </div>
      <div>
        Insert muzak here:
        <Input
          type="textarea"
          id="muzak-input"
          onChange={(ev) => setMuzak(ev.target.value)}
        ></Input>
        <Button onClick={playSound}>Play me</Button>
      </div>
    </Grid>
  );
};
