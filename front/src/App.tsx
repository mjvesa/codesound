import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { SongEditor } from "./components/SongEditor";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <SongEditor />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
