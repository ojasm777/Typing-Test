import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "../Context/ThemeContext";
// we have to register it before we can use it
// a modular approach that optimizes performance by loading only the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const Graph = ({ graphData, type }) => {
  const { theme } = useTheme();

  return (
    // <>
    //     <Line
    //         data = {
    //             {
    //                 labels : [1, 2, 3, 4],
    //                 datasets : [
    //                     {
    //                         data : [1, 4, 9, 16],
    //                         label : 'square',
    //                         borderColor : 'hotpink'
    //                     },
    //                     {
    //                         data : [1, 8, 27, 64],
    //                         label : 'cube',
    //                         borderColor : 'green'
    //                     }
    //                 ]
    //             }
    //         }
    //     />
    // </>
    <>
      <Line
        data={{
          labels: graphData.map((i) =>
            type === "date"
              ? i[0]
              : i[0]
          ), // x axis labels
          datasets: [
            {
              data: graphData.map((i) => i[1]), // y axis values
              label: "WPM",
              borderColor: theme.textColor,
            },
          ],
        }}
      />
    </>
  );
};

export default Graph;
