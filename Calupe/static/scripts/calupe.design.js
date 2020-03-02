
//  APIs de gerenciamento da interface gráfica estão contidos nesse arquivo. Utilize as funções aqui descritas sempre que precisar fazer algo, não reinvente a roda!
//  Codificado por Muryllo Pimenta

//Constantes do sistema.

const SYS_PAGE_RESERVES                       = 0;
const SYS_PAGE_LABORATORIES                   = 1;
const SYS_PAGE_ABOUT_CALUPE                   = 2;
const SYS_PAGE_MONITORING                     = 3;
const SYS_PAGE_LABORATORY_POLICY              = 4;
const SYS_PAGE_CONTACT_US                     = 5;
const SYS_PAGE_MY_DATA                        = 6;

const SYS_DLG_RESERVE_LAB                     = 0;
const SYS_DLG_SELECT_DATE                     = 1;
const SYS_DLG_LOGIN_FORM                      = 2;
const SYS_DLG_CUSTOM                          = 3;

const SYS_ERROR_UNKNOWN                       = "sys_error_unknown";
const SYS_ERROR_UNKNOWN_PAGE                  = "sys_error_unknown_page";
const SYS_ERROR_UNKNOWN_DIALOG                = "sys_error_unknown_dialog";
const SYS_ERROR_UNKNOWN_RESERVE               = "sys_error_unknown_reserve";
const SYS_ERROR_UNKNOWN_CREATE_LAB            = "sys_error_unknown_create_lab";
const SYS_ERROR_UNKNOWN_DELETE_LAB            = "sys_error_unknown_delete_lab";
const SYS_ERROR_UNKNOWN_UPDATE_LAB            = "sys_error_unknown_update_lab";
const SYS_ERROR_UNKNOWN_CREATE_USER           = "sys_error_unknown_create_user";
const SYS_ERROR_UNKNOWN_DELETE_USER           = "sys_error_unknown_delete_user";
const SYS_ERROR_UNKNOWN_UPDATE_USER           = "sys_error_unknown_update_user";
const SYS_ERROR_RESERVE_HAS_START_EQUALS_END  = "sys_error_reserve_has_start_equals_end";

//Fim das constantes do sistema.


/**Exibe ou oculta a tela escura de bloqueio de interface.
 * 
 * @param {boolean} bActivate Valor booleano indicando se a tela escura deve ser ativada ou desativada.
 * @param {boolean} bTrigger Valor booleano indicando se a tela escura deve tratar os eventos de click do usuário.
 */
function DisplayDarkBackground(bActivate, bTrigger){
  if (bActivate == true){
    //Ativa a tela escura.
    if ($("#bgContainer").hasClass("blackBackground") == false){
      $("#bgContainer").addClass("blackBackground");
    }
    if (!bTrigger){
      $("#bgContainer").attr("onclick", function(){ return null;});
    }
    else{
      $("#bgContainer").attr("onclick", function(){ return "OnBackgroundTriggered();";});
    }
  }
  else{
    //Desativa a tela escura.
    if ($("#bgContainer").hasClass("blackBackground") == true){
      $("#bgContainer").removeClass("blackBackground");
    }
  }
}

/**Exibe na tela do usuário o efeito de carregamento para indicar que o sistema está realizando uma operação em plano de fundo.
 * 
 * @param {boolean} bActivate Valor booleano para exibir ou ocultar o efeito de carregamento.
 */
function DisplayLoadAnim(bActivate){
  if (bActivate == true){
    DisplayDarkBackground(true, false);
    SetHtmlById("bgContainer", "<div class=\"loaderAnim\"></div>");
  }
  else{
    DisplayDarkBackground(false, true);
    SetHtmlById("bgContainer", null);
  }
}

/**
 * Verifica se o menu lateral está ativo ou não.
 */
function IsMainMenuActive(){
  if ($("#menuId").hasClass("mainMenuDeactived")){
    return false;
  }
  else{
    return true;
  }
}

/**Define o estado do menu lateral principal entre ativado ou desativado.
 * 
 * @param {boolean} bActivate Valor booleano para ativar ou desativa.
 */
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

/**
 * Exibe o menu principal e bloqueia a tela do usuário.
 */
function ShowMainMenuAndBlockScreen(){
  DisplayLoadAnim(false);
  DisplayDarkBackground(true, true);
  if (!IsMainMenuActive()){
    SetMainMenuState(true);
  }
  else{
    OnBackgroundTriggered();
  }
}

/**
 * Evento disparado quando o usuário clica na tela escura que sobrepõe a interface gráfica.
 */
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
 * Evento disparado quando a página de Monitoria é aberta. Verificações adicionais de segurança são realizadas.
 */
