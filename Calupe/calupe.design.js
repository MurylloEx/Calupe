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