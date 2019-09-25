function DisplayDarkBackground(bActivate){
  if (bActivate == true){
    //Ativa a tela escura.
    if ($("#bgContainer").hasClass("blackBackground") == false){
      $("#bgContainer").addClass("blackBackground");
    }
  }
  else{
    //Desativa a tela escura.
    if ($("#bgContainer").hasClass("blackBackground") == true){
      $("#bgContainer").removeClass("blackBackground");
    }
  }
}

function DisplayLoadAnim(bActivate){
  if (bActivate == true){
    DisplayDarkBackground(true);
    SetHtmlById("bgContainer", "<div class=\"loaderAnim\"></div>");
  }
  else{
    DisplayDarkBackground(false);
    SetHtmlById("bgContainer", null);
  }
}

function IsMainMenuActive(){
  if ($("#menuId").hasClass("mainMenuDeactived")){
    return false;
  }
  else{
    return true;
  }
}

function SetMainMenuState(bActivate){
  if (bActivate == true){
    if (!IsMainMenuActive()){
      $("#menuId").removeClass("mainMenuDeactived");
    }
  }
  else{
    if (IsMainMenuActive()){
      $("#menuId").addClass("mainMenuDeactived");
    }
  }
}

function ShowMainMenuAndBlockScreen(){
  DisplayDarkBackground(true);
  if (!IsMainMenuActive()){
    SetMainMenuState(true);
  }
}


function OnBackgroundTriggered(){
  DisplayLoadAnim(false);
  if (IsMainMenuActive()){
    //Contrair o menu principal
    SetMainMenuState(false);
  }
  //Fecha as caixas de diálogo abertas.
  DisplayDialogBox(false, null, null);
}

/**
 * 
 * @param {boolean} bActivate 
 * @param {function} lpCallback function(dlgBoxId) : retorna string com conteúdo.
 * @param {string} dlgBoxId ID da caixa de diálogo.
 */
function DisplayDialogBox(bActivate, lpCallback, dlgBoxId){
  if (bActivate == true){
    SetMainMenuState(false);
    DisplayDarkBackground(true);
    SetHtmlById("bgContainer", "<div onclick=\"event.stopPropagation();\" id=\"" + dlgBoxId + "\" class=\"dialogBoxContainer\">" + lpCallback("dlgBoxId") + "</div>");
  }
  else{
    SetHtmlById("bgContainer", null);
  }
}

/**Retorna quantos dias há em um determinado mês.
 * 
 * @param {number} month Mês
 * @param {number} year Ano
 */
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

const SYS_PAGE_RESERVES           = 0;
const SYS_PAGE_LABORATORIES       = 1;
const SYS_PAGE_ABOUT_CALUPE       = 2;
const SYS_PAGE_PREFERENCES        = 3;
const SYS_PAGE_LABORATORY_POLICY  = 4;
const SYS_PAGE_CONTACT_US         = 5;
const SYS_PAGE_MY_DATA            = 6;

/**Carrega uma página do sistema CALUPE de forma assíncrona, provendo uma boa interação com o usuário.
 * 
 * @param {number} pageId ID da página a ser carregada de forma assíncrona.
 */
function SysLoadPageAsync(pageId) {
  DisplayLoadAnim(true);
  SetMainMenuState(false);
  SetHtmlById("mainframe", null);
  switch (pageId) {
    case SYS_PAGE_RESERVES:
      OpenAjax("../Calupe/static/pages/reservas.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null);
      break;
    case SYS_PAGE_LABORATORIES:
      OpenAjax("../Calupe/static/pages/laboratorios.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null);
      break;
    case SYS_PAGE_ABOUT_CALUPE:
      OpenAjax("../Calupe/static/pages/sobre-o-calupe.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null);
      break;
    case SYS_PAGE_PREFERENCES:
      OpenAjax("../Calupe/static/pages/preferencias.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null);
      break;
    case SYS_PAGE_LABORATORY_POLICY:
      OpenAjax("../Calupe/static/pages/politica-laboratorios.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null);
      break;
    case SYS_PAGE_CONTACT_US:
      OpenAjax("../Calupe/static/pages/fale-conosco.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null);
      break;
    case SYS_PAGE_MY_DATA:
      OpenAjax("../Calupe/static/pages/meus-dados.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null);
      break;
    default:
      OpenAjax("../Calupe/static/pages/erro.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null);
      break;
  }
}

const SYS_DLG_RESERVE_LAB     = 0;
const SYS_DLG_DELETE_RESERVE  = 1;
const SYS_DLG_SELECT_DATE     = 2;
const SYS_DLG_LOGIN_FORM      = 3;

function SysLoadDialogAsync(dlgBoxId){
  switch(dlgBoxId){
    case SYS_DLG_RESERVE_LAB:
      DisplayDialogBox(true, function(){
        return "<strong>Reserva</strong>";
      }, "dlgBoxId".concat(dlgBoxId));
      break;
    case SYS_DLG_DELETE_RESERVE:
        DisplayDialogBox(true, function(){
          return "<strong>Deletar reserva</strong>";
        }, "dlgBoxId".concat(dlgBoxId));
      break;
    case SYS_DLG_SELECT_DATE:
        DisplayDialogBox(true, function(){
          return "<strong>Selecionar data</strong>";
        }, "dlgBoxId".concat(dlgBoxId));
      break;
    case SYS_DLG_LOGIN_FORM:
        DisplayDialogBox(true, function(){
          return "<strong>Login</strong>";
        }, "dlgBoxId".concat(dlgBoxId));
      break;
    default:
      //Exibe a tela de erro inesperado já que nenhum dos diálogos pôde ser criado.
      SysLoadPageAsync(0xffffffff);
      break;
  }
}