function OnMonitoringTriggered() {
  let monPanel = $("#panel");
  if (monPanel != null || typeof monPanel != "undefined") {
    IsAdministrator(Base64DecodeUTF16(LocalStorageManager.GetItem("sk"))).then((bAdm) => {
      if (bAdm == true) {
        let loadPanel = function () {
          monPanel.html("<div class=\"d-flex\"> <button monitor-type=\"users\" class=\"btn btn-outline-secondary mr-2\" type=\"button\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i> Gerenciar usuários</button> <button monitor-type=\"adms\" class=\"btn btn-outline-secondary mr-2\" type=\"button\"><i aria-hidden=\"true\" class=\"fa fa-key\"></i> Administração</button> <button monitor-type=\"labs\" class=\"btn btn-outline-secondary\" type=\"button\"><i aria-hidden=\"true\" class=\"fa fa-desktop\"></i> Gerenciar laboratórios</button></div>");
          let usersMgrBtn = monPanel.find("[monitor-type='users']");
          let admsMgrBtn = monPanel.find("[monitor-type='adms']");
          let labsMgrBtn = monPanel.find("[monitor-type='labs']");
          usersMgrBtn.click(function () {
            let calEvts = new CalupeEvents();
            calEvts.OnRetrieveAllUsers = function (dataObj) {
              //Ao retornar todos os users da database.
              let tableHtml = "<table monitor-type=\"users-table\" class=\"table table-hover table-striped table-sm table-bordered text-center\"><thead class=\"thead-light\"><tr><th scope=\"col\">#</th><th scope=\"col\">Nome</th><th scope=\"col\">Cpf</th><th scope=\"col\">Telefone</th><th scope=\"col\">Criação</th></tr></thead><tbody>";
              for (let k in dataObj) {
                tableHtml += "<tr>";
                tableHtml += "<th scope=\"row\"><i class=\"fa fa-cog fa-1 text-secondary\" aria-hidden=\"true\" user-id=\"" + dataObj[k].id + "\"></i></th>";
                tableHtml += "<td>" + dataObj[k].nome + "</td>";
                tableHtml += "<td>" + dataObj[k].cpf + "</td>";
                tableHtml += "<td>" + dataObj[k].telefone + "</td>";
                tableHtml += "<td>" + ConvertDateTimeToHumanReadableDate(dataObj[k].data_criacao) + "</td>";
                tableHtml += "</tr>";
              }
              tableHtml += "</tbody></table>";
              monPanel.html(tableHtml);
              let gearBtns = $(".fa-cog");
              for (let i = 0; i < gearBtns.length; i++) {
                $(gearBtns[i]).click(() => {
                  let newCalEvts = new CalupeEvents();
                  newCalEvts.OnRetrieveUserById = function (dataObj) {
                    monPanel.html("<div class=\"row\"><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">CPF</b> <input device-type=\"cpfinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"CPF\" disabled=\"disabled\"> <b class=\"text-secondary\">Data de criação</b> <input device-type=\"creationinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Data de criação\" disabled=\"disabled\"> <b class=\"text-secondary\">Email</b> <input device-type=\"emailinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Email\" disabled=\"disabled\"> <b class=\"text-secondary\">Nova senha</b><div class=\"input-group mb-2\"><div class=\"input-group-prepend\"><div class=\"input-group-text\"> <input disabled device-type=\"passwordcheck\" type=\"checkbox\" aria-label=\"Exibir senha\" title=\"Exibir ou ocultar senha\"></div></div> <input disabled device-type=\"passwordinput\" type=\"password\" class=\"form-control\" aria-label=\"Senha\" placeholder=\"Senha\" value=\"Senha\"></div></div></div><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">Nome de usuário</b> <input device-type=\"usernameinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Nome\" disabled=\"disabled\"> <b class=\"text-secondary\">Telefone</b> <input device-type=\"phoneinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Telefone\" disabled=\"disabled\"> <b class=\"text-secondary\">Id da conta</b> <input device-type=\"idinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Id da conta\" disabled=\"disabled\"> <b class=\"text-secondary\">Papéis/permissões</b> <button class=\"btn btn-secondary form-control\" type=\"button\" data-toggle=\"collapse\" data-target=\"#permissions\" aria-expanded=\"false\" aria-controls=\"collapseExample\"><i class=\"fa fa-eye\" aria-hidden=\"true\"></i> Exibir minhas permissões</button><div class=\"collapse\" id=\"permissions\"><div device-type=\"permissions\" class=\"card card-body\"></div></div></div></div></div><div class=\"w-100 border mt-1 mb-2\"></div><div class=\"d-flex w-100 pb-3\"> <button device-type=\"save\" class=\"btn btn-sm btn-success mr-2\" type=\"button\" title=\"Salva as informações alteradas\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Salvar</button> <button device-type=\"back\" class=\"btn btn-sm btn-danger mr-2\" type=\"button\" title=\"Voltar para a outra página\"><i class=\"fa fa-undo\" aria-hidden=\"true\"></i> Voltar</button> <button device-type=\"delete\" class=\"btn btn-sm btn-info mr-2\" type=\"button\" title=\"Apagar o usuário\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Apagar</button> <button device-type=\"edit\" class=\"btn btn-sm btn-primary\" type=\"button\" title=\"Editar usuário\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Editar</button></div>");
                    console.log(dataObj);
                    let userCpf = $("[device-type='cpfinput']");
                    let userCreation = $("[device-type='creationinput']");
                    let userEmail = $("[device-type='emailinput']");
                    let userId = $("[device-type='idinput']");
                    let userName = $("[device-type='usernameinput']");
                    let userPhone = $("[device-type='phoneinput']");
                    let userPass = $("[device-type='passwordinput']");
                    let userPermissions = $("[device-type='permissions']");
                    //Colocando os valores dos campos
                    userCpf.val(dataObj.cpf);
                    userCreation.val(ConvertDateTimeToHumanReadableDate(dataObj.data_criacao));
                    userEmail.val(dataObj.email);
                    userId.val(dataObj.id);
                    userName.val(dataObj.nome);
                    userPhone.val(dataObj.telefone);
                    userId.attr("uid", dataObj.id);
                    let permStr = "<p>";
                    for (let k = 0; k < dataObj.papeis.length; k++) {
                      permStr += "<b class=\"text-secondary\">" + dataObj.papeis[k].nome + "</b><br>";
                      for (let j = 0; j < dataObj.papeis[k].permissoes.length; j++) {
                        permStr += dataObj.papeis[k].permissoes[j].nome + "<br>";
                      }
                    }
                    permStr += "</p>";
                    userPermissions.html(permStr);
                    $("[device-type='save']").click(function(){
                      let calEvts = new CalupeEvents();
                      calEvts.OnUpdateUser = function(data){
                        monPanel.prepend("<div class=\"alert alert-success alert-dismissible fade show mb-2\" role=\"alert\"><span><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Usuário atualizado com sucesso!</span> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button></div>");
                        DisplayLoadAnim(false);
                        SetMainMenuState(false);
                      }
                      calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
                        if (xhr.responseJSON != null && xhr.responseJSON != undefined){
                          SysLoadErrorPageAsync("Erro ao atualizar usuário!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
                        }
                        else{
                          SysLoadErrorPageAsync("Erro ao atualizar usuário!", "Erro desconhecido, por favor reporte na página \"Fale conosco\".", SYS_ERROR_UNKNOWN_UPDATE_USER);
                        }
                      }
                      let sessObj = ReadCurrentSession(Base64DecodeUTF16(LocalStorageManager.GetItem("sk")));
                      CalupeInternalAPI.UpdateUser(calEvts, sessObj.user, sessObj.password, userEmail.val(), userPass.val(), userName.val(), userCpf.val(), userPhone.val(), userId.attr("uid"));
                      DisplayLoadAnim(true);
                      SetMainMenuState(false);
                    });
                    $("[device-type='back']").click(loadPanel);
                    $("[device-type='delete']").click(function(){
                      let calEvts = new CalupeEvents();
                      calEvts.OnDeleteUser = function(data){
                        monPanel.prepend("<div class=\"alert alert-success alert-dismissible fade show mb-2\" role=\"alert\"><span><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Usuário excluído com sucesso!</span> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button></div>");
                        DisplayLoadAnim(false);
                        SetMainMenuState(false);
                      }
                      calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
                        if (xhr.responseJSON != null && xhr.responseJSON != undefined){
                          SysLoadErrorPageAsync("Erro ao excluir usuário!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
                        }
                        else{
                          SysLoadErrorPageAsync("Erro ao excluir usuário!", "Erro desconhecido, por favor reporte na página \"Fale conosco\".", SYS_ERROR_UNKNOWN_DELETE_USER);
                        }
                      }
                      DisplayLoadAnim(true);
                      SetMainMenuState(false);
                      let sessObj = ReadCurrentSession(Base64DecodeUTF16(LocalStorageManager.GetItem("sk")));
                      CalupeInternalAPI.DeleteUser(calEvts, sessObj.user, sessObj.password, userId.attr("uid"));
                    });
                    $("[device-type='edit']").click(function(){
                      userCpf.removeAttr("disabled");
                      userEmail.removeAttr("disabled");
                      userName.removeAttr("disabled");
                      userPhone.removeAttr("disabled");
                      userPass.removeAttr("disabled");
                      $("[device-type='passwordcheck']").removeAttr("disabled");
                      $(this).addClass("disabled");
                      $(this).attr("disabled", true);
                    });
                    $("[device-type='passwordcheck']").click(function(){
                      if (userPass.attr("type").toUpperCase() == "PASSWORD"){
                        userPass.attr("type", "text");
                      }
                      else{
                        userPass.attr("type", "password");
                      }
                    });
                    DisplayLoadAnim(false);
                    SetMainMenuState(false);
                  }
                  newCalEvts.OnRaiseCriticalError = function (dataObj) {
                    //Definir evento de erro
                  }
                  let secretKey = Base64DecodeUTF16(LocalStorageManager.GetItem("sk"));
                  let sessObj = ReadCurrentSession(secretKey);
                  CalupeInternalAPI.RetrieveUserById(newCalEvts, sessObj.user, sessObj.password, $(gearBtns[i]).attr("user-id"));
                  DisplayLoadAnim(true);
                  SetMainMenuState(false);
                });
              }
              $("[monitor-type='users-table']").DataTable({
                "language": {
                  url: "../Calupe/static/json/pt-BR.json"
                }
              });
              DisplayLoadAnim(false);
              SetMainMenuState(false);
            }
            calEvts.OnRaiseCriticalError = function (xhr, ajaxOptions, result) {
              //Ao disparar uma exceção do servidor.
            }
            let secretKey = Base64DecodeUTF16(LocalStorageManager.GetItem("sk"));
            let sessObj = ReadCurrentSession(secretKey);
            CalupeInternalAPI.RetrieveAllUsers(calEvts, sessObj.user, sessObj.password);
            DisplayLoadAnim(true);
            SetMainMenuState(false);
          });
          admsMgrBtn.click(function () {
            //Criar usuário
            //Puxar histórico de reservas de usuário
            monPanel.html("<div class=\"d-flex\"> <button type=\"button\" class=\"btn btn-outline-secondary mr-2\" monitor-type=\"adduser\"><i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i> Criar usuário</button> <button type=\"button\" class=\"btn btn-outline-secondary mr-2\" monitor-type=\"history\"><i class=\"fa fa-book\" aria-hidden=\"true\"></i> Histórico de reservas</button> <button type=\"button\" class=\"btn btn-outline-secondary\" monitor-type=\"back\"><i class=\"fa fa-undo\" aria-hidden=\"true\"></i> Voltar</button></div>");
            $("[monitor-type='adduser']").click(function() {
              SetMainMenuState(false);
              let addUserForm = "<div class=\"row\"><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">Email</b> <input device-type=\"emailinput\" type=\"email\" class=\"form-control mb-2\" placeholder=\"email@example.com\"> <b class=\"text-secondary\">Senha</b><div class=\"input-group mb-2\"><div class=\"input-group-prepend\"><div class=\"input-group-text\"> <input device-type=\"passwordcheck\" type=\"checkbox\" aria-label=\"Exibir senha\" title=\"Exibir ou ocultar senha\"></div></div> <input device-type=\"passwordinput\" type=\"password\" class=\"form-control\" aria-label=\"Senha\" placeholder=\"Senha\" value=\"Senha\"></div> <b class=\"text-secondary\">Nome de usuário</b> <input device-type=\"nameinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Nome Sobrenome\"></div></div><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">Cpf</b> <input device-type=\"cpfinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"12345678999\"> <b class=\"text-secondary\">Telefone</b> <input device-type=\"phoneinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"12345678999\"></div></div></div><div class=\"w-100 border mt-1 mb-2\"></div><div class=\"d-flex w-100 pb-3\"> <button device-type=\"save\" class=\"btn btn-sm btn-success mr-2\" type=\"button\" title=\"Salva as informações do novo usuário\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Salvar</button> <button device-type=\"back\" class=\"btn btn-sm btn-danger mr-2\" type=\"button\" title=\"Voltar para a outra página\"><i class=\"fa fa-undo\" aria-hidden=\"true\"></i> Voltar</button></div>";
              monPanel.html(addUserForm);
              let userEmail = $("[device-type='emailinput']");
              let userPass = $("[device-type='passwordinput']");
              let userName = $("[device-type='nameinput']");
              let userCpf = $("[device-type='cpfinput']");
              let userPhone = $("[device-type='phoneinput']");
              let calEvts = new CalupeEvents();
              calEvts.OnRegisterNewUser = function(data){
                monPanel.prepend("<div class=\"alert alert-success alert-dismissible fade show mb-2\" role=\"alert\"><span><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Usuário cadastrado com sucesso!</span> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button></div>");
                DisplayLoadAnim(false);
                SetMainMenuState(false);
              }
              calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
                if (xhr.responseJSON != null && xhr.responseJSON != undefined){
                  SysLoadErrorPageAsync("Erro ao cadastrar usuário!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
                }
                else{
                  SysLoadErrorPageAsync("Erro ao cadastrar usuário!", "Erro desconhecido, por favor reporte na página \"Fale conosco\".", SYS_ERROR_UNKNOWN_CREATE_USER);
                }
              }
              $("[device-type='save']").click(function(){
                let sessObj = ReadCurrentSession(Base64DecodeUTF16(LocalStorageManager.GetItem("sk")));
                CalupeInternalAPI.RegisterNewUser(calEvts, sessObj.user, sessObj.password, userEmail.val(), userPass.val(), userName.val(), userPhone.val(), userCpf.val());
                DisplayLoadAnim(true);
                SetMainMenuState(false);
              });
              $("[device-type='passwordcheck']").click(function(){
                if (userPass.attr("type").toUpperCase() == "PASSWORD"){
                  userPass.attr("type", "text");
                }
                else{
                  userPass.attr("type", "password");
                }
              });
              $("[device-type='back']").click(loadPanel);
            });
            $("[monitor-type='history']").click(function() {
              SetMainMenuState(false);
              let historySearch = "<div class=\"row\"><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">Ano de início</b> <input device-type=\"startyear\" type=\"number\" class=\"form-control mb-2\" placeholder=\"2019\"> <b class=\"text-secondary\">Mês de início</b> <input device-type=\"startmonth\" type=\"number\" min=\"1\" max=\"12\" class=\"form-control mb-2\" placeholder=\"Mês de início\"></div></div><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">Quantidade de meses</b> <input device-type=\"numbermonthsinput\" type=\"number\" min=\"1\" class=\"form-control mb-2\" placeholder=\"5\"> <b class=\"text-secondary\">Nome do usuário</b> <input device-type=\"usernameinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Nome do Usuário\"></div></div></div><div class=\"mt-1\" device-type=\"progReservs\"></div><div class=\"w-100 border mt-1 mb-2\"></div><div class=\"d-flex w-100 pb-3\"> <button device-type=\"search\" class=\"btn btn-sm btn-info mr-2\" type=\"button\" title=\"Carregar histórico do usuário\"><i class=\"fa fa-search\" aria-hidden=\"true\"></i> Pesquisar</button> <button device-type=\"back\" class=\"btn btn-sm btn-danger mr-2\" type=\"button\" title=\"Voltar para a outra página\"><i class=\"fa fa-undo\" aria-hidden=\"true\"></i> Voltar</button></div>";
              monPanel.html(historySearch);
              let searchButton = $("[device-type='search']");
              let progReservs = $("[device-type='progReservs']");
              progReservs.addClass("invisible");
              ChangeProgressBarValue("progReservs", 0);
              let calEvts = new CalupeEvents();
              calEvts.OnRetrieveReservsByUsernameProgressCallback = function(value, totalValue){
                ChangeProgressBarValue("progReservs", Math.floor(100 * (value / totalValue)));
              }
              calEvts.OnRetrieveReservsByUsernameCompletionCallback = function(reservs){
                console.log(reservs);
                searchButton.removeClass("disabled");
                searchButton.removeAttr("disabled");
                searchButton.text("Pesquisar");
              }
              searchButton.click(function(){
                CalupeInternalAPI.RetrieveReservsByUsername(calEvts, 
                  $("[device-type='startmonth']").val(), 
                  $("[device-type='startyear']").val(), 
                  $("[device-type='numbermonthsinput']").val(), 
                  $("[device-type='usernameinput']").val()
                );
                ChangeProgressBarValue("progReservs", 0);
                if (progReservs.hasClass("invisible") == true){
                  progReservs.removeClass("invisible");
                }
                searchButton.addClass("disabled");
                searchButton.attr("disabled", true);
                searchButton.text("Pesquisando");
              });
            });
            $("[monitor-type='back']").click(loadPanel);
          });
          labsMgrBtn.click(function () {
            //Adicionar
            //Excluir
            //Editar informações
            let calEvts = new CalupeEvents();
            calEvts.OnRetrieveLabs = function(dataObj) {
              let tableHtml = "<table monitor-type=\"labs-table\" class=\"table table-hover table-striped table-sm table-bordered text-center\"><thead class=\"thead-light\"><tr><th scope=\"col\">#</th><th scope=\"col\">Descrição</th><th scope=\"col\">Criação</th><th scope=\"col\">Capacidade</th></tr></thead><tbody>";
              for (let k in dataObj) {
                tableHtml += "<tr>";
                tableHtml += "<th scope=\"row\"><i class=\"fa fa-user-secret fa-1 text-secondary\" aria-hidden=\"true\" lab-id=\"" + dataObj[k].id + "\"></i></th>";
                tableHtml += "<td>" + dataObj[k].descricao + "</td>";
                tableHtml += "<td>" + ConvertDateTimeToHumanReadableDate(dataObj[k].data_criacao) + "</td>";
                tableHtml += "<td>" + dataObj[k].capacidade + "</td>";
                tableHtml += "</tr>";
              }
              tableHtml += "</tbody></table>";
              monPanel.html(tableHtml);
              let spyBtns = $(".fa-user-secret");
              for (let i = 0; i < spyBtns.length; i++){
                $(spyBtns[i]).click(() => {
                  let newCalEvts = new CalupeEvents();
                  newCalEvts.OnRetrieveLabById = function(dataObj){
                    monPanel.html("<div class=\"row\"><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">Descrição do laboratório</b> <input device-type=\"descinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Descrição do laboratório\" disabled=\"disabled\"> <b class=\"text-secondary\">Data de criação</b> <input device-type=\"creationinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Data de criação\" disabled=\"disabled\"></div></div><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">Capacidade</b> <input device-type=\"capacityinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Capacidade do laboratório\" disabled=\"disabled\"> <b class=\"text-secondary\">Id do laboratório</b> <input device-type=\"idinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Id do laboratório\" disabled=\"disabled\"></div></div></div><div class=\"w-100 border mt-1 mb-2\"></div><div class=\"d-flex w-100 pb-3\"> <button device-type=\"save\" class=\"btn btn-sm btn-success mr-2\" type=\"button\" title=\"Salva as informações alteradas\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Salvar</button> <button device-type=\"back\" class=\"btn btn-sm btn-danger mr-2\" type=\"button\" title=\"Voltar para a outra página\"><i class=\"fa fa-undo\" aria-hidden=\"true\"></i> Voltar</button> <button device-type=\"delete\" class=\"btn btn-sm btn-info mr-2\" type=\"button\" title=\"Apagar o laboratório\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Apagar</button> <button device-type=\"edit\" class=\"btn btn-sm btn-primary\" type=\"button\" title=\"Editar laboratório\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Editar</button></div>");
                    let labDesc     = $("[device-type='descinput']");
                    let labCreation = $("[device-type='creationinput']");
                    let labCapacity = $("[device-type='capacityinput']");
                    let labId       = $("[device-type='idinput']");
                    labDesc.val(dataObj.descricao);
                    labCreation.val(dataObj.data_criacao);
                    labCapacity.val(dataObj.capacidade);
                    labId.val(dataObj.id);
                    labId.attr("lab-id", dataObj.id);
                    $("[device-type='save']").click(function(){
                      let calEvts = new CalupeEvents();
                      calEvts.OnUpdateLab = function(data){
                        monPanel.prepend("<div class=\"alert alert-success alert-dismissible fade show mb-2\" role=\"alert\"><span><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Laboratório atualizado com sucesso!</span> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button></div>");
                        DisplayLoadAnim(false);
                        SetMainMenuState(false);
                      }
                      calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
                        if (xhr.responseJSON != null && xhr.responseJSON != undefined){
                          SysLoadErrorPageAsync("Erro ao atualizar laboratório!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
                        }
                        else{
                          SysLoadErrorPageAsync("Erro ao atualizar laboratório!", "Erro desconhecido, por favor reporte na página \"Fale conosco\".", SYS_ERROR_UNKNOWN_UPDATE_LAB);
                        }
                      }
                      let sessObj = ReadCurrentSession(Base64DecodeUTF16(LocalStorageManager.GetItem("sk")));
                      CalupeInternalAPI.UpdateLab(calEvts, sessObj.user, sessObj.password, labDesc.val(), labCapacity.val(), labId.attr("lab-id"));
                      DisplayLoadAnim(true);
                      SetMainMenuState(false);
                    });
                    $("[device-type='back']").click(function(){
                      loadPanel();
                    });
                    $("[device-type='delete']").click(function(){
                      let calEvts = new CalupeEvents();
                      calEvts.OnDeleteLab = function(data){
                        monPanel.prepend("<div class=\"alert alert-success alert-dismissible fade show mb-2\" role=\"alert\"><span><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Laboratório excluído com sucesso!</span> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button></div>");
                        DisplayLoadAnim(false);
                        SetMainMenuState(false);
                      }
                      calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
                        if (xhr.responseJSON != null && xhr.responseJSON != undefined){
                          SysLoadErrorPageAsync("Erro ao excluir laboratório!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
                        }
                        else{
                          SysLoadErrorPageAsync("Erro ao excluir laboratório!", "Erro desconhecido, por favor reporte na página \"Fale conosco\".", SYS_ERROR_UNKNOWN_DELETE_LAB);
                        }
                      }
                      let sessObj = ReadCurrentSession(Base64DecodeUTF16(LocalStorageManager.GetItem("sk")));
                      CalupeInternalAPI.DeleteLab(calEvts, sessObj.user, sessObj.password, labId.attr("lab-id"));
                      DisplayLoadAnim(true);
                      SetMainMenuState(false);
                    });
                    $("[device-type='edit']").click(function(){
                      labDesc.removeAttr("disabled");
                      labCapacity.removeAttr("disabled");
                      $(this).attr("disabled", true);
                      $(this).addClass("disabled");
                    });
                    DisplayLoadAnim(false);
                    SetMainMenuState(false);
                  }
                  newCalEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
                    //Adicionar tratamento de erros aqui
                  }
                  CalupeInternalAPI.RetrieveLabById(newCalEvts, Number($(spyBtns[i]).attr("lab-id")));
                  DisplayLoadAnim(true);
                  SetMainMenuState(false);
                });
              }
              $("[monitor-type='labs-table']").DataTable({
                "language": {
                  url: "../Calupe/static/json/pt-BR.json"
                }
              });
              DisplayLoadAnim(false);
              SetMainMenuState(false);
            }
            calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
              //Tratar erros aqui
            }
            monPanel.html("<div class=\"d-flex\"> <button type=\"button\" class=\"btn btn-outline-secondary mr-2\" monitor-type=\"addlab\"><i class=\"fa fa-plus\" aria-hidden=\"true\"></i> Adicionar laboratório</button> <button type=\"button\" class=\"btn btn-outline-secondary mr-2\" monitor-type=\"querylab\"><i class=\"fa fa-desktop\" aria-hidden=\"true\"></i> Consultar laboratórios</button> <button type=\"button\" class=\"btn btn-outline-secondary\" monitor-type=\"back\"><i class=\"fa fa-undo\" aria-hidden=\"true\"></i> Voltar</button></div>");
            $("[monitor-type='addlab']").click(function(){
              SetMainMenuState(false);
              let addLabForm = "<div class=\"row\"><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">Descrição do laboratório</b> <input device-type=\"descinput\" type=\"text\" class=\"form-control mb-2\" placeholder=\"Lab 1\"></div></div><div class=\"col-sm\"><div class=\"w-100\"> <b class=\"text-secondary\">Capacidade</b> <input device-type=\"capacityinput\" type=\"number\" class=\"form-control mb-2\" placeholder=\"40\"></div></div></div><div class=\"w-100 border mt-1 mb-2\"></div><div class=\"d-flex w-100 pb-3\"> <button device-type=\"save\" class=\"btn btn-sm btn-success mr-2\" type=\"button\" title=\"Salva as informações do novo laboratório\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Salvar</button> <button device-type=\"back\" class=\"btn btn-sm btn-danger mr-2\" type=\"button\" title=\"Voltar para a outra página\"><i class=\"fa fa-undo\" aria-hidden=\"true\"></i> Voltar</button></div>";
              monPanel.html(addLabForm);
              $("[device-type='save']").click(function(){
                let labDesc = $("[device-type='descinput']");
                let labCapacity = $("[device-type='capacityinput']");
                let calEvts = new CalupeEvents();
                calEvts.OnRegisterNewLab = function(data){
                  monPanel.prepend("<div class=\"alert alert-success alert-dismissible fade show mb-2\" role=\"alert\"><span><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Laboratório cadastrado com sucesso!</span> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button></div>");
                  DisplayLoadAnim(false);
                  SetMainMenuState(false);
                }
                calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
                  if (xhr.responseJSON != null && xhr.responseJSON != undefined){
                    SysLoadErrorPageAsync("Erro ao cadastrar laboratório!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
                  }
                  else{
                    SysLoadErrorPageAsync("Erro ao cadastrar laboratório!", "Erro desconhecido, por favor reporte na página \"Fale conosco\".", SYS_ERROR_UNKNOWN_CREATE_LAB);
                  }
                }
                let sessObj = ReadCurrentSession(Base64DecodeUTF16(LocalStorageManager.GetItem("sk")));
                CalupeInternalAPI.RegisterNewLab(calEvts, sessObj.user, sessObj.password, labDesc.val(), labCapacity.val());
                DisplayLoadAnim(true);
                SetMainMenuState(false);
              });
              $("[device-type='back'").click(function(){
                loadPanel();
              });
            });
            $("[monitor-type='querylab']").click(function(){
              DisplayLoadAnim(true);
              SetMainMenuState(false);
              CalupeInternalAPI.RetrieveLabs(calEvts);
            });
            $("[monitor-type='back']").click(loadPanel);
          });
        }
        loadPanel();
      }
      else {
        monPanel.html("<div class=\"alert alert-primary\" role=\"alert\"><i class=\"fa fa-info-circle\" aria-hidden=\"true\"></i> O Painel de Monitoria é reservado à coordenadores e monitores. Caso você seja um monitor, solicite acesso com os administradores do CALUPE.</div>");
      }
    });
  }
}

