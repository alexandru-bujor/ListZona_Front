import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { MobileNav } from "./components/MobileNav";

// Pages
import Index from "./pages/Index";
import Listings from "./pages/Listings";
import ListingDetail from "./pages/ListingDetail";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Post from "./pages/Post";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { Banner } from "@/components/Ads.tsx";

function App() {
  return (
    <BrowserRouter basename="/ListZona_Front">
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listing/:id" element={<ListingDetail />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/post" element={<Post />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <MobileNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
