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
import ProtectedRouteGuest from "./utils/ProtectedRouteGuest";

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
            <Route
              path="submit"
              element={
                <ProtectedRouteGuest>
                  <NewPost />
                </ProtectedRouteGuest>
              }
            />

            <Route path="/gag/:id" element={<PostPage />} />
            <Route
              path="edit-profile"
              element={
                <ProtectedRouteGuest>
                  <EditProfile />
                </ProtectedRouteGuest>
              }
            />
            <Route
              path="requests-to-me"
              element={
                <ProtectedRouteGuest>
                  <RequestsToMe />
                </ProtectedRouteGuest>
              }
            />
            <Route
              path="my-posts"
              element={
                <ProtectedRouteGuest>
                  <MyPosts />
                </ProtectedRouteGuest>
              }
            />
            <Route
              path="my-friends"
              element={
                <ProtectedRouteGuest>
                  <MyFriends />
                </ProtectedRouteGuest>
              }
            />
            <Route
              path="posts-by-friend/:id"
              element={
                <ProtectedRouteGuest>
                  <PostsByFriend />
                </ProtectedRouteGuest>
              }
            />
            <Route
              path="posts-liked-by-friend/:id"
              element={
                <ProtectedRouteGuest>
                  <PostsLikedByFriend />
                </ProtectedRouteGuest>
              }
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

@media
button da bude komponenta
sidebar - isto kao Account
novi page - moji zahtevi i brisanje!!!!!
unfriend!!!!!
paginacija

napraviti folder components sa komponentama (input)
sortirati const-ove i importe
validacije za novi post za sva 3 input
return type za axios JOS KOJI MOZE
handlePostReaction - handle za -1 index]\ DONE?

*/