/**Exibe uma caixa de diálogo para o usuário.
 * 
 * @param {boolean} bActivate Ativar ou desativar caixas de título.
 * @param {function} lpCallback function(dlgBoxId) : retorna string com conteúdo.
 * @param {string} dlgBoxId ID da caixa de diálogo.
 * @param {string} dlgBoxTitle Título da caixa de diálogo.
 */
function DisplayDialogBox(bActivate, lpCallback, dlgBoxId, dlgBoxTitle){
  if (bActivate == true){
    SetMainMenuState(false);
    DisplayDarkBackground(true, true);
    SetHtmlById("bgContainer", "<div onclick=\"event.stopPropagation();\" id=\"" + dlgBoxId + "\" class=\"dialogBoxContainer\"><div class=\"dialogBoxTitle\">" + dlgBoxTitle + "</div>" + lpCallback("dlgBoxId".concat(dlgBoxId)) + "</div>");
  }
  else{
    SetHtmlById("bgContainer", null);
  }
}

/**Carrega as informações do usuário no menu de informações do top da página.
 * 
 * @param {string} displayname Nome do usuário.
 * @param {string} cpf Cpf do usuário.
 * @param {number} id Id do usuário.
 */
function DisplayUserDetails(displayname, cpf, id){
  let userDetails = $("[device-uuid='fa2dba07']");
  userDetails.html(Base64DecodeUTF16("PABkAGkAdgAgAGMAbABhAHMAcwA9ACIAZAAtAGYAbABlAHgAIABhAGwAaQBnAG4ALQBpAHQAZQBtAHMALQBjAGUAbgB0AGUAcgAiAD4AIAA8AHMAbQBhAGwAbAAgAGQAZQB2AGkAYwBlAC0AdQB1AGkAZAA9ACIAOQBiAGEAMgBiAGEAYQBiACIAIABjAGwAYQBzAHMAPQAiAHUAcwBlAHIALQBkAGUAdABhAGkAbABzAC0AdABpAHQAbABlACIAIAB0AGkAdABsAGUAPQAiAFUAcwB1AOEAcgBpAG8AIgA+AFUAcwB1AOEAcgBpAG8AOgAgADwALwBzAG0AYQBsAGwAPgAgADwAcwBtAGEAbABsACAAZABlAHYAaQBjAGUALQB1AHUAaQBkAD0AIgAwADMAOABjADgAYwBmADIAIgAgAGMAbABhAHMAcwA9ACIAdQBzAGUAcgAtAGQAZQB0AGEAaQBsAHMALQB0AGUAeAB0ACIAPgB7AHMAZQBzAHMATwBiAGoALgBuAG8AbQBlAH0APAAvAHMAbQBhAGwAbAA+ADwALwBkAGkAdgA+ADwAZABpAHYAIABjAGwAYQBzAHMAPQAiAGQALQBmAGwAZQB4ACAAYQBsAGkAZwBuAC0AaQB0AGUAbQBzAC0AYwBlAG4AdABlAHIAIgA+ACAAPABzAG0AYQBsAGwAIABkAGUAdgBpAGMAZQAtAHUAdQBpAGQAPQAiADkANgA3ADkAZABhADEAOAAiACAAYwBsAGEAcwBzAD0AIgB1AHMAZQByAC0AZABlAHQAYQBpAGwAcwAtAHQAaQB0AGwAZQAiACAAdABpAHQAbABlAD0AIgBDAHAAZgAiAD4AQwBQAEYAOgAgADwALwBzAG0AYQBsAGwAPgAgADwAcwBtAGEAbABsACAAZABlAHYAaQBjAGUALQB1AHUAaQBkAD0AIgA5AGEANwA3ADgAZAAwADAAIgAgAGMAbABhAHMAcwA9ACIAdQBzAGUAcgAtAGQAZQB0AGEAaQBsAHMALQB0AGUAeAB0ACIAPgB7AHMAZQBzAHMATwBiAGoALgBjAHAAZgB9ADwALwBzAG0AYQBsAGwAPgA8AC8AZABpAHYAPgA8AGQAaQB2ACAAYwBsAGEAcwBzAD0AIgBkAC0AZgBsAGUAeAAgAGEAbABpAGcAbgAtAGkAdABlAG0AcwAtAGMAZQBuAHQAZQByACIAPgAgADwAcwBtAGEAbABsACAAZABlAHYAaQBjAGUALQB1AHUAaQBkAD0AIgA3ADQAMgBmADQAZABlADIAIgAgAGMAbABhAHMAcwA9ACIAdQBzAGUAcgAtAGQAZQB0AGEAaQBsAHMALQB0AGkAdABsAGUAIgAgAHQAaQB0AGwAZQA9ACIASQBkACIAPgBJAGQAOgAgADwALwBzAG0AYQBsAGwAPgAgADwAcwBtAGEAbABsACAAZABlAHYAaQBjAGUALQB1AHUAaQBkAD0AIgA1ADIAZgA4AGIAYwBlAGQAIgAgAGMAbABhAHMAcwA9ACIAdQBzAGUAcgAtAGQAZQB0AGEAaQBsAHMALQB0AGUAeAB0ACIAPgB7AHMAZQBzAHMATwBiAGoALgBpAGQAfQA8AC8AcwBtAGEAbABsAD4APAAvAGQAaQB2AD4APABkAGkAdgAgAGQAZQB2AGkAYwBlAC0AdQB1AGkAZAA9ACIAMAA4AGEAZAA3ADUAOQBhACIAIABjAGwAYQBzAHMAPQAiAGQALQBmAGwAZQB4ACAAagB1AHMAdABpAGYAeQAtAGMAbwBuAHQAZQBuAHQALQBiAGUAdAB3AGUAZQBuACAAYQBsAGkAZwBuAC0AaQB0AGUAbQBzAC0AYwBlAG4AdABlAHIAIABsAG8AZwBvAHUAdAAgAGYAbABvAGEAdAAtAHIAaQBnAGgAdAAiAD4AIAA8AGEAIABoAHIAZQBmAD0AIgBqAGEAdgBhAHMAYwByAGkAcAB0ADoAUwBlAGMAdQByAGUATABvAGcAbwB1AHQAKAApADsAIgA+AFMAYQBpAHIAPAAvAGEAPgAgADwAaQAgAGMAbABhAHMAcwA9ACIAZgBhACAAZgBhAC0AcwBpAGcAbgAtAG8AdQB0ACAAdABlAHgAdAAtAHMAZQBjAG8AbgBkAGEAcgB5ACAAbQBsAC0AMgAgAG0AcgAtADIAIgA+ADwALwBpAD4APAAvAGQAaQB2AD4A"));
  $("[device-uuid='038c8cf2']").text(displayname); //Nome
  $("[device-uuid='9a778d00']").text(cpf); //Cpf
  $("[device-uuid='52f8bced']").text(id); //Id
}

