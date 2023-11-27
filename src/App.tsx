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
import RequestsToMe from "src/Pages/RequestsToMe/RequestsToMe";
import MyPosts from "src/Pages/MyPosts/MyPosts";
import MainLayout from "src/Layout/MainLayout";
import MyFriends from "src/Pages/MyFriends/MyFriends";
import PostsByFriend from "./Pages/PostsByFriend/PostsByFriend";
import PostsLikedByFriend from "./Pages/PostsLikedByFriend/PostsLikedByFriend";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
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
            <Route path="requests-to-me" element={<RequestsToMe />} />
            <Route path="my-posts" element={<MyPosts />} />
            <Route path="my-friends" element={<MyFriends />} />
            <Route path="posts-by-friend/:id" element={<PostsByFriend />} />
            <Route
              path="posts-liked-by-friend/:id"
              element={<PostsLikedByFriend />}
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}
export default App;

/*



TODO
srediti css, staviti klase na material elemente
srediti hendlovanje errora i loadinga
objediniti sve buttone
kako da izgleda pojedinacan post? SREDITI CLASSNAME
sta da stavim u sidebar?

prijateljstva DONE(moram da refreshujem nakon accept da bi request nestao)

ako neulogovani pokusa da lajkuje, redirect na login i toastify da se uloguje

*/
