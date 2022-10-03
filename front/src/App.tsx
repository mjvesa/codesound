import { QueryClient, QueryClientProvider } from "react-query";

import "./App.css";
import { SongEditor } from "./components/SongEditor";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SongEditor />
    </QueryClientProvider>
  );
};

export default App;
