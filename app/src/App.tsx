import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import BorrowLend from "./pages/BorrowLend";
import Vault from "./pages/Vault";
import CreditProfile from "./pages/CreditProfile";
import IdentityVerification from "./pages/IdentityVerification";
import RWATokenization from "./pages/RWATokenization";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/borrow-lend" element={<BorrowLend />} />
          <Route path="/borrow" element={<BorrowLend />} />
          <Route path="/lend" element={<BorrowLend />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/credit-profile" element={<CreditProfile />} />
          <Route path="/rwa-tokenization" element={<RWATokenization />} />
          <Route path="/verify" element={<IdentityVerification />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