/**Retorna quantos dias há em um determinado mês.
 * 
 * @param {number} month Mês.
 * @param {number} year Ano.
 */
function GetDaysInMonth(month, year){
  return new Date(year, month, 0).getDate();
}

/**Retorna o primeiro índice do primeiro dia da primeira semana de um mês.
 * 
 * @param {number} month Mês.
 * @param {numbr} year Ano.
 */
function GetFirstWeekDay(month, year){
  return new Date(month + "/1/" + year).getDay();
}

/**Retorna uma matriz (array) contendo todos os dias que devem ser preenchidos no calendário de um mês especificado.
 * 
 * @param {number} month Mês.
 * @param {number} year Ano.
 */
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

/**Adiciona um evento ao calendário no dia, mês e ano especificado com a cor especificada além de adicionar as informações do evento.
 * 
 * @param {number} day Dia.
 * @param {number} month Mês.
 * @param {number} year Ano.
 * @param {object} content Conteúdo a ser exibido na caixa de diálogo.
 * @param {string} eventColor Cor em formato bootstrap. Consulte https://getbootstrap.com/docs/4.0/utilities/colors/ (primary, secondary, success, danger, warning, info, light, dark, white).
 * @param {string} title Título da reserva (aparece no post-it).
 * @param {string} evId Id do evento (ou id da reserva, tanto faz).
 * @param {string} containerId Id do container do calendário (ou seja, o id do calendário).
 */
function AddEventInCalendar(day, month, year, content, eventColor, title, evId, containerId) {
  let containerObj = $("#".concat(containerId));
  if (typeof containerObj !== "undefined") {
    for (let k = 0; k < 42; k++) {
      let currObj = $("#day".concat(k));
      if (typeof currObj !== "undefined") {
        if ((currObj.attr("day-uid") == day) && (currObj.attr("month-uid") == month) && (currObj.attr("year-uid") == year)) {
          if (content !== null) {
            $("#day".concat(k) + "Msg").remove();
            let dayContainer = document.getElementById("day".concat(k));
            let pElem = document.createElement("p");
            let evElem = document.createElement("a");
            dayContainer.appendChild(evElem);
            dayContainer.appendChild(pElem);
            $(pElem).addClass("d-sm-none");
            $(pElem).attr("id", "day".concat(k) + "Msg");
            let bootstrapEvColor;
            switch (eventColor.toUpperCase()) {
              case "PRIMARY":
                bootstrapEvColor = "bg-primary";
                break;
              case "SECONDARY":
                bootstrapEvColor = "bg-secondary";
                break;
              case "SUCCESS":
                bootstrapEvColor = "bg-success";
                break;
              case "DANGER":
                bootstrapEvColor = "bg-danger";
                break;
              case "WARNING":
                bootstrapEvColor = "bg-warning";
                break;
              case "INFO":
                bootstrapEvColor = "bg-info";
                break;
              case "LIGHT":
                bootstrapEvColor = "bg-light";
                break;
              case "DARK":
                bootstrapEvColor = "bg-dark";
                break;
              case "WHITE":
                bootstrapEvColor = "bg-white";
                break;
              default:
                bootstrapEvColor = "bg-primary";
            }
            $(evElem).addClass("event d-block p-1 pl-2 pr-2 mb-1 rounded text-truncate small " + bootstrapEvColor + " text-white");
            $(evElem).attr({ "data-content": htmlentities.encode(JSON.stringify(content)), "event-id": evId, "title": title, "href": "javascript:SysShowEventAsync(" + evId + ");" }); //Definir id do evento, título e o json da caixa de dialogo.
            $(evElem).text(title); //Definir título.
            $(evElem).click(function(event){event.stopPropagation();});
            break;
          }
        }
      }
      else {
        break;
      }
    }
  }
}

/**Cria ou adiciona um novo dia no calendário.
 * 
 * @param {number} day Dia.
 * @param {number} month Mês.
 * @param {number} year Ano.
 * @param {string} containerId Id do container do calendário.
 * @param {boolean} bMuted Valor booleano indicando se o dia a ser criado é de um mês diferente do especificado no calendário.
 * @param {string} id Id do novo dia a ser criado no calendário.
 */
function CreateDayInCalendar(day, month, year, containerId, bMuted, id){
  let elem = document.getElementById(containerId).appendChild(document.createElement("div"));
  let h5Elem = document.createElement("h5");
  let spanDateElem = document.createElement("span");
  let smallElem = document.createElement("small");
  let spanLastElem = document.createElement("span");
  let pElem = document.createElement("p");
  h5Elem.appendChild(spanDateElem);
  h5Elem.appendChild(smallElem);
  h5Elem.appendChild(spanLastElem);
  elem.appendChild(h5Elem);
  elem.appendChild(pElem);
  elem.id = id;
  $(elem).addClass("day col-sm p-2 border border-left-0 border-top-0 text-truncate d-sm-inline-block bg-light");
  if (bMuted){
    $(elem).addClass("text-muted d-none");
  }
  if (ConvertToDateTime(day, month, year, 0, 0, 0).getTime() < ConvertToDateTime(new Date().getDate(), new Date().getMonth()+1, new Date().getFullYear(), 0, 0, 0).getTime()){
    $(elem).removeClass("day");
    $(elem).addClass("dayElapsed");
  }
  else{
    $(elem).click(function() {
      SysLoadDialogAsync(SYS_DLG_RESERVE_LAB, day + "/" + secureMonth + "/" + secureYear);
    });
  }
  $(h5Elem).addClass("row align-items-center");
  $(spanDateElem).addClass("date col-1");
  $(smallElem).addClass("col d-sm-none text-center text-muted");
  let nameofDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  let secureMonth = month;
  let secureYear = year;
  if (secureMonth == 0){
    secureMonth = 12;
    secureYear--;
  }
  else{
    if (secureMonth == 13){
      secureMonth = 1;
      secureYear++;
    }
  }
  $(smallElem).text(nameofDays[new Date(secureMonth + "/" + day + "/" + secureYear).getDay()]);
  $(spanLastElem).addClass("col-1");
  $(pElem).addClass("d-sm-none");
  $(pElem).text("Sem reservas");
  $(pElem).attr("id", id + "Msg");
  $(spanDateElem).text(day);
  $(elem).attr({"month-uid": secureMonth, "day-uid": day, "year-uid": secureYear});
}

/**Cria ou redesenha um novo calendário na tela especificada pelo containerId.
 * 
 * @param {number} month Mês.
 * @param {number} year Ano.
 * @param {string} containerId Id do container do calendário.
 */
function CreateCalendar(month, year, containerId){
  //Limpa o html do container
  SetHtmlById(containerId, null);

  //Valida de forma segura os meses e anos.
  let secureLastMonth         = (month-1 == 0 ? 12 : month-1);
  let secureYearOfLastMonth   = (month-1 == 0 ? year-1 : year);
  let secureMonth             = (month == 0 ? 12 : (month == 13 ? 1 : month));
  let secureYear              = (month == 0 ? year-1 : (month == 13 ? year+1 : year));
  let secureNextMonth         = (month+1 == 13 ? 1 : month+1);
  let secureYearOfNextMonth   = (month+1 == 13 ? year+1 : year);

  //Dispõe a matriz de dias em forma de vetor
  let daysArr = new Array();
  let calendarArr = GetCalendarArray(month, year);
  for (let k = 0; k < calendarArr.length; k++){
    for (let x = 0; x < calendarArr[k].length; x++){
      daysArr.push(calendarArr[k][x]);
    }
  }

  let startInPrevious = (daysArr[0] != 1 ? true : false);
  let startInCurrent = (daysArr[0] != 1 ? false : true);

  let FindFirstDays = (days) => {
    let posFirstDays = new Array();
    for (let k = 0; k < days.length; k++){
      if (days[k] == 1){
        posFirstDays.push(k);
      }
    }
    return posFirstDays;
  }

  let count = 0;
  let posFirstDays;
  let endOfPrevious;
  let startOfCurrent;
  let endOfCurrent;
  let startOfNext;
  let endOfNext;

  switch (true) {
    case startInPrevious:
        posFirstDays = FindFirstDays(daysArr);
        endOfPrevious = posFirstDays[0];
        startOfCurrent = posFirstDays[0];
        endOfCurrent = posFirstDays[1];
        startOfNext = posFirstDays[1];
        endOfNext = daysArr.length;
      for (let k = 0; k < endOfPrevious; k++){
        CreateDayInCalendar(daysArr[k], secureLastMonth, secureYearOfLastMonth, containerId, true, "day".concat(k));
        count++;
        if (count % 7 == 0){
          $("#".concat(containerId)).append("<div class=\"w-100\"></div>");
        }
      }
      for (let k = startOfCurrent; k < endOfCurrent; k++){
        CreateDayInCalendar(daysArr[k], secureMonth, secureYear, containerId, false, "day".concat(k));
        count++;
        if (count % 7 == 0){
          $("#".concat(containerId)).append("<div class=\"w-100\"></div>");
        }
      }
      for (let k = startOfNext; k < endOfNext; k++){
        CreateDayInCalendar(daysArr[k], secureNextMonth, secureYearOfNextMonth, containerId, true, "day".concat(k));
        count++;
        if (count % 7 == 0){
          $("#".concat(containerId)).append("<div class=\"w-100\"></div>");
        }
      }
      break;
    case startInCurrent:
      posFirstDays = FindFirstDays(daysArr);
      endOfCurrent = posFirstDays[1];
      startOfNext = posFirstDays[1];
      endOfNext = daysArr.length;
      for (let k = 0; k < endOfCurrent; k++){
        CreateDayInCalendar(daysArr[k], secureMonth, secureYear, containerId, false, "day".concat(k));
        count++;
        if (count % 7 == 0){
          $("#".concat(containerId)).append("<div class=\"w-100\"></div>");
        }
      }
      for (let k = startOfNext; k < endOfNext; k++){
        CreateDayInCalendar(daysArr[k], secureNextMonth, secureYearOfNextMonth, containerId, true, "day".concat(k));
        count++;
        if (count % 7 == 0){
          $("#".concat(containerId)).append("<div class=\"w-100\"></div>");
        }
      }
      break;
  }

  let monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  $("#monthTitle").text(monthNames[secureMonth - 1].concat(" de ") + secureYear);

}

/**Exibe a tela de erro padrão do sistema com detalhes do ocorrido.
 * 
 * @param {string} title Título da mensagem de erro.
 * @param {string} message Mensagem de erro.
 * @param {string} stopCode Código de parada ou código de erro.
 */
