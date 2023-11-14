import NavBar from "src/Layout/NavBar";
import PostForm from "src/Pages/NewPost/PostForm";

function NewPost() {
  return (
    <>
      <NavBar />
      <div className="new-post">
        <PostForm />
      </div>
    </>
  );
}

export default NewPost;
