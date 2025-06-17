import React from 'react'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig'; 

const UserInfo = ({totalTestsTaken, avgWPM}) => {

    const [user] = useAuthState(auth);
  return (
    <div class="user-profile">
        <div class="user">
            <div class="picture">
                <AccountCircleIcon style={{display: "block", transform: 'scale(5)', margin: 'auto', marginTop: '3.5rem' }} />
            </div>
            <div class="info">
                <div class="email">
                    {user.email}
                </div>
                <div class="joined-at">
                    {user.metadata.creationTime}
                </div>
            </div>
        </div>
        <div class="total-tests">
            <div>Total Tests Taken : {totalTestsTaken}</div>
            <div>Average WPM : {avgWPM}</div>
        </div>
    </div>
  )
}

export default UserInfo