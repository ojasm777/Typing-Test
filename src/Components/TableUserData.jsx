import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useTheme } from "../Context/ThemeContext";

const TableUserData = ({data}) => {
  const {theme} = useTheme();
  const cellStyle = {
    color : theme.textColor,
    textAlign: 'center'
  }
  // We will use table directly from the material UI
  // for the body of the table we will map over the data that we fetched from the firebase and display it 
  // After this we will show the graphData, but we have to do manipulation on the graphData
  // we will have to show timeStamps on the x axis and the wpm on the y axis
  return (
    <div class="table">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={cellStyle}>WPM</TableCell>
              <TableCell style={cellStyle}>Accuracy</TableCell>
              <TableCell style={cellStyle}>Characters</TableCell>
              <TableCell style={cellStyle}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map((item) => (
                <TableRow>
                  <TableCell style={cellStyle}>{item.wpm}</TableCell>
                  <TableCell style={cellStyle}>{item.accuracy}</TableCell>
                  <TableCell style={cellStyle}>{item.characters}</TableCell>
                  <TableCell style={cellStyle}>{item.timeStamp.toDate().toLocaleString()}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableUserData;