function SysLoadErrorPageAsync(title, message, stopCode) {
  OpenAjax("../Calupe/static/pages/erro.html", "GET", function (data) {
    SetHtmlById("mainframe", data);
    DisplayLoadAnim(false);
    SetMainMenuState(false);
    SetHtmlById("errorTitle", title);
    SetHtmlById("errorMsg", "Mensagem: " + message);
    if (stopCode == null || typeof stopCode == "undefined") {
      SetHtmlById("stopCode", "Código de parada: desconhecido.");
    }
    else {
      SetHtmlById("stopCode", "Código de parada: " + stopCode);
    }
  }, null, null, null, null, null, null);
}

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
        CreateCalendar(new Date().getMonth() + 1, new Date().getFullYear(), "reservCalendId");
        let calEvts = new CalupeEvents();
        calEvts.OnRetrieveReservs = function(dataObj){
          for (let k in dataObj){
            let reservDay = new Date(dataObj[k].data_inicio);
            let labColors = {"LAB 1":"info", "LAB 2":"secondary", "LAB 3":"danger"};
            if (dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 1" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 2" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 3"){
              AddEventInCalendar(reservDay.getDate(), reservDay.getMonth()+1, reservDay.getFullYear(), dataObj[k], labColors[dataObj[k]["laboratorio"].descricao.toUpperCase()], dataObj[k].descricao, dataObj[k].id, "reservCalendId");
            }
            else{
              AddEventInCalendar(reservDay.getDate(), reservDay.getMonth()+1, reservDay.getFullYear(), dataObj[k], "danger", dataObj[k].descricao, dataObj[k].id, "reservCalendId");
            }
          }
          DisplayLoadAnim(false);
          SetMainMenuState(false);
          //Verifica se está logado, caso contrário solicita o login.
          if (!SessionState()){
            SysLoadDialogAsync(SYS_DLG_LOGIN_FORM, null);
          }
        }
        calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, data){
          DisplayLoadAnim(false);
          SetMainMenuState(false);
          // if (xhr.responseJSON != null && xhr.responseJSON != undefined){
          //   SysLoadErrorPageAsync("Erro ao carregar as reservas!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
          // }
          // else{
          //   SysLoadErrorPageAsync("Erro ao carregar as reservas!", "Erro desconhecido, favor reporte na seção \"Fale conosco\".", SYS_ERROR_UNKNOWN);
          // }
        }
        CalupeInternalAPI.RetrieveReservs(calEvts, new Date().getMonth() + 1, new Date().getFullYear());
      }, null, null, null, null, null, null);
      break;
    case SYS_PAGE_LABORATORIES:
      OpenAjax("../Calupe/static/pages/laboratorios.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        $("#lab1nav a, #lab2nav a, #lab3nav a").on("click", function(e) {
          e.preventDefault();
          $(this).tab("show");
        });
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null, null, null);
      break;
    case SYS_PAGE_ABOUT_CALUPE:
      OpenAjax("../Calupe/static/pages/sobre-o-calupe.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null, null, null);
      break;
    case SYS_PAGE_MONITORING:
      OpenAjax("../Calupe/static/pages/monitoria.html", "GET", function (data) {
        DisplayLoadAnim(false);
        SetMainMenuState(false);
        if (!SessionState()){
          SetHtmlById("mainframe", "<div class=\"container-fluid\"> <div class=\"alert alert-danger mt-2\" role=\"alert\">Você precisa estar logado(a) para acessar o painel de monitoria!</div></div>");
          SysLoadDialogAsync(SYS_DLG_LOGIN_FORM, null);
        }
        else{
          SetHtmlById("mainframe", data);
          $("#monitoringmenu a").on("click", function(e) {
            e.preventDefault();
            $(this).tab("show");
          });
          OnMonitoringTriggered();
        }
      }, null, null, null, null, null, null);
      break;
    case SYS_PAGE_LABORATORY_POLICY:
      OpenAjax("../Calupe/static/pages/politica-laboratorios.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
      }, null, null, null, null, null, null);
      break;
    case SYS_PAGE_CONTACT_US:
      OpenAjax("../Calupe/static/pages/fale-conosco.html", "GET", function (data) {
        SetHtmlById("mainframe", data);
        DisplayLoadAnim(false);
        SetMainMenuState(false);
        let formPanel = $("[device-type='card-container']");
        $("#contactnav a").on("click", function(e) {
          e.preventDefault();
          $(this).tab("show");
        });
        $("[device-type='submit']").click(function(){
          if (SessionState() == true){
            //Enviar email
            let sessObj = ReadCurrentSession(Base64DecodeUTF16(LocalStorageManager.GetItem("sk")));
            let subject = $("[device-type='subject']").val();
            let reason = $("[device-type='reason']").val();
            let idUpe = $("[device-type='number']").val();
            let details = $("[device-type='details']").val();
            let mailObj = CreateSmtpMailObject([RemoveMailAlias(SERVER_MAIL_ALIAS), sessObj.user], RemoveMailAlias(SERVER_MAIL_ALIAS), "Sistema de Email do CALUPE - " + subject, CreateDefaultCalupeMail(sessObj.user, idUpe, subject, reason, details));
            DisplayLoadAnim(true);
            SetMainMenuState(false);
            SendSmtpMail(mailObj, SERVER_SMTP_TOKEN, (message) => {
              formPanel.prepend("<div class=\"alert alert-success alert-dismissible fade show mb-2\" role=\"alert\"><span><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Sua mensagem foi enviada com sucesso! Dentro de algumas horas ou até no máximo 3 dias uma resposta será enviada por email.</span> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button></div>");
              DisplayLoadAnim(false);
              SetMainMenuState(false);
            }, (errReason) => {
              formPanel.prepend("<div class=\"alert alert-danger alert-dismissible fade show mb-2\" role=\"alert\"><span><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> Um erro ocorreu, parece que nossos servidores de email estão temporariamente indisponíveis. Tente novamente após alguns segundos.</span> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button></div>");
              DisplayLoadAnim(false);
              SetMainMenuState(false);
            });
          }
          else{
            formPanel.prepend("<div class=\"alert alert-danger alert-dismissible fade show mb-2\" role=\"alert\"><span><i class=\"fa fa-exclamation-triangle\" aria-hidden=\"true\"></i> Você precisa estar logado para submeter uma mensagem!</span> <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> <span aria-hidden=\"true\">&times;</span> </button></div>");
          }
        });
      }, null, null, null, null, null, null);
      break;
    case SYS_PAGE_MY_DATA:
      OpenAjax("../Calupe/static/pages/meus-dados.html", "GET", function (data) {
        if (!SessionState()){
          SetHtmlById("mainframe", "<div class=\"container-fluid\"> <div class=\"alert alert-danger mt-2\" role=\"alert\">Você precisa estar logado(a) para acessar os seus dados!</div></div>");
          SysLoadDialogAsync(SYS_DLG_LOGIN_FORM, null);
        }
        else{
          SetHtmlById("mainframe", data);
          let cpfInput = $("[device-type='cpfinput']");
          let creationInput = $("[device-type='creationinput']");
          let emailInput = $("[device-type='emailinput']");
          let idInput = $("[device-type='idinput']");
          let usernameInput = $("[device-type='usernameinput']");
          let passwordCheck = $("[device-type='passwordcheck']");
          let passwordInput = $("[device-type='passwordinput']");
          let phoneInput = $("[device-type='phoneinput']");
          let permissions = $("[device-type='permissions']");
          //Botões
          let saveBtn = $("[device-type='save']");
          let discardBtn = $("[device-type='discard']");
          let mydataCalEvts = new CalupeEvents();
          mydataCalEvts.OnCalupeAuthSuccess = (dataObj) =>{
            /**Carregar os dados aqui, usando dataObj */
            cpfInput.val(dataObj.cpf);
            creationInput.val(ConvertDateTimeToHumanReadableDate(dataObj.data_criacao));
            emailInput.val(dataObj.email);
            idInput.val(dataObj.id);
            usernameInput.val(dataObj.nome);
            passwordInput.val(dataObj.senha);
            phoneInput.val(dataObj.telefone);
            let permStr = "<p>";
            for (let k = 0; k < dataObj.papeis.length; k++){
              permStr += "<b class=\"text-secondary\">" + dataObj.papeis[k].nome + "</b><br>";
              for (let j = 0; j < dataObj.papeis[k].permissoes.length; j++){
                permStr += dataObj.papeis[k].permissoes[j].nome + "<br>";
              }
            }
            permStr += "</p>";
            permissions.html(permStr);
            DisplayLoadAnim(false);
            SetMainMenuState(false);
          }
          mydataCalEvts.OnRaiseCriticalError = (xhr, ajaxOptions, error) => {
            if (xhr.responseJSON != null && xhr.responseJSON != undefined){
              SysLoadErrorPageAsync("Erro ao carregar dados do usuário!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto)
            }
            else{
              SysLoadErrorPageAsync("Erro ao carregar dados do usuário!", "Erro desconhecido, favor reporte na seção \"Fale conosco\".", SYS_ERROR_UNKNOWN);
            }
          }
          passwordCheck.click(() => {
            if (passwordInput.attr("type").toUpperCase() == "PASSWORD"){
              passwordInput.attr("type", "text");
            }
            else{
              passwordInput.attr("type", "password");
            }
          });
          saveBtn.click(() => {
            SysLoadDialogAsync(SYS_DLG_CUSTOM, {bActivate: true, lpContentCallback: function(dlgId){
              return "<div class=\"dialogBoxInnerContainer overflow-auto p-3\" container-id=\"innerDialog\"><div class=\"custom-control custom-switch mt-2\"> <input type=\"checkbox\" class=\"custom-control-input\" id=\"switchconfirm\"> <label class=\"custom-control-label\" for=\"switchconfirm\">Confirmar alteração de dados</label></div><div class=\"d-flex w-100 mt-2\"> <button device-type=\"confirmchange\" class=\"btn btn-sm btn-success w-100 mr-1\" disabled=\"disabled\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Confirmar</button> <button device-type=\"cancelchange\" class=\"btn btn-sm btn-danger w-100 ml-1\"><i class=\"fa fa-ban\" aria-hidden=\"true\"></i> Cancelar</button></div></div>";
            }, title:"Confirmação de alteração de dados"});
            $("#switchconfirm").click(() => {
              if ($("#switchconfirm").prop("checked") == true){
                $("[device-type='confirmchange']").attr("disabled", false);
              }
              else{
                $("[device-type='confirmchange']").attr("disabled", true);
              }
            });
            $("[device-type='confirmchange']").click(() => {
              let newCalEvts = new CalupeEvents();
              newCalEvts.OnUpdateUser = (dataObj) => {
                //Manipular novas informações do usuário,
                //exceto as permissões, essas ele não consegue mudar.
                cpfInput.val(dataObj.cpf);
                emailInput.val(dataObj.email);
                idInput.val(dataObj.id);
                usernameInput.val(dataObj.nome);
                passwordInput.val(dataObj.senha);
                phoneInput.val(dataObj.telefone);
                //Recriar o objeto de sessão do usuário, pois, há a possibilidade dele ter trocado
                //a senha ou o email.
                DestroySession();
                let sKey = Uuid(16);
                LocalStorageManager.DeleteItem("sk");
                LocalStorageManager.SetItem("sk", Base64EncodeUTF16(sKey));
                StartSession(CreateSession(dataObj.email, dataObj.senha, null, sKey));
                DisplayUserDetails(dataObj.nome, dataObj.cpf, dataObj.id);
                DisplayLoadAnim(false);
                SetMainMenuState(false);
              }
              newCalEvts.OnRaiseCriticalError = (xhr, ajaxOptions, result) => {
                if (xhr.responseJSON != null && xhr.responseJSON != undefined){
                  SysLoadErrorPageAsync("Erro ao carregar dados do usuário!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
                }
                else{
                  SysLoadErrorPageAsync("Erro ao carregar dados do usuário!", "Erro desconhecido, favor reporte na seção \"Fale conosco\".", SYS_ERROR_UNKNOWN);
                }
              }
              //Validar entrada do usuário aqui e chamar API de alteração de dados.
              let sKey = Base64DecodeUTF16(LocalStorageManager.GetItem("sk"));
              CalupeInternalAPI.UpdateUser(newCalEvts, ReadCurrentSession(sKey).user, ReadCurrentSession(sKey).password,
              emailInput.val(), passwordInput.val(), usernameInput.val(), cpfInput.val(), phoneInput.val(), idInput.val());
              DisplayLoadAnim(true);
              SetMainMenuState(false);
            });
            $("[device-type='cancelchange']").click(() => {
              DisplayDialogBox(false, null, null, null);
              DisplayLoadAnim(false);
            });
          });
          discardBtn.click(() => {
            SysLoadPageAsync(SYS_PAGE_MY_DATA, null);
          });
          let sKey = Base64DecodeUTF16(LocalStorageManager.GetItem("sk"));
          CalupeInternalAPI.CalupeAuth0(mydataCalEvts, ReadCurrentSession(sKey).user, ReadCurrentSession(sKey).password);
        }
      }, null, null, null, null, null, null);
      break;
    default:
      SysLoadErrorPageAsync("Página inexistente!", "Você está tentando acessar uma página que não existe no nosso sistema. Por favor, desconsidere esse erro e volte a acessar páginas existentes no nosso sistema.", SYS_ERROR_UNKNOWN_PAGE);
      break;
  }
}

/**Cria uma nova caixa de diálogo de forma assíncrona
 * 
 * @param {string} dlgBoxId Id da caixa de diálogo a ser criada.
 * @param {any} objArgs Objeto contendo os parâmetros: { objArgs.bActivate, objArgs.lpContentCallback, objArgs.title }.
 */
