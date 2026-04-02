import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FormPage from './pages/FormPage';
import TablePage from './pages/TablePage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/table" element={<TablePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
