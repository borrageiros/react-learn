import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from "reactstrap";


import Header from "./components/Header/Header";
import { useAuth0 } from "@auth0/auth0-react";
import ActivitiesList from "./screens/Activity/ActivitiesList/ActivitiesList";
import ActivitiesEdit from "./screens/Activity/ActivitiesEdit/ActivitiesEdit";
import ActivitiesCreate from "./screens/Activity/ActivitiesCreate/ActivitiesCreate";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      <div id="app" className="d-flex flex-column h-100">
      <Header />
      <Container className="flex-grow-1 mt-5">
        <Routes>
          <Route path="/activities" element={<ActivitiesList />}/>
          <Route path="/activities/edit/:id" element={<ActivitiesEdit />}/>
          <Route path="/activities/create" element={<ActivitiesCreate />}/>
        </Routes>
      </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;