function SysLoadDialogAsync(dlgBoxId, objArgs) {
  switch (dlgBoxId) {
    case SYS_DLG_RESERVE_LAB:
      if (SessionState()) {
        DisplayDialogBox(true, function() {
          return "<div class=\"dialogBoxInnerContainer overflow-auto p-3\" container-id=\"innerDialog\"> <b class=\"text-secondary\">Data da reserva:</b><div class=\"pb-2\"> <input device-type=\"datepicker\"></div> <b class=\"text-secondary\">Horário de início:</b><div class=\"input-group date mb-2\"> <input type=\"number\" placeholder=\"Hora\" min=\"0\" max=\"23\" class=\"form-control\" device-type=\"starthour\"> <input type=\"number\" placeholder=\"Minuto\" min=\"0\" max=\"59\" class=\"form-control\" device-type=\"startminute\"><div class=\"input-group-append\"><div class=\"input-group-text\"><i class=\"fa fa-clock-o\"></i></div></div></div> <b class=\"text-secondary\">Horário de término:</b><div class=\"input-group date mb-2\"> <input type=\"number\" placeholder=\"Hora\" min=\"0\" max=\"23\" class=\"form-control\" device-type=\"endhour\"> <input type=\"number\" placeholder=\"Minuto\" min=\"0\" max=\"59\" class=\"form-control\" device-type=\"endminute\"><div class=\"input-group-append\"><div class=\"input-group-text\"><i class=\"fa fa-clock-o\"></i></div></div></div> <b class=\"text-secondary\">Descrição:</b> <input type=\"text\" maxlength=\"32\" placeholder=\"Descrição\" class=\"form-control mb-2\" device-type=\"description\"> <b class=\"text-secondary\">Solicitante:</b> <select device-type=\"requester\" class=\"form-control mb-2\"></select> <b class=\"text-secondary\">Laboratório:</b> <select device-type=\"select\" class=\"form-control mb-2\"><option value=\"1\">Lab. 1 - Lic. em Computação</option><option value=\"2\">Lab. 2 - Escola Aplicação</option><option value=\"3\">Lab. 3 - Eng. de Software</option> </select> <button device-type=\"submit\" class=\"btn btn-primary form-control mb-3\">Solicitar reserva</button></div>";
        }, "dlgBoxId".concat(dlgBoxId), "Reservas de laboratório");
        let beginDate = (new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()) + "/" + (new Date().getMonth()+1 < 10 ? "0" + (new Date().getMonth()+1) : new Date().getMonth()+1) + "/" + new Date().getFullYear();
        if (objArgs != null && typeof objArgs != "undefined"){
          let buffer = objArgs.split("/");
          beginDate = (buffer[0] < 10 ? "0" + buffer[0] : buffer[0]) + "/" + (buffer[1] < 10 ? "0" + buffer[1] : buffer[1]) + "/" + buffer[2];
        }
        let suggestion = CreateIntervalSuggestion();
        $("[device-type='datepicker']").datepicker({
          uiLibrary: "bootstrap4",
          iconsLibrary: "fontawesome",
          minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
          value: beginDate
        });
        $("[device-type='starthour']").val(suggestion[0].starthour);
        $("[device-type='startminute']").val(suggestion[0].startminute);
        $("[device-type='endhour']").val(suggestion[1].endhour);
        $("[device-type='endminute']").val(suggestion[1].endminute);
        $("[device-type='submit']").click(() => {
          $("[device-type='submit']").attr("disabled", true);
          $("[device-type='submit']").text("Processando...");
          //Variáveis contendo os valores dos campos a serem tratados
          let startDate = $("[device-type='datepicker']").val();
          let startHour = $("[device-type='starthour']").val();
          let startMinute = $("[device-type='startminute']").val();
          let endHour = $("[device-type='endhour']").val();
          let endMinute = $("[device-type='endminute']").val();
          let description = $("[device-type='description']").val();
          let requesterId = $("[device-type='requester']").val();
          let labId = $("[device-type='select']").val();
          let buffer = startDate.split("/");
          //Verificando se a hora final é maior que a hora inicial.
          let secureStartHour = (startHour % 24);
          let secureStartMinute = (startMinute % 60);
          let secureEndHour = (endHour % 24);
          let secureEndMinute = (endMinute % 60);
          //Objeto de eventos da API
          let sKey = Base64DecodeUTF16(LocalStorageManager.GetItem("sk"));
          let sessObj = ReadCurrentSession(sKey);
          let calEvts = new CalupeEvents();
          calEvts.OnRetrieveReservs = function(dataObj){
            for (let k in dataObj){
              let reservDay = new Date(dataObj[k].data_inicio);
              let labColors = {"LAB 1":"info", "LAB 2":"secondary", "LAB 3":"danger"};
              if (dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 1" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 2" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 3"){
                AddEventInCalendar(reservDay.getDate(), reservDay.getMonth()+1, reservDay.getFullYear(), dataObj[k], labColors[dataObj[k]["laboratorio"].descricao.toUpperCase()], dataObj[k]["quem_solicitou"].nome, dataObj[k].id, "reservCalendId");
              }
              else{
                AddEventInCalendar(reservDay.getDate(), reservDay.getMonth()+1, reservDay.getFullYear(), dataObj[k], "danger", dataObj[k]["quem_solicitou"].nome, dataObj[k].id, "reservCalendId");
              }
            }
            DisplayLoadAnim(false);
            SetMainMenuState(false);
            //Verifica se está logado, caso contrário solicita o login.
            if (!SessionState()){
              SysLoadDialogAsync(SYS_DLG_LOGIN_FORM, null);
            }
          }
          calEvts.OnRegisterNewReserv = function(dataObj){
            DisplayLoadAnim(true);
            SetMainMenuState(false);
            //Terminar isso aqui
            let DateObj = ConvertToDateTime(buffer[0], buffer[1], buffer[2], 0, 0, 0);
            CreateCalendar(DateObj.getMonth() + 1, DateObj.getFullYear(), "reservCalendId");
            CalupeInternalAPI.RetrieveReservs(calEvts, DateObj.getMonth()+1, DateObj.getFullYear());
            //carregar o mês e ano da reserva feita.
          }
          calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
            if (xhr.responseJSON != null && typeof xhr.responseJSON != "undefined"){
              SysLoadErrorPageAsync("Erro ao criar reserva!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
            }
            else{
              SysLoadErrorPageAsync("Erro ao criar reserva!", "Um erro não catalogado ocorreu ao tentar criar uma nova reserva.", SYS_ERROR_UNKNOWN);
            }
          }
          if ((secureEndHour + (secureEndMinute / 60)) - (secureStartHour + (secureStartMinute / 60)) > 0){
            let DateObj = ConvertToDateTime(buffer[0], buffer[1], buffer[2], 0, 0, 0);
            let newStart = ConvertToDateTime(DateObj.getDate(), DateObj.getMonth()+1, DateObj.getFullYear(), secureStartHour, secureStartMinute, 0);
            let newEnd = ConvertToDateTime(DateObj.getDate(), DateObj.getMonth()+1, DateObj.getFullYear(), secureEndHour, secureEndMinute, 0);
            CalupeInternalAPI.RegisterNewReserv(calEvts, sessObj.user, sessObj.password, requesterId, labId, ConvertToDateTimeString(newStart), ConvertToDateTimeString(newEnd), description);
          }
          else{
            if ((secureEndHour + (secureEndMinute / 60)) - (secureStartHour + (secureStartMinute / 60)) < 0){
              //Passou de um dia para outro a reserva.
              let DateObj = ConvertToDateTime(buffer[0], buffer[1], buffer[2], 0, 0, 0);
              let newStart = ConvertToDateTime(DateObj.getDate(), DateObj.getMonth()+1, DateObj.getFullYear(), secureStartHour, secureStartMinute, 0);
              let numOfDays = GetDaysInMonth(DateObj.getMonth()+1, DateObj.getFullYear());
              let secEndDay = ((DateObj.getDate() + 1) > numOfDays ? 1 : (DateObj.getDate() + 1));
              let secEndMonth = (secEndDay == 1 ? (DateObj.getMonth()+1 + 1 > 12 ? 1 : DateObj.getMonth()+1 + 1) : DateObj.getMonth()+1);
              let secEndYear = (secEndMonth == 1 ? (DateObj.getFullYear()+1) : DateObj.getFullYear());
              let newEnd = ConvertToDateTime(secEndDay, secEndMonth, secEndYear, secureEndHour, secureEndMinute, 0);
              CalupeInternalAPI.RegisterNewReserv(calEvts, sessObj.user, sessObj.password, requesterId, labId, ConvertToDateTimeString(newStart), ConvertToDateTimeString(newEnd), description);
            }
            else{
              SysLoadErrorPageAsync("Erro ao criar reserva!", "Os horários não podem ser iguais.", SYS_ERROR_RESERVE_HAS_START_EQUALS_END);
            }
          }
        });
        let calEvts = new CalupeEvents();
        calEvts.OnRetrieveAllUsers = function(dataObj){
          ReadUserData(Base64DecodeUTF16(LocalStorageManager.GetItem("sk"))).then(function (userData) {
            for (let k = 0; k < dataObj.length; k++) {
              if (dataObj[k].id == userData.id){
                $("[device-type='requester']").prepend("<option selected value=\"" + dataObj[k].id + "\">" + dataObj[k].nome + "</option>");
              }
              else{
                $("[device-type='requester']").append("<option value=\"" + dataObj[k].id + "\">" + dataObj[k].nome + "</option>");
              }
            }
          }).catch(function (reason) {
            SysLoadErrorPageAsync("Erro ao carregar diálogo de reservas!", "Erro desconhecido.", SYS_ERROR_UNKNOWN);
          });
        }
        calEvts.OnRaiseCriticalError = function(xhr, ajaxOpt, result){
          if (xhr.responseJSON != null && typeof xhr.responseJSON != "undefined"){
            SysLoadErrorPageAsync("Erro ao carregar diálogo de reservas!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
          }
          else{
            SysLoadErrorPageAsync("Erro ao carregar diálogo de reservas!", "Erro desconhecido.", SYS_ERROR_UNKNOWN);
          }
        }
        let sKey = Base64DecodeUTF16(LocalStorageManager.GetItem("sk"));
        let sessObj = ReadCurrentSession(sKey);
        let lpAdminCb = async function(){
          let bAdmin = await IsAdministrator(sKey);
          if (bAdmin == true){
            $("[device-type='requester']").attr("disabled", false);
          }
          CalupeInternalAPI.RetrieveAllUsers(calEvts, sessObj.user, sessObj.password);
        }
        lpAdminCb();
      }
      else{
        SysLoadDialogAsync(SYS_DLG_LOGIN_FORM, null);
      }
      break;
    case SYS_DLG_SELECT_DATE:
      DisplayDialogBox(true, function() {
        return "<div class=\"dialogBoxInnerContainer overflow-auto p-3\" container-id=\"innerDialog\"> <b class=\"text-secondary\">Selecione o ano:</b> <input type=\"number\" min=\"2000\" max=\"9999\" class=\"form-control mb-2\" value=\"" + new Date().getFullYear() + "\" device-type=\"yearpicker\"> <b class=\"text-secondary\">Selecione o mês:</b> <select class=\"form-control mb-2\" device-type=\"monthpicker\"><option>Janeiro</option><option>Fevereiro</option><option>Março</option><option>Abril</option><option>Maio</option><option>Junho</option><option>Julho</option><option>Agosto</option><option>Setembro</option><option>Outubro</option><option>Novembro</option><option>Dezembro</option> </select> <button class=\"form-control btn btn-primary\" device-type=\"submit\">Exibir no calendário</button></div>";
      }, "dlgBoxId".concat(dlgBoxId), "Selecionar data no calendário");
      $("[device-type='submit']").click(() => {
        let monthArr = { "JANEIRO": 1, "FEVEREIRO": 2, "MARÇO": 3, "ABRIL": 4, "MAIO": 5, "JUNHO": 6, "JULHO": 7, "AGOSTO": 8, "SETEMBRO": 9, "OUTUBRO": 10, "NOVEMBRO": 11, "DEZEMBRO": 12 };
        let monthSelected = $("[device-type='monthpicker']").val();
        let yearSelected = $("[device-type='yearpicker']").val();
        OpenAjax("../Calupe/static/pages/reservas.html", "GET", function (data) {
          SetHtmlById("mainframe", data);
          CreateCalendar(monthArr[monthSelected.toUpperCase()], yearSelected, "reservCalendId");
          let calEvts = new CalupeEvents();
          calEvts.OnRetrieveReservs = function(dataObj){
            for (let k in dataObj){
              let reservDay = new Date(dataObj[k].data_inicio);
              let labColors = {"LAB 1":"info", "LAB 2":"secondary", "LAB 3":"danger"};
              if (dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 1" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 2" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 3"){
                AddEventInCalendar(reservDay.getDate(), reservDay.getMonth()+1, reservDay.getFullYear(), dataObj[k], labColors[dataObj[k]["laboratorio"].descricao.toUpperCase()], dataObj[k].descricao, dataObj[k].id, "reservCalendId");
              }
              else{
                AddEventInCalendar(reservDay.getDate(), reservDay.getMonth()+1, reservDay.getFullYear(), dataObj[k], "danger", dataObj[k].descricao, dataObj[k].id, "reservCalendId");
              }
            }
            DisplayLoadAnim(false);
            SetMainMenuState(false);
            //Verifica se está logado, caso contrário solicita o login.
            if (!SessionState()){
              SysLoadDialogAsync(SYS_DLG_LOGIN_FORM, null);
            }
          }
          calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, data){
            DisplayLoadAnim(false);
            SetMainMenuState(false);
            //Verifica se está logado, caso contrário solicita o login.
            if (!SessionState()){
              SysLoadDialogAsync(SYS_DLG_LOGIN_FORM, null);
            }
            //if (xhr.responseJSON != null && xhr.responseJSON != undefined){
            //  SysLoadErrorPageAsync("Erro ao carregar as reservas!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto)
            //}
            //else{
            //  SysLoadErrorPageAsync("Erro ao carregar as reservas!", "Erro desconhecido, favor reporte na seção \"Fale conosco\".", SYS_ERROR_UNKNOWN);
            //}
          }
          CalupeInternalAPI.RetrieveReservs(calEvts, monthArr[monthSelected.toUpperCase()], yearSelected);
          OnBackgroundTriggered();
          DisplayLoadAnim(true);
        }, null, null, null, null, null, null);
      });
      break;
    case SYS_DLG_LOGIN_FORM:
      DisplayDialogBox(true, function() {
        return "<div class=\"dialogBoxInnerContainer overflow-auto p-3\" container-id=\"innerDialog\"> <b class=\"text-secondary\">Email</b> <input type=\"text\" class=\"form-control mb-2\" required login-device=\"email\"> <b class=\"text-secondary\">Senha</b> <input type=\"password\" class=\"form-control mb-2\" required login-device=\"password\"><div class=\"custom-control custom-switch mb-2\"> <input type=\"checkbox\" class=\"custom-control-input\" login-device=\"switch\" remember-next=\"false\" id=\"customSwId\"> <label class=\"custom-control-label\" for=\"customSwId\">Lembrar credenciais da próxima vez</label></div> <button class=\"btn btn-primary w-100\" login-device=\"submit\">Fazer login</button></div>";
      }, "dlgBoxId".concat(dlgBoxId), "Faça login no CALUPE");
      $("[login-device='switch']").click(() => {
        ($("[login-device='switch']").attr("remember-next") == "false" ? $("[login-device='switch']").attr("remember-next", "true") : $("[login-device='switch']").attr("remember-next", "false"));
      });
      $("[login-device='submit']").click(() => {
        let rememberNextTime = ($("[login-device='switch']").attr("remember-next") == "true" ? true : false);
        let emailInputDevice = $("[login-device='email']");
        let pwdInputDevice = $("[login-device='password']");
        let userEmail = emailInputDevice.val();
        let userPassword = pwdInputDevice.val();
        let buttonDevice = $("[login-device='submit']");
        buttonDevice.attr("disabled", true);
        buttonDevice.text("Processando...");
        /**Fazendo a requisição para a API do Calupe */
        let calEvts = new CalupeEvents();
        calEvts.OnCalupeAuthSuccess = ((data) => {
          /**Login concluído com sucesso! Gerar sessão de usuário. */
          emailInputDevice.addClass("is-valid");
          pwdInputDevice.addClass("is-valid");
          buttonDevice.attr("disabled", true);
          if (rememberNextTime == true){
            LocalStorageManager.SetItem("lcrd", Base64EncodeUTF16(JSON.stringify({email: userEmail, pass: userPassword})));
          }
          else{
            LocalStorageManager.DeleteItem("lcrd");
          }
          LocalStorageManager.SetItem("scrd", rememberNextTime);
          LocalStorageManager.SetItem("sk", Base64EncodeUTF16(Uuid(16)));
          new Promise(resolve => {
            setTimeout(() => {
              StartSession(CreateSession(userEmail, userPassword, null, Base64DecodeUTF16(LocalStorageManager.GetItem("sk"))));
              DisplayDialogBox(false, null, null, null);
              DisplayLoadAnim(false);
              DisplayUserDetails(data.nome, data.cpf, data.id);
              //Usuário autenticado.
              resolve(null);
            }, 1200);
          });
        });
        calEvts.OnRaiseCriticalError = (() => {
          buttonDevice.attr("disabled", false);
          buttonDevice.text("Fazer login");
          emailInputDevice.addClass("is-invalid");
          pwdInputDevice.addClass("is-invalid");
          new Promise(resolve => {
            setTimeout(() => {
              emailInputDevice.removeClass("is-invalid");
              pwdInputDevice.removeClass("is-invalid");
              //Credenciais incorretas
              resolve(null);
            }, 1200);
          });
        });
        CalupeInternalAPI.CalupeAuth0(calEvts, userEmail, userPassword);
      });
      if ((LocalStorageManager.GetItem("scrd") != null ? LocalStorageManager.GetItem("scrd") : "").toUpperCase() == "TRUE"){
        let usercrd = JSON.parse(Base64DecodeUTF16(LocalStorageManager.GetItem("lcrd")));
        $("[login-device='email']").val(usercrd.email);
        $("[login-device='password']").val(usercrd.pass);
        $("[login-device='switch']").attr("remember-next", true);
        $("[login-device='switch']").prop("checked", true);
      }
      break;
    case SYS_DLG_CUSTOM:
      if (objArgs != null || typeof objArgs != "undefined"){
        DisplayDialogBox(objArgs.bActivate, objArgs.lpContentCallback, "dlgBoxId".concat(dlgBoxId), objArgs.title);
      }
      break;
    default:
      //Exibe a tela de erro inesperado já que nenhum dos diálogos pôde ser criado.
      SysLoadErrorPageAsync("Caixa de diálogo inexistente!", "Por algum motivo desconhecido, uma tentativa de abrir uma caixa de diálogo inexistente ocorreu e o sistema parou. Talvez esse erro tenha ocorrido devido a uma atualização do sistema. Contante na página \"Fale conosco\".", SYS_ERROR_UNKNOWN_DIALOG);
      break;
  }
}

