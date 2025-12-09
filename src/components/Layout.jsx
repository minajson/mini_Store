
// src/components/Layout.jsx
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-main">{children}</div>
      <footer className="app-footer">
        <p>
          Built for practice – data from{" "}
          <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer">
            FakeStore API
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default Layout;
