import React from "react";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";
import {NoMatch} from "./NoMatch";
import DeleteUser from "./DeleteUser";
function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateUser />} />
          <Route path="update" element={<UpdateUser />} />
          <Route path="delete" element={<DeleteUser />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
  );
}

export default App;
