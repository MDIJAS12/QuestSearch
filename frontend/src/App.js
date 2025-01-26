import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';

import './App.css';
function App() {
  return (
    <>
      <div className="home-style d-flex flex-column h-100">
        <Header />
        <Main />
        <Footer />
      </div>

    </>
  );
}

export default App;
