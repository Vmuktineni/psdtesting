import React from "react";
import { useSelector } from "react-redux";

const Settings = () => {

    const user = useSelector(state => state?.userInfo?.user);

    const handleChange = (e) => {

    }

    const handleUpdateSubmit = (e) => {

    }

    return (
        <div className="container">
            <div className={`signup-container`}>
                <form>
                    <h1>Settings</h1>
                    <input type="text" placeholder="Name" id='name' value={user.name} onChange={handleChange} />
                    <input type="text" placeholder="Phone Number" id='contactId' value={user.contactId} onChange={handleChange} />
                    <input type="email" placeholder="Email" id='email' value={user.email} onChange={handleChange} />
                    <input type="text" placeholder="Address" id='address' value={user.address} onChange={handleChange} />
                    <input type="text" placeholder="Zip Code" id='zipCode' value={user.zipCode} onChange={handleChange} />
                    <input type="text" placeholder="UserName" id='userName' value={user.userName} disabled />
                    <button onClick={handleUpdateSubmit}>Update</button>
                </form>
            </div>
            <div className={`overlay-container`}>
        <div className={`overlay`}>
            <div className="overlay-panel right-overlay-panel">
                <h1>Hello, {user.name}!</h1>
                <p>Update your personal details here</p>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Settings;