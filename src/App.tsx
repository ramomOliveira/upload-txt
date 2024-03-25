import SendTxtFile from "./components/SendTxtFiles";
import { SendTxtFilesProvider } from "./components/SendTxtFiles/SendTxtFilesContext";

function App() {
  return (
    <SendTxtFilesProvider>
      <SendTxtFile />
    </SendTxtFilesProvider>
  );
}

export default App;
