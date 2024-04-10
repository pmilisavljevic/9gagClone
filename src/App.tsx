import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "src/Layout/MainLayout";
import EditProfile from "src/Pages/EditProfile/EditProfile";
import LoginPage from "src/Pages/Login/LoginPage";
import MainPage from "src/Pages/Main/MainPage";
import MyFriends from "src/Pages/MyFriends/MyFriends";
import MyPosts from "src/Pages/MyPosts/MyPosts";
import NewPost from "src/Pages/NewPost/NewPost";
import PostPage from "src/Pages/Post/PostPage";
import PostsByFriend from "src/Pages/PostsByFriend/PostsByFriend";
import PostsLikedByFriend from "src/Pages/PostsLikedByFriend/PostsLikedByFriend";
import RequestsToMe from "src/Pages/RequestsToMe/RequestsToMe";
import SignupPage from "src/Pages/Signup/SignupPage";
import "src/Styles/App.scss";
import { store } from "src/store/store";
import ProtectedRouteGuest from "src/utils/ProtectedRouteGuest";
import ProtectedRouteUser from "src/utils/ProtectedRouteUser";

export default function App() {
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
