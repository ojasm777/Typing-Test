import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";
import Header from "../Components/Header";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [avgWPM, setAvgWPM] = useState(0);
  const [user, loading, error] = useAuthState(auth); // we are using this to get when the firebase will load
  // loading is true this means that firebase is loading and false means it is not loading

  const [dataLoading, setDataLoading] = useState(true);

  const [graphData, setGraphData] = useState([]);
  let tempGraphData = [];
  const fetchUserData = async () => {
    try {
      const resultRef = collection(db, "Results");
      const { uid } = auth.currentUser;
      let tempData = [];
      // the result that we get is snapshot
      const querySnap = await getDocs(
        query(
          resultRef,
          where("userId", "==", uid),
          orderBy("timeStamp", "desc")
        )
      );
      querySnap.docs.forEach((doc) => {
        tempData.push({ ...doc.data() });
        tempGraphData.push([
          doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
          doc.data().wpm,
        ]);
      });
      // store the average words per minute
      let tempTotalWPM = 0;
      tempData.map((item) => {
        tempTotalWPM += item.wpm;
      }); 
      const tempAvgWPM = Math.round((tempTotalWPM / tempData.length)*100) / 100;
      setAvgWPM(tempAvgWPM);
      setData(tempData);
      setGraphData(tempGraphData.reverse());
      setDataLoading(false);
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) fetchUserData();
    if (!loading && !user) navigate("/");
  }, [loading]);

  if (loading || dataLoading) {
    return (
      <div class="center-of-screen">
        <CircularProgress style={{ size: "200" }} />
      </div>
    );
  }

  // Now we will render data in the table format
  return (
    <>
      <div class="canvas">
        <Header /> 
        <UserInfo totalTestsTaken={data.length} avgWPM={avgWPM} />
        {graphData &&  (<div class="graph-user-page">
          <Graph graphData={graphData} type="date" />
        </div>
        )}
        <TableUserData data={data} />
      </div>
    </>
  );
};

export default UserPage;
