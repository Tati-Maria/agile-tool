import {Outlet} from "react-router-dom";
import { ThemeProvider } from "@/components/providers/theme-provider";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
     <Outlet />
    </ThemeProvider>
  )
}

export default App
