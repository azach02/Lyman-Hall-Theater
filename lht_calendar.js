"use strict";

/*
   New Perspectives on HTML5 and CSS3, 7th Edition
   Tutorial 10
   Tutorial Case

   Author: Aaron Zach
   Date: 10/19/23

   Filename: lht_calendar.js
*/

// Set the date to be displayed in the calendar
let thisDay = new Date();

// Write the calendar to the div with the id "calendar"
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

// Definition of the createCalendar() function to generate the calendar table
function createCalendar(calDate) {
  let calendarHTML = "<table id='calendar_table'>";
  calendarHTML += calCaption(calDate);
  calendarHTML += calWeekdayRow();
  calendarHTML += calDays(calDate);
  calendarHTML += "</table>";
  return calendarHTML;
}

// Definition of the calCaption() function to write the calendar caption
function calCaption(calDate) {
  // monthName array contains the list of month names
  let monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // Determine the current month
  let thisMonth = calDate.getMonth();
  // Determine the current year
  let thisYear = calDate.getFullYear();
  // Create the caption
  return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
} // end of calCaption() function

// Definition of the calWeekdayRow() function to write a table row of weekday abbreviations
function calWeekdayRow() {
  // Array of weekday abbreviations
  let dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let rowHTML = "<tr>";
  // Loop through the dayName array and create <th> elements
  for (let i = 0; i < dayName.length; i++) {
    rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
  }

  rowHTML += "</tr>";
  return rowHTML;
}

function daysInMonth(calDate) {
  // Array of days in each month
  let dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // Extract the four-digit year and month value
  let thisYear = calDate.getFullYear();
  let thisMonth = calDate.getMonth();
  // Revise the days in Feb for leap years
  if (thisYear % 4 === 0) {
    if (thisYear % 100 !== 0 || thisYear % 400 === 0) {
      dayCount[1] = 29;
    }
  }
  // Return the number of days for the current month
  return dayCount[thisMonth];
}

// Function to write table rows for each day of the month
function calDays(calDate) {
  // Determine the starting day of the month
  let day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
  let weekDay = day.getDay();
  // Write blank cells preceding the starting day
  let htmlCode = "<tr>";
  for (let i = 0; i < weekDay; i++) {
    htmlCode += "<td></td>";
  }
  // Write cells for each day of the month
  let totalDays = daysInMonth(calDate);
  let highlightDay = calDate.getDate();
  for (let i = 1; i <= totalDays; i++) {
    day.setDate(i);
    weekDay = day.getDay();

    if (weekDay === 0) {
      htmlCode += "<tr>";
    }
    if (i === highlightDay) {
      htmlCode +=
        "<td class='calendar_dates' id='calendar_today'>" + i + dayEvent[i] +"</td>";
    } else {
      htmlCode += "<td class='calendar_dates'>" + i + dayEvent[i] + "</td>";
    }

    if (weekDay === 6 || i === totalDays) {
      htmlCode += "</tr>";
    }
  }
  return htmlCode;
}
