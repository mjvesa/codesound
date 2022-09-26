import { useState } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Provider as ReduxQueryProvider } from "redux-query-react";
import store from "./store";
import { SongEditor } from "./components/SongEditor";
export const getQueries = (state: any) => state.queries;

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <ReduxQueryProvider queriesSelector={getQueries}>
        <SongEditor />
      </ReduxQueryProvider>
    </Provider>
  );
};

export default App;
