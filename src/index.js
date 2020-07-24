import $ from "jquery";
import Popper from "popper.js";
import "bootstrap";
import "chart.js";

window.$ = $;
window.jQuery = $;
window.Popper = Popper;

var showModal = function(label, value, color) {
  $("#modalTitle").text(label);
  $("#modalTitle")
    .parent()
    .css("background-color", color)
    .css("color", "#fff");
  $("#modalBody").text(value);
  $("#exampleModal").modal("show");
};

//pie
var ctxP = document.getElementById("pieChart")?.getContext("2d");
if (ctxP !== undefined) {
  var myPieChart = new Chart(ctxP, {
    type: "pie",
    data: {
      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
      datasets: [
        {
          data: [300, 50, 100, 40, 120],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774"
          ]
        }
      ]
    },
    options: {
      responsive: true
    }
  });

  document.getElementById("pieChart").onclick = function(evt) {
    var activePoints = myPieChart.getElementsAtEvent(evt);
    if (activePoints.length > 0) {
      var clickedElementindex = activePoints[0]["_index"];
      var label = myPieChart.data.labels[clickedElementindex];
      var value = myPieChart.data.datasets[0].data[clickedElementindex];
      var color =
        myPieChart.data.datasets[0].backgroundColor[clickedElementindex];
      showModal(label, value, color);
    }
  };
}

//bar
var ctxB = document.getElementById("barChart")?.getContext("2d");
if (ctxB !== undefined) {
  var myBarChart = new Chart(ctxB, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  document.getElementById("barChart").onclick = function(evt) {
    var activePoints = myBarChart.getElementsAtEvent(evt);
    if (activePoints.length > 0) {
      var clickedElementindex = activePoints[0]["_index"];
      var label = myBarChart.data.labels[clickedElementindex];
      var value = myBarChart.data.datasets[0].data[clickedElementindex];
      var color =
        myBarChart.data.datasets[0].backgroundColor[clickedElementindex];
      showModal(label, value, color);
    }
  };
}

//horizontal bar
var ctxH = document.getElementById("horizontalBar")?.getContext("2d");
if (ctxH !== undefined) {
  var myHorizontalBar = new Chart(ctxH, {
    type: "horizontalBar",
    data: {
      labels: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"],
      datasets: [
        {
          label: "My First Dataset",
          data: [22, 33, 55, 12, 86, 23, 14],
          fill: false,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)"
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  document.getElementById("horizontalBar").onclick = function(evt) {
    var activePoints = myHorizontalBar.getElementsAtEvent(evt);
    if (activePoints.length > 0) {
      var clickedElementindex = activePoints[0]["_index"];
      var label = myHorizontalBar.data.labels[clickedElementindex];
      var value = myHorizontalBar.data.datasets[0].data[clickedElementindex];
      var color =
        myHorizontalBar.data.datasets[0].backgroundColor[clickedElementindex];
      showModal(label, value, color);
    }
  };
}

//doughnut
var ctxD = document.getElementById("doughnutChart")?.getContext("2d");
if (ctxD !== undefined) {
  var myDoughnutChart = new Chart(ctxD, {
    type: "doughnut",
    data: {
      labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
      datasets: [
        {
          data: [300, 50, 100, 40, 120],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774"
          ]
        }
      ]
    },
    options: {
      responsive: true
    }
  });

  document.getElementById("doughnutChart").onclick = function(evt) {
    var activePoints = myDoughnutChart.getElementsAtEvent(evt);
    if (activePoints.length > 0) {
      var clickedElementindex = activePoints[0]["_index"];
      var label = myDoughnutChart.data.labels[clickedElementindex];
      var value = myDoughnutChart.data.datasets[0].data[clickedElementindex];
      var color =
        myDoughnutChart.data.datasets[0].backgroundColor[clickedElementindex];
      showModal(label, value, color);
    }
  };
}
