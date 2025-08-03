import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Badge } from "./components/ui/badge" 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="p-6 space-y-4">
          <Badge>Default</Badge>
          <Badge variant="secondary"
            className="cursor-pointer"
            onClick={() => alert("Klik badge!")}
            role="button"
            tabIndex={0}>TEST</Badge>
              <Badge variant="destructive">Dest</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="default" className="bg-green-500">Custom Default</Badge>
            </div>
        <Routes>

          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>

    </TooltipProvider>

  </QueryClientProvider>
);

export default App;
