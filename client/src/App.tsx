import Header from "./components/Header";
import CommentPage from "./pages/CommentPage";
import ProfilePage from "./pages/ProfilePage";
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
          <Route path="/profiles" element={<ProfilePage />} />
          <Route path="/comment" element={<CommentPage />} />
        </Routes>

      </Router>
    </ProfileProvider>

  );
};

export default App;
