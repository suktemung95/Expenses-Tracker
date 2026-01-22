import { UserAuth } from "../context/AuthContext"
import Header from "../components/Header.jsx";
import SettingsSidebar from "../components/SettingsSidebar.jsx";

import './Dashboard.css'

export default function Dashboard() {

    const { session } = UserAuth();

    console.log("Dashboard session:", session);
    return (
        <>
            <div className="d-flex vh-100 ">
                <SettingsSidebar />
                <div className="d-flex flex-column bg-secondary">
                    <Header />
                    <div className="dashboard-grid">
                        <div className="card">Total Balance</div>
                        <div className="card">Total Savings</div>


                        <div className="card span-2">Statistics and Graphs</div>

                        <div className="card">Goals</div>
                        <div className="card">Spending Overview</div>
                        <div className="transactions">Transactions</div>
                    </div>

                </div>



            </div >
        </>
    )
}