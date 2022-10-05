import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { useMutation, useQuery } from "react-query";
import { ConfigurableSlider } from "./ConfigurableSlider";
import { styled } from "@mui/system";

interface Song {
  id: number | null;
  name: string;
  code: string;
}

const ScaryButton = styled(Button)`
  background-color: red;
`;

export const SongEditor = () => {
  const [currentSong, setCurrentSong] = useState<Song>({
    id: null,
    name: "",
    code: "",
  });
  const [songs, setSongs] = useState<Song[]>([]);

  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("http://localhost:8080/songs").then((res) => res.json())
  );

  const saveSong = useMutation((song) => {
    const url = "http://localhost:8080/songs";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(song),
    };
    return fetch(url, options);
  });

  const deleteSong = useMutation((song) => {
    const url = "http://localhost:8080/songs";
    const options = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(song),
    };
    return fetch(url, options);
  });

  const newSong = () => {
    setCurrentSong({ id: null, name: "New Song", code: "" });
  };

  useEffect(() => {
    setSongs(data);
  }, [data]);

  const loadSong = (id: number) => {
    console.log(id);
    for (const song of songs) {
      if (song.id === id) {
        setCurrentSong(song);
      }
    }
  };

  const playSound = () => {
    const f = new Function(
      "const t = arguments[0]; return " + currentSong.code + ";"
    );
    let audioCtx = new window.AudioContext();
    let myArrayBuffer = audioCtx.createBuffer(1, 44100 * 5, 44100);
    let nowBuffering = myArrayBuffer.getChannelData(0);
    for (let i = 0; i < myArrayBuffer.length; i++) {
      nowBuffering[i] = f(i);
    }
    var source = audioCtx.createBufferSource();
    source.buffer = myArrayBuffer;
    source.connect(audioCtx.destination);
    source.start();
  };

  const saveCurrent = () => {
    saveSong.mutate(currentSong);
  };

  return (
    <>
      <h1>CodeSound</h1>
      <Grid
        container
        direction="row"
        alignContent={"space-between"}
        wrap={"nowrap"}
        padding={0}
      >
        <Grid item container direction="column" flexGrow={0}>
          <List sx={{ maxWidth: "360px" }}>
            {isLoading ? (
              <div>Loading</div>
            ) : (
              data.map((song: Song) => (
                <ListItem key={song.id}>
                  <ListItemIcon>
                    <AudiotrackIcon />
                  </ListItemIcon>
                  <ListItemButton onClick={() => loadSong(song.id)}>
                    {song.name}
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Grid>
        <Grid container item direction="column" flexGrow={1}>
          <Grid item container spacing={2}>
            <TextField
              value={currentSong.name}
              onChange={(ev) => {
                const newSong = { ...currentSong, name: ev.target.value };
                setCurrentSong(newSong);
              }}
            />
            <textarea
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                width: "99%",
                padding: 0,
              }}
              value={currentSong.code}
              onChange={(ev) => {
                const newSong = { ...currentSong, code: ev.target.value };
                setCurrentSong(newSong);
              }}
            ></textarea>
          </Grid>
          <Stack direction="row" spacing={4}>
            <ConfigurableSlider name="A" from={0} to={100} value={50} />
            <ConfigurableSlider name="B" from={0} to={100} value={50} />
            <ConfigurableSlider name="C" from={0} to={100} value={50} />
          </Stack>
          <Stack direction="row" spacing={4}>
            <Button variant="contained" onClick={playSound}>
              Play me
            </Button>
            <Button variant="contained" onClick={() => saveCurrent}>
              Save
            </Button>
            <Button variant="contained" onClick={newSong}>
              New Song
            </Button>
            <ScaryButton
              variant="contained"
              onClick={() => deleteSong.mutate(currentSong)}
            >
              Delete
            </ScaryButton>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
