import { UserAuth } from "./context/AuthContext"
import Dashboard from "./pages/Dashboard";

export default function RerouteToDashboard({ children }) {
    const { session } = UserAuth();

    console.log("RerouteToDashboard session:", session);

    return session ? <Dashboard /> : children;
}