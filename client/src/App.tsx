import Header from "./components/Header";
import Comment from "./pages/Comment";
import Profiles from "./pages/Profiles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>

      <div style={{ marginBottom: '' }}>
        <Header />
      </div>

      <Routes>
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/comment" element={<Comment />} />
      </Routes>
      
    </Router>
  );
};

export default App;
