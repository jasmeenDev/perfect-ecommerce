import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
const Rootlayout: React.FC = () => (
  <>
    <Provider store={store}>
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </Provider>
  </>
);
export default Rootlayout;
