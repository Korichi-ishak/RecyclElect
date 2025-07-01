import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Layout } from "./layout/Layout";
import { Toaster } from 'sonner';
import { SellPage } from "./pages/SellPage";
import { BuyPage } from "./pages/BuyPage";
import { CartPage } from "./pages/CartPage";
import { ContactPage } from "./pages/ContactPage";

const RootLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

function App() {
  return (
    <Router>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgba(23, 23, 23, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          },
          classNames: {
            success: 'text-green-400',
          },
        }}
      />
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/vendre" element={<SellPage />} />
          <Route path="/j-achete" element={<BuyPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/nous-contacter" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
