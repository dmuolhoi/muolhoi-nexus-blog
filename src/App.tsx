
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Layout
import AppLayout from "@/components/layout/AppLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";

// Public Pages
import HomePage from "@/pages/HomePage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ServicesPage from "@/pages/ServicesPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import LoginPage from "@/pages/admin/LoginPage";
import NotFound from "@/pages/NotFound";

// Admin Pages
import AdminDashboard from "@/pages/admin/AdminDashboard";
import NewPostPage from "@/pages/admin/NewPostPage";
import EditPostPage from "@/pages/admin/EditPostPage";
import EditPagePage from "@/pages/admin/EditPagePage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {/* Public Routes */}
              <Route index element={<HomePage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="login" element={<LoginPage />} />
              
              {/* Admin Routes */}
              <Route path="admin" element={<PrivateRoute />}>
                <Route index element={<AdminDashboard />} />
                <Route path="posts/new" element={<NewPostPage />} />
                <Route path="posts/edit/:id" element={<EditPostPage />} />
                <Route path="pages/edit/:id" element={<EditPagePage />} />
              </Route>
              
              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
