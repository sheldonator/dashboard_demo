import $ from "jquery";
import Popper from "popper.js";
import "bootstrap";
import Chart from "chart.js";

window.$ = $;
window.jQuery = $;
window.Popper = Popper;

//initialise
$(document).ready(function () {
  GetInitialData();
});

//bar
function initialiseBar(barData) {
  var ctxB = document.getElementById("barChart")?.getContext("2d");
  if (ctxB !== undefined) {
    var myBarChart = new Chart(ctxB, {
      type: "bar",
      data: {
        labels: [
          "Development",
          "Out of Print",
          "Production",
          "Published",
          "Reprint",
          "Transferred"
        ],
        datasets: [
          {
            label: "# of Titles",
            data: [
              barData.filter((obj) => {
                return obj.smartStatus === 0;
              }).length,
              barData.filter((obj) => {
                return obj.smartStatus === 1;
              }).length,
              barData.filter((obj) => {
                return obj.smartStatus === 2;
              }).length,
              barData.filter((obj) => {
                return obj.smartStatus === 3;
              }).length,
              barData.filter((obj) => {
                return obj.smartStatus === 4;
              }).length,
              barData.filter((obj) => {
                return obj.smartStatus === 5;
              }).length
            ],
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
        legend: {
          display: false
        }
      }
    });

    $("#barTotal").html(barData.length);

    document.getElementById("barChart").onclick = function (evt) {
      var activePoints = myBarChart.getElementsAtEvent(evt);
      if (activePoints.length > 0) {
        var clickedElementindex = activePoints[0]["_index"];
        var label = myBarChart.data.labels[clickedElementindex];
        var color =
          myBarChart.data.datasets[0].borderColor[clickedElementindex];
        GetStatusData(clickedElementindex, label, color);
      }
    };
  }
}

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

  document.getElementById("pieChart").onclick = function (evt) {
    var activePoints = myPieChart.getElementsAtEvent(evt);
    if (activePoints.length > 0) {
      var clickedElementindex = activePoints[0]["_index"];
      var label = myPieChart.data.labels[clickedElementindex];
      //var value = myPieChart.data.datasets[0].data[clickedElementindex];
      var color =
        myPieChart.data.datasets[0].backgroundColor[clickedElementindex];
      //showModal(label, color);
    }
  };
}

//data
//window.basicDataUrl = "/data/basic";
window.basicDataUrl = "/data/basicdata.json";

function GetInitialData() {
  $.getJSON(window.basicDataUrl, function (d) {
    initialiseBar(d);
  });
}

function GetStatusData(status, label, color) {
  $.getJSON(window.basicDataUrl, function (d) {
    var data = d.filter((obj) => {
      return obj.smartStatus === status;
    });
    if (data.length === 0) {
      $("#modalBody").html("<p>No titles for this status</p>");
    } else {
      var html =
        "<div><table><tr><th>Title</th><th>Target Pub Date</th></tr><tbody>";
      data.forEach((element) => {
        var date = new Date(element.targetPubDate);
        html +=
          "<tr><td>" +
          element.name +
          "</td><td>" +
          date.toLocaleDateString("en-GB") +
          "</td></tr>";
      });
      html += "</tbody></table></div>";
      $("#modalBody").html(html);
    }
    $("#modalTitle").text(label);
    $("#modalTitle")
      .parent()
      .css("background-color", color)
      .css("color", "#fff");
    $("#exampleModal").modal("show");
  });
}

// function getData(id, data) {
//   $.getJSON(`/data/data_${id}.json`, function (d) {
//     data = d;
//   });
// }
