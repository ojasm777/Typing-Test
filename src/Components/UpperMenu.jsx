import React, {useState} from "react";
import { useTestMode } from "../Context/TestModeContext"; 
import { useTheme } from "../Context/ThemeContext";

const UpperMenu = ({countDown}) => {
    const {setTestTime} = useTestMode();
    const {theme} = useTheme();
    const updateTime = (e) => {
        setTestTime(Number(e.target.id));
    }
    return (
        <div className="upper-menu">
            <div className="counter">
                {countDown}
            </div>
            <div class="mode" style={{border: `1px solid ${theme.buttonColor}`, padding: '5px'}}>Time</div>
            <div className="modes">
                <div className="time-mode" id = {15} onClick = {updateTime}>15</div>
                <div className="time-mode" id = {30} onClick = {updateTime}>30</div>
                <div className="time-mode" id = {60} onClick = {updateTime}>60</div>
            </div>
        </div>
    )
};


export default UpperMenu;