import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import CommentPage from "./pages/CommentPage";
import ProfilesPage from "./pages/ProfilesPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";

const App = () => {
  return (
    <ProfileProvider>
      <Router>

        <div style={{ marginBottom: '' }}>
          <Header />
        </div>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/profiles" element={<ProfilesPage />} />
          <Route path="/comment" element={<CommentPage />} />
        </Routes>

      </Router>
    </ProfileProvider>

  );
};

export default App;
