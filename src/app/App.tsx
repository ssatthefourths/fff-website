import { BrowserRouter, Routes, Route } from 'react-router';
import { CartProvider } from '../context/CartContext';
import { AuthProvider } from '../context/AuthContext';
import { Layout } from '../components/Layout';
import HomePage from '../pages/HomePage';
import { lazy, Suspense } from 'react';

const ShopPage = lazy(() => import('../pages/ShopPage'));
const ProductPage = lazy(() => import('../pages/ProductPage'));
const CartPage = lazy(() => import('../pages/CartPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const CheckoutSuccessPage = lazy(() => import('../pages/CheckoutSuccessPage'));
const BlogPage = lazy(() => import('../pages/BlogPage'));
const BlogPostPage = lazy(() => import('../pages/BlogPostPage'));
const FaqPage = lazy(() => import('../pages/FaqPage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const BeginnersPage = lazy(() => import('../pages/BeginnersPage'));
const AccountPage = lazy(() => import('../pages/AccountPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));

// Admin bundle — separate chrome (sidebar), separate route tree.
const AdminLayout = lazy(() => import('../pages/admin/AdminLayout'));
const DashboardOverview = lazy(() => import('../pages/admin/DashboardOverview'));
const ProductsTab = lazy(() => import('../pages/admin/ProductsTab'));
const OrdersTab = lazy(() => import('../pages/admin/OrdersTab'));
const NewsletterTab = lazy(() => import('../pages/admin/NewsletterTab'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin h-12 w-12 border-4 border-[#8b52c5] border-t-transparent rounded-full" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public site — wrapped in the marketing Layout (nav, footer). */}
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="patterns" element={<ShopPage />} />
                <Route path="patterns/:category" element={<ShopPage />} />
                <Route path="patterns/:category/:slug" element={<ProductPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="checkout/success" element={<CheckoutSuccessPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="beginners" element={<BeginnersPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="login" element={<AccountPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin — own chrome, nested sub-routes. Client guard in
                  AdminLayout bounces non-admins to /account. */}
              <Route path="admin" element={<AdminLayout />}>
                <Route index element={<DashboardOverview />} />
                <Route path="products" element={<ProductsTab />} />
                <Route path="orders" element={<OrdersTab />} />
                <Route path="newsletter" element={<NewsletterTab />} />
              </Route>
            </Routes>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
