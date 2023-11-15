import { BrowserRouter, Routes, Route } from "react-router-dom";
import "src/Styles/App.scss";

import MainPage from "src/Pages/Main/MainPage";
import LoginPage from "src/Pages/Login/LoginPage";
import SignupPage from "src/Pages/Signup/SignupPage";
import ProtectedRouteUser from "src/utils/ProtectedRouteUser";

import { Provider } from "react-redux";
import { store } from "src/store/store";
import NewPost from "src/Pages/NewPost/NewPost";
import PostPage from "src/Pages/Post/PostPage";
import EditProfile from "src/Pages/EditProfile/EditProfile";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="login"
            element={
              <ProtectedRouteUser>
                <LoginPage />
              </ProtectedRouteUser>
            }
          />
          <Route
            path="signup"
            element={
              <ProtectedRouteUser>
                <SignupPage />
              </ProtectedRouteUser>
            }
          />
          <Route path="submit" element={<NewPost />} />
          <Route path="/gag/:id" element={<PostPage />} />
          <Route path="edit-profile" element={<EditProfile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
export default App;

/*
promeniti odakle dolazi state za pojedinacan post
srediti css, staviti klase na material elemente
srediti hendlovanje errora i loadinga
objediniti sve buttone

kako da izgleda pojedinacan post?
da li mogu thunk-ovi sa .addCase da se razdvoje?
sta da stavim u sidebar?

TODO
likes/dislike
ako neulogovani pokusa da lajkuje, redirect na login i toastify da se uloguje
prijateljstva
pages: my friends, friend requests, my post, postovi drugih usera, postovi lajkovi od stranre prijatelja
toastovi
redirect sa registera na login 
samo jedan axioinstance sa tokenom
dodati headere direktno u axios in servicers
*/
