import React, { useState, useRef, useEffect, useMemo, createRef } from "react";
import { generate } from "random-words";
import UpperMenu from "./UpperMenu";
import { useTestMode } from "../Context/TestModeContext";
import Stats from "./Stats";
import { useFocus } from "../Context/FocusContext";

const TypingBox = () => {
  const [wordList, setWordList] = useState(() => {
    const words = generate(300);
    // console.log(Array.isArray(words));
    // console.log(words.length);
    return words;
  });
  const { focusInput, inputRef } = useFocus();
  // const inputRef = useRef(null);
  const { testTime, setTestTime } = useTestMode(); // avoiding prop drilling
  const [intervalId, setIntervalId] = useState(null);
  const [countDown, setCountDown] = useState(testTime);
  const [testStart, setTestStart] = useState(false);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [testEnd, setTestEnd] = useState(false);
  const [graphData, setGraphData] = useState([]);

  // const startTimer = () => {
  //   const intervalId = setInterval(timer, 1000); // after 1 second
  //   setIntervalId(intervalId);
  //   function timer() {
  //     // setCountDown(countDown - 1); this won't change the value
  //     setCountDown((prev) => {
  //       setCorrectChars((correctChars) => {
  //         console.log("speed: ", Math.ceil(correctChars / 5 / ((testTime - prev + 1) / 60)));
  //         // correct Character is the culprit
  //         console.log("correct Chars : ", correctChars);
  //         console.log("test time: ", testTime);
  //         console.log("prev: ", prev);
  //         setGraphData((graphData) => {
  //           return [
  //             ...graphData,
  //             [
  //               testTime - prev + 1,
  //               Math.ceil(
  //                 correctChars / 5 / ((testTime - prev + 1) / 60)
  //               ),
  //             ],
  //           ];
  //         });
  //         return correctChars;
  //       });

  //       if (prev === 1) {
  //         setTestEnd(true);
  //         clearInterval(intervalId); // interval will be cleared out
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }
  // };
  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      // console.log("timer function is working");
      setCountDown((prevCountDown) => {
        setCorrectChars((correctChars) => {
          // console.log("correct chars",correctChars);
          setGraphData((data) => {
            return [
              ...data,
              [
                testTime - prevCountDown,
                Math.round(
                  correctChars / 5 / ((testTime - prevCountDown + 1) / 60)
                ),
              ],
            ];
          });
          return correctChars;
        });

        if (prevCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
          return 0;
        }
        return prevCountDown - 1;
      });
    }
  };

  // These states will help us in the mapping of each and every
  // character within the words
  const [currWordIdx, setCurrWordIdx] = useState(0);
  const [currCharIdx, setCurrCharIdx] = useState(0);

  // all the words are span and we will store the ref of all the words
  // usememo does caching so that application is optimized
  // we are returning an array of length = length of words
  // we are filling it with 0 (we cannot run map on empty array)
  // we are then mapping every element and creating a ref for it (using createRef by react only)
  // useRef is a hook which cannot be used inside a function
  // whereas createRef is a function which can be used inside a callback
  const wordsSpanRef = useMemo(() => {
    return Array(wordList.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordList]);

  // console.log(wordsSpanRef);

  // As soon as the websites loads then the focus of the user should be at the input box
  // Why a separate function? As we need it in two cases :
  // 1. When the site loads
  // 2. When the user clicks on the TypeBox
  // const focusInput = () => {
  //   inputRef.current.focus(); // every HTML element has this focus function, jisse focus us par aa jaye
  // };
  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);
  // dependency is empty as we need this functionality whenever the website loads
  // After this, whenever the website is loaded there is focus on the input box

  useEffect(() => {
    resetTest();
  }, [testTime]);

  const resetWordSpanRefClassname = () => {
    if (wordsSpanRef == null || wordsSpanRef.length == 0) {
      return;
    }
    wordsSpanRef.map((i) => {
      // if(i.current == null) return;
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });
    wordsSpanRef[0].current.childNodes[0].className = "current";
  };
  const resetTest = () => {
    // word span ref ko reset karna hoga
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrWordIdx(0);
    setCurrCharIdx(0);
    setTestStart(false);
    setTestEnd(false);
    setWordList(generate(300));
    setGraphData([]);
    resetWordSpanRefClassname();
    focusInput();
  };

  const ignoredKeys = [
    "Control",
    "Alt",
    "Shift",
    "Meta",
    "Tab",
    "CapsLock",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Insert",
    "Delete",
    "Home",
    "End",
    "PageUp",
    "PageDown",
    "NumLock",
    "ScrollLock",
    "Pause",
  ];

  const handleUserInput = (e) => {
    if (!testStart) {
      setCorrectChars(0); // finally after a lot of time, this works
      startTimer();
      setTestStart(true);
    }
    // console.log(e);
    // it will give me a nodeList which contains the spans of all the chars in the current word
    const allCurrChars = wordsSpanRef[currWordIdx].current.childNodes;

    if (ignoredKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }
    if (e.keyCode === 32) {
      if (currWordIdx === wordList.length - 1) {
        clearInterval(intervalId);
        setCurrWordIdx(currWordIdx + 1);
        setTestEnd(true);
        return;
      }
      // correct word check
      let correctCharsInWord =
        wordsSpanRef[currWordIdx].current.querySelectorAll(".correct");
      if (correctCharsInWord === allCurrChars.length) {
        setCorrectWords(correctWords + 1);
      }
      // spacebar
      if (allCurrChars.length <= currCharIdx) {
        // remove cursor from the last place
        allCurrChars[currCharIdx - 1].classList.remove("current-right");
      } else {
        // remove cursor from in between
        // from here
        setMissedChars(missedChars + (allCurrChars.length - currCharIdx));
        for (let i = currCharIdx; i < allCurrChars.length; i++) {
          allCurrChars[i].className += " skipped";
        }
        allCurrChars[currCharIdx].className = allCurrChars[
          currCharIdx
        ].className.replace("current", "");
        // to here
        // allCurrChars[currCharIdx].classList.remove("current");
      }
      //scrollinig line condition
      if (
        wordsSpanRef[currWordIdx + 1]?.current?.offsetLeft <
        wordsSpanRef[currWordIdx]?.current?.offsetLeft
      ) {
        wordsSpanRef[currWordIdx]?.current?.scrollIntoView();
      }
      wordsSpanRef[currWordIdx + 1].current.childNodes[0].className =
        "char current";
      // start currWordIdx would increase
      setCurrWordIdx(currWordIdx + 1);
      setCurrCharIdx(0);

      return;
    }

    if (e.keyCode === 8) {
      // backspace
      if (currCharIdx !== 0) {
        // not to go to the previous word

        if (allCurrChars.length === currCharIdx) {
          if (allCurrChars[currCharIdx - 1].className.includes("extra")) {
            allCurrChars[currCharIdx - 1].remove();
            allCurrChars[currCharIdx - 2].className += " current-right";
          } else {
            // right wale ko remove karna hai
            allCurrChars[currCharIdx - 1].className = "current";
          }
          setCurrCharIdx(currCharIdx - 1);
          return;
        }
        allCurrChars[currCharIdx].className = "char";
        // correct incorrect will go
        allCurrChars[currCharIdx - 1].className = "char current";
        setCurrCharIdx(currCharIdx - 1);
      }
      return;
    }

    if (currCharIdx === allCurrChars.length) {
      setExtraChars(extraChars + 1);
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "char incorrect extra current-right";
      allCurrChars[currCharIdx - 1].classList.remove("current-right");
      wordsSpanRef[currWordIdx].current.append(newSpan);
      setCurrCharIdx(currCharIdx + 1);
      return;
    }

    if (allCurrChars[currCharIdx].innerText === e.key) {
      // The user has pressed correctly
      allCurrChars[currCharIdx].className = "char correct";
      setCorrectChars((prev) => {
        // console.log("correct chars: ", prev);
        return prev + 1;
      });
    } else {
      allCurrChars[currCharIdx].className = "char incorrect";
      setIncorrectChars((prev) => prev + 1);
    }

    if (currCharIdx + 1 === allCurrChars.length) {
      allCurrChars[currCharIdx].className += " current-right";
      // as +1 is moving out of bound
    } else {
      // now fix the cursor
      allCurrChars[currCharIdx + 1].className = "char current";
      // Till here atleast the first word is completed
      // Both of them will give out of bound kind of error
    }
    setCurrCharIdx(currCharIdx + 1); // go to the next character
  };

  // calculate words per minute
  const wordsPerMinute = () => {
    return Math.round(
      correctChars / 5 / ((graphData[graphData.length - 1][0] + 1) / 60)
    );
  };

  // calculate the accuracy
  const accuracy = () => {
    return (
      Math.round(
        (correctChars /
          (correctChars + incorrectChars + missedChars + extraChars)) *
          100 *
          100
      ) / 100
    );
  };

  return (
    <div>
      {testEnd ? (
        <Stats
          wpm={wordsPerMinute()}
          accuracy={accuracy()}
          correctChars={correctChars}
          incorrectChars={incorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
          resetTest={resetTest}
        />
      ) : (
        <>
          <UpperMenu countDown={countDown} />
          <div className="typeBox" onClick={focusInput}>
            <div className="words">
              {wordList.map((str, idx) => (
                <span className="word" ref={wordsSpanRef[idx]}>
                  {str.split("").map((char, charIdx) => (
                    <span key={charIdx} className="letter">
                      {char}
                    </span>
                  ))}
                  {/* {" "} <= this thing also made sure that the words were having space and also that they were not in only one line but in multiple lines */}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
      <input
        type="text"
        onKeyDown={handleUserInput} // gets triggered when any key is pressed
        className="hidden-input"
        ref={inputRef}
      />
    </div>
  );
};

export default TypingBox;
