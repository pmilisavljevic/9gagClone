import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import MainLayout from "src/Layout/MainLayout";
import "src/Styles/App.scss";
import { store } from "src/store/store";

import RoutesComponent from "./components/RoutesComponent";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <RoutesComponent />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}
