import { BrowserRouter, Routes, Route } from "react-router-dom";
import "src/Styles/App.scss";

import MainPage from "src/Pages/Main/MainPage";
import LoginPage from "src/Pages/Login/LoginPage";
import SignupPage from "src/Pages/Signup/SignupPage";

import { Provider } from "react-redux";
import { store } from "src/store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;

/*

*/
