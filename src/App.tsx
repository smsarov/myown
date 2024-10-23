import PersonView from "./components/PersonView/PersonView";
import Sidebar from "./components/Sidebar/Sidebar";
import { PersonContextProvider } from "./contexts/PersonContext";

function App() {
  return (
    <PersonContextProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Sidebar></Sidebar>

        <PersonView></PersonView>
      </div>
    </PersonContextProvider>
  );
}

export default App;
