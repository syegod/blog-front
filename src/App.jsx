import { Route, Routes } from "react-router-dom";
import AllPosts from "./components/AllPosts";
import CreatePost from "./components/CreatePost";
import Layout from "./components/Layout";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Post from "./components/Post";
import Register from "./components/Register";
import { useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllPosts />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/post/:id" element={<Post />}></Route>
        {/* <Route path="/post/:id/edit" element={<CreatePost isCreation={false} />}></Route> */}
        <Route path="/post/create" element={<CreatePost />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;