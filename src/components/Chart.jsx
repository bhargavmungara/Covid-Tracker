import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../api";

import styles from "./Chart.module.css";
import { blue } from "@material-ui/core/colors";

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgb(233, 183, 90)",
              "rgb(93, 211, 93)",
              "rgb(235, 74, 74)"
            ],
            hoverBorderWidth: 3,
            hoverBorderColor: "white",
            data: [confirmed.value, recovered.value, deaths.value]
          }
        ]
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                color: "#ffffff54"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                color: "#ffffff54"
              }
            }
          ]
        }
      }}
    />
  ) : null;

  const lineChart = dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(data => data.confirmed),
            label: "INFECTED",
            borderColor: "orange",
            backgroundColor: "rgba(255, 156, 36, 0.25)",
            pointBorderWidth: "5",
            showLine: true,
            fill: true
          },
          {
            data: dailyData.map(data => data.deaths),
            label: "DEATHS",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            pointBorderWidth: "5",
            showLine: true,
            fill: true
          }
        ]
      }}
      options={{
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                color: "#ffffff54"
              }
            }
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                color: "#ffffff54"
              }
            }
          ]
        }
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
