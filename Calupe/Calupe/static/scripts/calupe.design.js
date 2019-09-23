function changeMenuState(){
  if ($("#menuId").hasClass("mainMenuDeactived")){
    //Expandir o menu lateral
    $("#menuId").removeClass("mainMenuDeactived");
    $("#bgContainer").addClass("blackBackground");
  }
  else{
    //Contrair o menu principal
    $("#menuId").addClass("mainMenuDeactived");
    $("#bgContainer").removeClass("blackBackground");
  }
}

function GetDaysInMonth(month, year){
  return new Date(year, month, 0).getDate();
}

function GetFirstWeekDay(month, year){
  return new Date(month + "/1/" + year).getDay();
}

function GetCalendarArray(month, year){
  let firstWeekDay = GetFirstWeekDay(month, year);
  let daysInMonth = GetDaysInMonth(month, year);
  let paddingRight = 7 - (firstWeekDay + 1);

  let calendarArr = new Array(6);
  for (let k = 0; k < 6; k++){
    calendarArr[k] = new Array(7);
  }
  let currentDay = 0;
  let currentWeek = 0;
  for (let k = firstWeekDay; k < firstWeekDay + paddingRight+1; k++){
    currentDay += 1;
    calendarArr[0][k] = currentDay;
  }
  currentWeek += 1;
  let remainingWeeks = ((daysInMonth - currentDay) - ((daysInMonth - currentDay) % 7)) / 7;
  let freeDays = (daysInMonth - currentDay) % 7;
  for (let k = 1; k < remainingWeeks + 1; k++){
    currentWeek += 1;
    for (let w = 0; w < 7; w++){
      currentDay += 1;
      calendarArr[k][w] = currentDay;
    }
  }
  for (let k = 0; k < freeDays; k++){
    currentDay += 1;
    calendarArr[currentWeek][k] = currentDay;
  }
  currentDay += 1;

  let currentDayNextMonth = 0;
  for (let k = freeDays; k < 7; k++){
    currentDayNextMonth += 1;
    calendarArr[currentWeek][k] = currentDayNextMonth;
  }
  currentWeek += 1;

  if (currentWeek < 6){
    for (let w = currentWeek; w < 6; w++){
      for (let k = 0; k < 7; k++){
        currentDayNextMonth += 1;
        calendarArr[w][k] = currentDayNextMonth; 
      }
    }
  }

  let currentDayLastMonth = GetDaysInMonth(month - 1, year) - (7 - paddingRight) + 1;
  for (let k = 0; k < firstWeekDay; k++){
    currentDayLastMonth +=1;
    calendarArr[0][k] = currentDayLastMonth;
  }

  return calendarArr;
}

console.log(GetCalendarArray(11, 2019));



OpenAjax("../Calupe/static/pages/reservas.html", "GET", function(data){
  SetHtmlById("mainframe", data);
  //$("#mainframe").append(data);
}, null, null, null, null);