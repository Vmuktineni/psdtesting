import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../redux/Actions/UserActions";

const Logout = () => {
    const userFromRedux = useSelector(state => state?.userInfo?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if(userFromRedux) {
            dispatch(removeUser());
        }
        if(!userFromRedux) {
            navigate("/");
        }
    }, [userFromRedux]);
    return (
        <>
        </>
    )
}

export default Logout;