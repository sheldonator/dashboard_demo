import $ from "jquery";
import Popper from "popper.js";
import "bootstrap";
import Chart from "chart.js";
import tinycolor from "tinycolor2";

window.$ = $;
window.jQuery = $;
window.Popper = Popper;

//initialise
$(document).ready(function () {
  GetInitialData();
  $("#back").on("click", function () {
    $("#pie").hide();
    $("#bar").show();
  });
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
function initialisePie(pieData) {
  var ctxP = document.getElementById("pieChart")?.getContext("2d");
  if (ctxP !== undefined) {
    var colors = pieData.resources.map((obj) => {
      return GetRandomColor(obj, pieData.resources.indexOf(obj));
    });
    var myPieChart = new Chart(ctxP, {
      type: "pie",
      data: {
        labels: pieData.resources.map((obj) => {
          return obj.name;
        }),
        datasets: [
          {
            data: pieData.resources.map((obj) => {
              return obj.tasks.length;
            }),
            backgroundColor: colors,
            hoverBackgroundColor: colors.map((c) => {
              return tinycolor(c).lighten().toHexString();
            })
          }
        ]
      },
      options: {
        legend: {
          position: "right"
        }
      }
    });

    document.getElementById("pieChart").onclick = function (evt) {
      var activePoints = myPieChart.getElementsAtEvent(evt);
      if (activePoints.length > 0) {
        var clickedElementindex = activePoints[0]["_index"];
        var label = myPieChart.data.labels[clickedElementindex];
        var color =
          myPieChart.data.datasets[0].backgroundColor[clickedElementindex];
        GetTaskData(label, color);
      }
    };
  }

  $("#pieTotal").html(
    pieData.resources.reduce(function (total, r) {
      return total + r.tasks.length;
    }, 0)
  );
}

function GetRandomColor(obj, i) {
  var defaultColors = ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"];
  if (defaultColors.length > i) return defaultColors[i];
  return tinycolor.random().toHexString();
}

//data
function GetBasicDataUrl() {
  //return "/data/basic";
  return "/data/basicdata.json";
}

function GetTitleDataUrl(id) {
  //return "/data/" + id;
  return "/data/data_" + id + ".json";
}

function GetInitialData() {
  $.getJSON(GetBasicDataUrl(), function (d) {
    initialiseBar(d);
  });
}

function GetStatusData(status, label, color) {
  $.getJSON(GetBasicDataUrl(), function (d) {
    var data = d.filter((obj) => {
      return obj.smartStatus === status;
    });
    if (data.length === 0) {
      $("#modalBody").html("<p>No titles for this status</p>");
    } else {
      var table = GenerateTable(["Title", "Target Pub Date"]);
      data.forEach((element) => {
        var row = GenerateTitleTableRow(element);
        table.find("tbody").append(row);
      });

      $("#modalBody").html(table);
    }
    $("#modalTitle").text(label);
    $("#modalTitle")
      .parent()
      .css("background-color", color)
      .css("color", "#fff");
    $("#exampleModal").modal("show");
  });
}

function GenerateTable(headers) {
  var table = document.createElement("table");
  var headerRow = document.createElement("tr");
  headers.forEach((header) => {
    var headerCell = document.createElement("th");
    headerCell.innerText = header;
    headerRow.appendChild(headerCell);
  });
  table.appendChild(headerRow);
  table.appendChild(document.createElement("tbody"));

  return $(table);
}

function GenerateTitleTableRow(element) {
  var row = $(document.createElement("tr"));
  var date = new Date(element.targetPubDate);
  var titleCell = $(document.createElement("td"));
  titleCell.addClass("title");
  titleCell.text(element.name);
  titleCell.on("click", function () {
    GetTitleData(element.id);
  });
  var dateCell = document.createElement("td");
  dateCell.innerText = date.toLocaleDateString("en-GB");
  dateCell.className = "date";
  row.append(titleCell);
  row.append(dateCell);

  return row;
}

function GetTitleData(id) {
  $.getJSON(GetTitleDataUrl(id), function (d) {
    initialisePie(d);
    $("#bar").hide();
    $("#pieId").val(id);
    $("#pie").show();
    $("#exampleModal").modal("hide");
  });
}

function GetTaskData(resource, color) {
  $.getJSON(GetTitleDataUrl($("#pieId").val()), function (d) {
    var data = d.resources.find((obj) => {
      return obj.name === resource;
    }).tasks;
    if (data.length === 0) {
      $("#modalBody").html("<p>No tasks for this resource</p>");
    } else {
      var table = GenerateTable(["Task", "Start Date", "End Date", "Type"]);
      data.forEach((element) => {
        var row = GenerateTaskTableRow(element);
        table.find("tbody").append(row);
      });

      $("#modalBody").html(table);
    }
    $("#modalTitle").text(resource);
    $("#modalTitle")
      .parent()
      .css("background-color", color)
      .css("color", "#fff");
    $("#exampleModal").modal("show");
  });
}

function GenerateTaskTableRow(element) {
  var row = $(document.createElement("tr"));

  var taskCell = $(document.createElement("td"));
  taskCell.text(element.name);
  row.append(taskCell);

  var startDate =
    element.startDate == null
      ? "-"
      : new Date(element.startDate).toLocaleDateString("en-GB");
  var startDateCell = document.createElement("td");
  startDateCell.innerText = startDate;
  startDateCell.className = "date";
  row.append(startDateCell);

  var endDate =
    element.endDate == null
      ? "-"
      : new Date(element.endDate).toLocaleDateString("en-GB");
  var endDateCell = document.createElement("td");
  endDateCell.innerText = endDate;
  endDateCell.className = "date";
  row.append(endDateCell);

  var typeCell = document.createElement("td");
  typeCell.innerText = element.type === 0 ? "Phase" : "To Do";
  row.append(typeCell);

  return row;
}
