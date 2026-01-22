export default function SettingsSidebar() {
    return (
        <div /* sidebar settings div*/
            className="d-flex flex-column text-center h-50 p-3"
            style={{
                backgroundColor: "#FAE2DB"
            }}>
            <h2 className="text-white m-3">Settings</h2>
            <button className="btn btn-light m-2">Profile</button>
            <button className="btn btn-light m-2">Account</button>
            <button className="btn btn-light m-2">Preferences</button>
            <button className="btn btn-light m-2">Logout</button>
        </div >
    )
}