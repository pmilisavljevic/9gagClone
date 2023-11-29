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

da li moze endpoint za brisanje posta?

srediti css, staviti klase na material elemente DONEish
objediniti sve buttone DONE
kako da izgleda pojedinacan post? DONE
protected routes za guesta DONE
prijateljstva DONE(moram da refreshujem nakon accept da bi request nestao) REFETCH ILI FILTER STATE-A
jedna funkcija za like/dislike DONE
ako neulogovani pokusa da lajkuje ili doda prijatelja, redirect na login i toastify da se uloguje DONE 
redirekcije DONE
srediti hendlovanje errora i loadinga DONE

toastify
@media
button da bude komponenta
sidebar - isto kao Account
novi page - moji zahtevi i brisanje!!!!!
unfriend?
paginacija


uvek da se fetchuje user na svakoj stranici (getUserInfo),a ko 401 da ide u logout
da moze da se lajkuje na single postu
moze user da lajkuje svoj post
trentna slika u edit profile da se prkazuje, staviti placeholder kao default img
objediniti funkcije za navikagicju u Account
napraviti folder components sa komponentama (input)
sortirati const-ove i importe
userReaction === staviti u enum
loginpage - logika da ide u posebnu funkciju, gore
za svaki fetch Thnuk da idu sva 3 case-a
handlePostReaction - handle za -1 index]\
validacije za novi post za sva 3 input
moment.js za DATUME ili datefns, staviti u ultis ili helpers
RewuestComponent - srediti funkcije, try/catch ako postoji response
dto iz Clint.ts u poseban fajl
napraviti loading i error za svaki request i nazvati ih odgovarajuce
variable i funkcije scss
dynamically declare variables scss
*/