/**Mostra o evento (ou reserva) em detalhes numa caixa de diálogo.
 * 
 * @param {string} evId Id do evento (id da reserva).
 */
function SysShowEventAsync(evId) {
  let ev = $("a[event-id='" + evId + "']");
  if (ev != null && typeof ev != "undefined") {
    let dataContent = JSON.parse(htmlentities.decode(ev.attr("data-content")));
    let contentArr = [dataContent.id, 
                      (dataContent.expirado ? "sim" : "não"), 
                      dataContent["quem_reservou"].nome, 
                      dataContent["quem_solicitou"].nome,
                      dataContent.descricao,
                      ConvertDateTimeToHumanReadableDate(dataContent.data_criacao), 
                      ConvertDateTimeToHumanReadableDate(dataContent.data_inicio), 
                      ConvertDateTimeToHumanReadableDate(dataContent.data_fim), 
                      dataContent["laboratorio"].capacidade, 
                      dataContent["laboratorio"].descricao];
    let lpCallback = function (dlgboxId) {
      let items = [ "Id da reserva", "Expirou", "Quem reservou", "Quem solicitou", "Descrição",
                    "Solicitado", "Início da reserva", "Fim da reserva", "Capacidade", "Laboratório" ];
      let contentStr = "";
      for (let k = 0; k < items.length; k++) {
        if (k == 8 || k == 2 || k == 5){
          contentStr += "<div class=\"w-100 border-bottom mb-2 mt-1\"></div>";
        }
        contentStr += "<span class=\"text-secondary\"><b>" + items[k] + ":</b> " + contentArr[k] + "</span><br>";
      }
      /**
       * @param {string} requesterName Quem fez a reserva.
       */
      let asyncCheckAuthority = async function(whoRequested){
        if (SessionState()){
          let secretKey = Base64DecodeUTF16(LocalStorageManager.GetItem("sk"));
          let userData = await ReadUserData(secretKey);
          if (await IsAdministrator(secretKey) || (whoRequested.toUpperCase() == userData.nome.toUpperCase())){
            $("[device-type='inner-container']").append("<div class=\"w-100 mb-2\"><div class=\"w-100 border-bottom mb-2 mt-1\"></div> <button device-type=\"edit\" class=\"btn btn-primary btn-sm\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Editar</button> <button device-type=\"delete\" class=\"btn btn-danger btn-sm\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Excluir</button></div>");
          }
          else{
            $("[device-type='inner-container']").append("<div class=\"w-100 mb-2\"><div class=\"w-100 border-bottom mb-2 mt-1\"></div> <button disabled device-type=\"edit\" class=\"btn btn-primary btn-sm\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Editar</button> <button disabled device-type=\"delete\" class=\"btn btn-danger btn-sm\"><i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i> Excluir</button></div>");
          }
          let editBtn = $("[device-type='edit']");
          let deleteBtn = $("[device-type='delete']");
          deleteBtn.click(function(){
            deleteBtn.text("Excluindo...");
            deleteBtn.attr("disabled", true);
            let calEvts = new CalupeEvents();
            let newcalEvts = new CalupeEvents();
            newcalEvts.OnRetrieveReservs = function(dataObj){
              for (let k in dataObj){
                let reservDay = new Date(dataObj[k].data_inicio);
                let labColors = {"LAB 1":"info", "LAB 2":"secondary", "LAB 3":"danger"};
                if (dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 1" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 2" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 3"){
                  AddEventInCalendar(reservDay.getDate(), reservDay.getMonth()+1, reservDay.getFullYear(), dataObj[k], labColors[dataObj[k]["laboratorio"].descricao.toUpperCase()], dataObj[k]["quem_solicitou"].nome, dataObj[k].id, "reservCalendId");
                }
                else{
                  AddEventInCalendar(reservDay.getDate(), reservDay.getMonth()+1, reservDay.getFullYear(), dataObj[k], "danger", dataObj[k]["quem_solicitou"].nome, dataObj[k].id, "reservCalendId");
                }
              }
              DisplayLoadAnim(false);
              SetMainMenuState(false);
              //Verifica se está logado, caso contrário solicita o login.
              if (!SessionState()){
                SysLoadDialogAsync(SYS_DLG_LOGIN_FORM, null);
              }
            }
            newcalEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, data){
              DisplayLoadAnim(false);
              SetMainMenuState(false);
            }
            calEvts.OnDeleteReserv = function(data){
              DisplayLoadAnim(true);
              SetMainMenuState(false);
              let DateObj = new Date(dataContent.data_inicio);
              CreateCalendar(DateObj.getMonth() + 1, DateObj.getFullYear(), "reservCalendId");
              CalupeInternalAPI.RetrieveReservs(newcalEvts, DateObj.getMonth()+1, DateObj.getFullYear());
            }
            calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, data){
              DisplayLoadAnim(false);
              SetMainMenuState(false);
              if (xhr.responseJSON != null && typeof xhr.responseJSON != "undefined") {
                SysLoadErrorPageAsync("Erro ao excluir uma reserva!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
              }
              else {
                SysLoadErrorPageAsync("Erro ao excluir uma reserva!", "Erro desconhecido, favor reporte na seção \"Fale conosco\".", SYS_ERROR_UNKNOWN);
              }
            }
            let sessObj = ReadCurrentSession(secretKey);
            CalupeInternalAPI.DeleteReserv(calEvts, sessObj.user, sessObj.password, dataContent.id);
          });
          editBtn.click(function () {
            //Adicionar html na caixa de diálogo
            let pfCallback = function (idDlg) {
              return "<div device-type=\"inner-container\" class=\"dialogBoxInnerContainer p-3\"> <b class=\"text-secondary\">Nova data da reserva:</b><div class=\"mb-2\"> <input type=\"text\" class=\"form-control\" device-type=\"startdate\"></div> <b class=\"text-secondary\">Novo horário de início:</b><div class=\"input-group date mb-2\"> <input type=\"number\" placeholder=\"Hora\" min=\"0\" max=\"23\" class=\"form-control\" device-type=\"starthour\"> <input type=\"number\" placeholder=\"Minuto\" min=\"0\" max=\"59\" class=\"form-control\" device-type=\"startminute\"><div class=\"input-group-append\"><div class=\"input-group-text\"><i class=\"fa fa-clock-o\"></i></div></div></div> <b class=\"text-secondary\">Novo horário de término:</b><div class=\"input-group date mb-2\"> <input type=\"number\" placeholder=\"Hora\" min=\"0\" max=\"23\" class=\"form-control\" device-type=\"endhour\"> <input type=\"number\" placeholder=\"Minuto\" min=\"0\" max=\"59\" class=\"form-control\" device-type=\"endminute\"><div class=\"input-group-append\"><div class=\"input-group-text\"><i class=\"fa fa-clock-o\"></i></div></div></div> <b class=\"text-secondary\">Nova descrição:</b> <input type=\"text\" class=\"form-control\" maxlength=\"32\" placeholder=\"Nova descrição\" device-type=\"description\"> <b class=\"text-secondary\">Novo solicitante:</b> <select device-type=\"requester\" class=\"form-control mb-2\"></select> <b class=\"text-secondary\">Novo laboratório:</b> <select device-type=\"select\" class=\"form-control mb-2\"><option value=\"1\">Lab. 1 - Lic. em Computação</option><option value=\"2\">Lab. 2 - Escola Aplicação</option><option value=\"3\">Lab. 3 - Eng. de Software</option> </select><div class=\"d-flex\"> <button device-type=\"edit\" class=\"btn btn-success form-control mb-3 btn-sm mr-1\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i> Alterar</button> <button device-type=\"cancel\" class=\"btn btn-danger form-control mb-3 btn-sm ml-1\"><i class=\"fa fa-ban\" aria-hidden=\"true\"></i> Cancelar</button></div></div>";
            }
            SysLoadDialogAsync(SYS_DLG_CUSTOM, { bActivate: true, lpContentCallback: pfCallback, title: "Evento: " + ev.attr("title") });
            $("[device-type='starthour']").val(new Date(dataContent.data_inicio).getHours());
            $("[device-type='startminute']").val(new Date(dataContent.data_inicio).getMinutes());
            $("[device-type='endhour']").val(new Date(dataContent.data_fim).getHours());
            $("[device-type='endminute']").val(new Date(dataContent.data_fim).getMinutes());
            $("[device-type='description']").val(dataContent.descricao);
            $("[device-type='startdate']").datepicker({
              uiLibrary: "bootstrap4",
              iconsLibrary: "fontawesome",
              minDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
              value:  ConvertDateTimeToDatePickerFormat(new Date(dataContent.data_inicio))
            });
            $("[device-type='cancel']").click(OnBackgroundTriggered);
            $("[device-type='edit']").click(function() {
              $("[device-type='edit']").attr("disabled", true);
              $("[device-type='cancel']").attr("disabled", true);
              $("[device-type='edit']").text("Processando...");
              //Variáveis contendo os valores dos campos a serem tratados
              let startDate = $("[device-type='startdate']").val();
              let startHour = $("[device-type='starthour']").val();
              let startMinute = $("[device-type='startminute']").val();
              let endHour = $("[device-type='endhour']").val();
              let endMinute = $("[device-type='endminute']").val();
              let requesterId = $("[device-type='requester']").val();
              let description = $("[device-type='description']").val();
              let labId = $("[device-type='select']").val();
              let buffer = startDate.split("/");
              //Verificando se a hora final é maior que a hora inicial.
              let secureStartHour = (startHour % 24);
              let secureStartMinute = (startMinute % 60);
              let secureEndHour = (endHour % 24);
              let secureEndMinute = (endMinute % 60);
              let sKey = Base64DecodeUTF16(LocalStorageManager.GetItem("sk"));
              let sessObj = ReadCurrentSession(sKey);
              //Objeto de eventos da API
              let calEvts = new CalupeEvents();
              calEvts.OnRetrieveReservs = function (dataObj) {
                for (let k in dataObj) {
                  let reservDay = new Date(dataObj[k].data_inicio);
                  let labColors = { "LAB 1": "info", "LAB 2": "secondary", "LAB 3": "danger" };
                  if (dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 1" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 2" || dataObj[k]["laboratorio"].descricao.toUpperCase() == "LAB 3") {
                    AddEventInCalendar(reservDay.getDate(), reservDay.getMonth() + 1, reservDay.getFullYear(), dataObj[k], labColors[dataObj[k]["laboratorio"].descricao.toUpperCase()], dataObj[k]["quem_solicitou"].nome, dataObj[k].id, "reservCalendId");
                  }
                  else {
                    AddEventInCalendar(reservDay.getDate(), reservDay.getMonth() + 1, reservDay.getFullYear(), dataObj[k], "danger", dataObj[k]["quem_solicitou"].nome, dataObj[k].id, "reservCalendId");
                  }
                }
                DisplayLoadAnim(false);
                SetMainMenuState(false);
                //Verifica se está logado, caso contrário solicita o login.
                if (!SessionState()) {
                  SysLoadDialogAsync(SYS_DLG_LOGIN_FORM, null);
                }
              }
              calEvts.OnUpdateReserv = function (dataObj) {
                DisplayLoadAnim(true);
                SetMainMenuState(false);
                //Terminar isso aqui
                let DateObj = ConvertToDateTime(buffer[0], buffer[1], buffer[2], 0, 0, 0);
                CreateCalendar(DateObj.getMonth() + 1, DateObj.getFullYear(), "reservCalendId");
                CalupeInternalAPI.RetrieveReservs(calEvts, DateObj.getMonth() + 1, DateObj.getFullYear());
                //carregar o mês e ano da reserva feita.
              }
              calEvts.OnRaiseCriticalError = function (xhr, ajaxOptions, result) {
                if (xhr.responseJSON != null && typeof xhr.responseJSON != "undefined") {
                  SysLoadErrorPageAsync("Erro ao criar reserva!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
                }
                else {
                  SysLoadErrorPageAsync("Erro ao criar reserva!", "Um erro não catalogado ocorreu ao tentar criar uma nova reserva.", SYS_ERROR_UNKNOWN);
                }
              }
              if ((secureEndHour + (secureEndMinute / 60)) - (secureStartHour + (secureStartMinute / 60)) > 0) {
                let DateObj = ConvertToDateTime(buffer[0], buffer[1], buffer[2], 0, 0, 0);
                let newStart = ConvertToDateTime(DateObj.getDate(), DateObj.getMonth() + 1, DateObj.getFullYear(), secureStartHour, secureStartMinute, 0);
                let newEnd = ConvertToDateTime(DateObj.getDate(), DateObj.getMonth() + 1, DateObj.getFullYear(), secureEndHour, secureEndMinute, 0);
                CalupeInternalAPI.UpdateReserv(calEvts, sessObj.user, sessObj.password, ConvertToDateTimeString(newStart), ConvertToDateTimeString(newEnd), requesterId, labId, Number(evId), description);
              }
              else {
                if ((secureEndHour + (secureEndMinute / 60)) - (secureStartHour + (secureStartMinute / 60)) < 0) {
                  //Passou de um dia para outro a reserva.
                  let DateObj = ConvertToDateTime(buffer[0], buffer[1], buffer[2], 0, 0, 0);
                  let newStart = ConvertToDateTime(DateObj.getDate(), DateObj.getMonth() + 1, DateObj.getFullYear(), secureStartHour, secureStartMinute, 0);
                  let numOfDays = GetDaysInMonth(DateObj.getMonth() + 1, DateObj.getFullYear());
                  let secEndDay = ((DateObj.getDate() + 1) > numOfDays ? 1 : (DateObj.getDate() + 1));
                  let secEndMonth = (secEndDay == 1 ? (DateObj.getMonth() + 1 + 1 > 12 ? 1 : DateObj.getMonth() + 1 + 1) : DateObj.getMonth() + 1);
                  let secEndYear = (secEndMonth == 1 ? (DateObj.getFullYear() + 1) : DateObj.getFullYear());
                  let newEnd = ConvertToDateTime(secEndDay, secEndMonth, secEndYear, secureEndHour, secureEndMinute, 0);
                  CalupeInternalAPI.UpdateReserv(calEvts, sessObj.user, sessObj.password, ConvertToDateTimeString(newStart), ConvertToDateTimeString(newEnd), requesterId, labId, Number(evId), description);
                }
                else {
                  SysLoadErrorPageAsync("Erro ao criar reserva!", "Os horários não podem ser iguais.", SYS_ERROR_RESERVE_HAS_START_EQUALS_END);
                }
              }
            });
            let sessObj = ReadCurrentSession(secretKey);
            let calEvts = new CalupeEvents();
            calEvts.OnRetrieveAllUsers = function(dataObj){
              let requesterField = $("[device-type='requester']");
              for (let k = 0; k < dataObj.length; k++){
                if (dataObj[k].email.toUpperCase() == sessObj.user.toUpperCase()){
                  requesterField.prepend("<option selected value=\"" + dataObj[k].id + "\">" + dataObj[k].nome + "</option>");
                }
                else{
                  requesterField.append("<option value=\"" + dataObj[k].id + "\">" + dataObj[k].nome + "</option>");
                }
              }
            }
            calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
              if (xhr.responseJSON != null && typeof xhr.responseJSON != "undefined") {
                SysLoadErrorPageAsync("Erro ao carregar diálogo de edição de reserva!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
              }
              else {
                SysLoadErrorPageAsync("Erro ao carregar diálogo de edição de reserva!", "Erro desconhecido, favor reporte na seção \"Fale conosco\".", SYS_ERROR_UNKNOWN);
              }
            }
            CalupeInternalAPI.RetrieveAllUsers(calEvts, sessObj.user, sessObj.password);
          });
        }
      }
      asyncCheckAuthority(dataContent["quem_reservou"].nome);
      return "<div device-type=\"inner-container\" class=\"dialogBoxInnerContainer p-2\">" + contentStr + "</div>";
    };
    SysLoadDialogAsync(SYS_DLG_CUSTOM, { bActivate: true, lpContentCallback: lpCallback, title: "Evento: " + ev.attr("title") });
  }
  else {
    SysLoadErrorPageAsync("Evento inexistente!", "A reserva acessada pode ter sido removida do nosso sistema pois não conseguimos exibir nenhuma informação sobre ela.", SYS_ERROR_UNKNOWN_RESERVE);
  }
}

