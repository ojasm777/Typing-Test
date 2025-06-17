import React, { useEffect } from "react";
import Graph from "./Graph";
import { auth, db } from "../firebaseConfig";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 
import { useFocus } from "../Context/FocusContext";

const Stats = ({
  wpm,
  accuracy,
  correctChars,
  incorrectChars,
  missedChars,
  extraChars,
  graphData,
  resetTest,
}) => {
  let timeSet = new Set();
  const newGraph = graphData.filter((i) => {
    if (!timeSet.has(i[0])) {
      timeSet.add(i[0]);
      return i;
    }
  });

  const pushDataToDB = () => {
    // we need reference to the database (db object, it has reference to the database);
    // new method v9 onwards
    const resultsRef = collection(db, "Results");
    // old method
    // const resultsRef = db.collection("Results"); // if not already in firestore then results collection will be created
    const { uid } = auth.currentUser;

    // old method
    // resultsRef .add({
    // new method
    addDoc(resultsRef, {
      wpm: wpm,
      accuracy: accuracy,
      timeStamp: new Date(),
      characters: `${correctChars}/${incorrectChars}/${missedChars}/${extraChars}`,
      userId: uid,
    }) // object that needs to be pushed into the database
      .then((res) => {
        toast.success("Results pushed successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };

  useEffect(() => {
    if (auth.currentUser) {
      pushDataToDB();
    } else {
      toast.warning("Please login to save your results", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, []);

  const {focusInput} = useFocus();
  const handleResetTest = async () => {
    focusInput();
    resetTest();
    setTimeout(() => {
      focusInput();
    }, 100);
  }


  return (
    <div className="stats-box">
      <div className="left-stats">
        <div className="title">WPM</div>
        <div className="subtitles">{wpm}</div>
        <div className="title">Accuracy</div>
        <div className="subtitles">{accuracy}%</div>
        <div className="title">Characters</div>
        <div className="subtitles">
          {correctChars}/{incorrectChars}/{missedChars}/{extraChars}
        </div>
        <div className="restart" onClick={handleResetTest}>
          Restart
        </div>
      </div>
      <div className="right-stats">
        <Graph graphData={newGraph} />
      </div>
    </div>
  );
};

export default Stats;
