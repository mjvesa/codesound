import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { SongEditor } from "./components/SongEditor";

const queryClient = new QueryClient();

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <SongEditor />
    </QueryClientProvider>
  );
};

export default App;