/**
 * Finaliza a sessão do usuário de forma segura e planejada.
 */
function SecureLogout(){
  SysLoadDialogAsync(SYS_DLG_CUSTOM, {bActivate: true, lpContentCallback: function(){ return "<div class=\"dialogBoxInnerContainer overflow-auto p-3\" container-id=\"innerDialog\"><div class=\"custom-control custom-switch mt-2\"> <input type=\"checkbox\" class=\"custom-control-input\" id=\"switchconfirm\"> <label class=\"custom-control-label\" for=\"switchconfirm\">Marque a opção para sair com segurança</label></div><div class=\"d-flex w-100 mt-2\"> <button class=\"btn btn-sm btn-success w-100 mr-1\" disabled=\"disabled\" device-type=\"confirmlogout\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i> Sair</button> <button class=\"btn btn-sm btn-danger w-100 ml-1\" device-type=\"cancellogout\"><i class=\"fa fa-ban\" aria-hidden=\"true\"></i> Cancelar</button></div></div>";}, title:"Confirmação de logout"});
  $("#switchconfirm").click(() => {
    if ($("#switchconfirm").prop("checked") == true){
      $("[device-type='confirmlogout']").attr("disabled", false);
    }
    else{
      $("[device-type='confirmlogout']").attr("disabled", true);
    }
  });
  $("[device-type='confirmlogout']").click(() => {
    if (SessionState()){
      //Destrói a sessão do usuário.
      DestroySession();
      SysLoadPageAsync(SYS_PAGE_RESERVES);
    }
    let nameTitle = $("[device-uuid='9ba2baab']");
    let nameText = $("[device-uuid='038c8cf2']");
    let cpfTitle = $("[device-uuid='9679da18']");
    let cpfText = $("[device-uuid='9a778d00']");
    let idTitle = $("[device-uuid='742f4de2']");
    let idText = $("[device-uuid='52f8bced']");
    let logoutBtn = $("[device-uuid='08ad759a']");
    nameTitle.remove();
    nameText.remove();
    cpfTitle.remove();
    cpfText.remove();
    idTitle.remove();
    idText.remove();
    logoutBtn.remove();
  });
  $("[device-type='cancellogout']").click(() => {
    DisplayDialogBox(false, null, null, null);
    DisplayLoadAnim(false);
  });
}

/**Eventos da interface gráfica */

/**Página completamente carregada. */
$(function(){
  SysLoadPageAsync(SYS_PAGE_RESERVES);
  if (SessionState()){
    let sessObj = ReadCurrentSession(Base64DecodeUTF16(LocalStorageManager.GetItem("sk")));
    let calEvts = new CalupeEvents();
    calEvts.OnCalupeAuthSuccess = function(dataObj){
      //Todo here...
      DisplayUserDetails(dataObj.nome, dataObj.cpf, dataObj.id);
    }
    calEvts.OnRaiseCriticalError = function(xhr, ajaxOptions, result){
      DisplayLoadAnim(false);
      SetMainMenuState(false);
      if (xhr.responseJSON != null && typeof xhr.responseJSON != "undefined") {
        SysLoadErrorPageAsync("Erro ao carregar detalhes de usuário!", GetMessageString(xhr.responseJSON.texto), xhr.responseJSON.texto);
      }
      else {
        SysLoadErrorPageAsync("Erro ao carregar detalhes de usuário!", "Erro desconhecido, favor reporte na seção \"Fale conosco\".", SYS_ERROR_UNKNOWN);
      }
    }
    CalupeInternalAPI.CalupeAuth0(calEvts, sessObj.user, sessObj.password);
  }
});