import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PropertyDevelopment from "./pages/PropertyDevelopment";
import XChart from "./pages/XChart";
import PropertySales from "./pages/PropertySales";
import LocationServices from "./pages/LocationServices";
import Affiliates from "./pages/Affiliates";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/property-development" element={<PropertyDevelopment />} />
            <Route path="/x-chart" element={<XChart />} />
            <Route path="/property-sales" element={<PropertySales />} />
            <Route path="/location-services" element={<LocationServices />} />
            <Route path="/affiliates" element={<Affiliates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;