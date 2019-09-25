var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = Base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64
            } else if (isNaN(i)) {
                a = 64
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9+/=]/g, "");
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = s << 2 | o >> 4;
            r = (o & 15) << 4 | u >> 2;
            i = (u & 3) << 6 | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r)
            }
            if (a != 64) {
                t = t + String.fromCharCode(i)
            }
        }
        t = Base64._utf8_decode(t);
        return t
    },
    _utf8_encode: function(e) {
        e = e.replace(/rn/g, "n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r)
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128)
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128)
            }
        }
        return t
    },
    _utf8_decode: function(e) {
        var t = "";
        var n = 0;
        var r = c1 = c2 = 0;
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++
            } else if (r > 191 && r < 224) {
                c2 = e.charCodeAt(n + 1);
                t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                n += 2
            } else {
                c2 = e.charCodeAt(n + 1);
                c3 = e.charCodeAt(n + 2);
                t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                n += 3
            }
        }
        return t
    }
}

/**
 * Programado por Muryllo 31/08/2019 às 23:41
 */
var CookieSessionManager = {
    /**
     * Cria um cookie.
     * 
     * @param {string} cookieName 
     * @param {string} cookieValue 
     * @param {number} cookieDurationInMsec 
     * @param {string} cookiePath 
     */
    SetCookie: function(cookieName, cookieValue, cookieDurationInMsec, cookiePath){
        var date = new Date();
        date.setTime(date.getTime() + cookieDurationInMsec);
        if (this.GetCookie(cookieName) == null){
            document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toUTCString() + "; path=" + cookiePath + ";";
        }
    },
    /**
     * Retorna o valor contido em um cookie.
     * 
     * @param {string} cookieName 
     */
    GetCookie: function(cookieName){
        var cookies = document.cookie.split(";");
        for (k = 0; k < cookies.length; k++){
            var cookieTmp = cookies[k].trim();
            if (cookieTmp.indexOf(cookieName) == 0){
                return cookieTmp.substring(cookieName.length+1, cookieTmp.length);
            }
        }
        return null;
    },
    /**
     * Deleta um cookie.
     * 
     * @param {string} cookieName 
     * @param {string} cookiePath 
     */
    DeleteCookie: function(cookieName, cookiePath){
        var date = new Date();
        date.setTime(date.getTime() - 100*365*24*60*60*1000);
        document.cookie = cookieName + "=; expires=" + date.toUTCString() + "; path=" + cookiePath + ";";
    }
}

/**
 * Transforma em Base64 a string username e password n vezes onde o retorno é igual a um JSON reutilizável.
 * 
 * RETORNO: JSON OBJETO CONTENDO A SESSÃO.
 * 
 * Programado por Muryllo 29/08/2019 às 19:04.
 * 
 * @param {string} user Usuário (email do usuário).
 * @param {string} password Senha da conta do usuário.
 * @param {number} n Número de iterações de codificação em Base64 das credenciais.
 * @param {*} reserved Parâmetro reservado, deve passar NULL.
 */
function CreateSession(user, password, n, reserved){
    let encUser = user;
    let encPass = password;
    for (k = 0; k < n; k++){
        encUser = Base64.encode(encUser);
        encPass = Base64.encode(encPass);
    }
    return JSON.stringify({
        ul: encUser.length,
        pl: encPass.length,
        crd: Base64.encode(encUser.concat(encPass)),
        reserved1: reserved
    });
}

/**
 * Inicia uma nova sessão de usuário a partir de um objeto de sessão.
 * 
 * @param {JSON} sessionObject Objeto contendo a sessão do usuário.
 */
function StartSession(sessionObject){
    let sessObj = JSON.parse(sessionObject);
    let ulc = sessObj.ul;
    let plc = sessObj.pl;
    CookieSessionManager.SetCookie("crd", sessObj.crd, 0x5265C00, "/");
    CookieSessionManager.SetCookie("ul", ulc, 0x5265C00, "/");
    CookieSessionManager.SetCookie("pl", plc, 0x5265C00, "/");
    CookieSessionManager.SetCookie("reserv1", sessObj.reserved1, 0x5265C00, "/");
}
/**
 * Lê a sessão atual e retorna um objeto contendo as credenciais do usuário.
 * 
 * @param {number} n Número de iterações de codificação em Base64 das credenciais.
 */
function ReadCurrentSession(n){
    let __ul = CookieSessionManager.GetCookie("ul");
    let __pl = CookieSessionManager.GetCookie("pl");
    let __crd = Base64.decode(CookieSessionManager.GetCookie("crd"));
    let __user = __crd.substr(0, __ul);
    let __pass = __crd.substr(__ul, __pl);
    for (k = 0; k < n; k++){
        __user = Base64.decode(__user);
        __pass = Base64.decode(__pass);
    }
    return {
        user: __user,
        password: __pass,
        reserved1: CookieSessionManager.GetCookie("reserv1")
    };
}

/**
 * Destrói a sessão do usuário.
 */
function DestroySession(){
    CookieSessionManager.DeleteCookie("crd", "/");
    CookieSessionManager.DeleteCookie("ul", "/");
    CookieSessionManager.DeleteCookie("pl", "/");
    CookieSessionManager.DeleteCookie("reserv1", "/");
}

/**
 * Retorna o texto associado a qualquer erro interno do Calupe.
 * 
 * Programado por Muryllo e Emílio
 * 
 * @param {*} message A mensagem de status retornada pelo Calupe.
 */
function GetMessageString(message){
    if (typeof(message) == "string"){
        switch (message.toUpperCase()){

            // --> USUÁRIOS <--
            //Codificado 26/08/19 às 21:36 por Muryllo
            //Note que a tradução pode ter ficado ambígua.
            //Função carece de revisão pela equipe.
            case "calupe.api.msg.error.user.adm.cannot.be.deleted".toUpperCase():
                return "Administradores não podem ser excluídos.";
            case "calupe.api.msg.error.user.cpf.is.invalid".toUpperCase():
                return "O CPF do usuário é inválido.";
            case "calupe.api.msg.error.user.cpf.is.not.blank".toUpperCase():
                return "O CPF do usuário não pode estar em branco.";
            case "calupe.api.msg.error.user.cpf.is.unique.value".toUpperCase():
                return "O CPF não pode ser um valor único.";
            case "calupe.api.msg.error.user.credentials.has.wrong".toUpperCase():
                return "Credenciais de autenticação incorretas.";
            case "calupe.api.msg.error.user.credentials.should.be.informed".toUpperCase():
                return "Credenciais de autenticação devem ser fornecidas.";
            case "calupe.api.msg.error.user.email.is.invalid".toUpperCase():
                return "Endereço de email inválido, informe um email que seja válido.";
            case "calupe.api.msg.error.user.email.is.not.blank".toUpperCase():
                return "Endereço de email não pode estar em branco. Forneça um email válido.";
            case "calupe.api.msg.error.user.email.is.unique.value".toUpperCase():
                return "Endereço de email não pode ser um valor único. Forneça um email no formato example@mail.com.";
            case "calupe.api.msg.error.user.has.relationships".toUpperCase():
                return "Há correlacionamento.";
            case "calupe.api.msg.error.user.is.deactivated".toUpperCase():
                return "O usuário está desativado ou inativo. Solicite mais informações a algum administrador do Calupe.";
            case "calupe.api.msg.error.user.name.is.not.blank".toUpperCase():
                return "O nome de usuário não pode estar em branco.";
            case "calupe.api.msg.error.user.not.confirmed".toUpperCase():
                return "A conta de usuário não foi confirmada, confirme sua conta para utilizar o Calupe.";
            case "calupe.api.msg.error.user.not.found".toUpperCase():
                return "Usuário não existe.";
            case "calupe.api.msg.error.user.operation.not.himself".toUpperCase():
                return "Tentativa de operação sobre si mesmo não permitida.";
            case "calupe.api.msg.error.user.operation.only.himself".toUpperCase():
                return "Operação só pode ser feita sobre si mesmo.";
            case "calupe.api.msg.error.user.password.is.not.blank".toUpperCase():
                return "A senha não pode estar em branco.";
            case "calupe.api.msg.error.user.password.must.be.5.or.more.characters".toUpperCase():
                return "A senha precisa ter no mínimo 5 ou mais caracteres.";
            case "calupe.api.msg.error.user.phone.is.not.blank".toUpperCase():
                return "Número de telefone não pode estar em branco.";
            case "calupe.api.msg.error.user.roles.item.not.found".toUpperCase():
                return "Funções ou atribuições de usuário não encontradas.";
            case "calupe.api.msg.error.user.unauthenticated".toUpperCase():
                return "Usuário não está autenticado.";
            case "calupe.api.msg.error.user.unauthorized".toUpperCase():
                return "Usuário não autorizado. Acesso negado.";
            case "calupe.api.msg.error.user.without.credentials".toUpperCase():
                return "Usuário sem credenciais.";
            case "calupe.api.msg.success.user.was.removed".toUpperCase():
                return "Usuário foi removido com sucesso.";
            case "calupe.api.msg.warning.user.list.is.empty".toUpperCase():
                return "Atenção! Lista de usuários está vazia.";
            case "calupe.api.msg.warning.user.no.has.been.removed".toUpperCase():
                return "Atenção! O usuário não foi removido.";
            
            // --> FILTROS <--
            //Codificado 26/08/19 às 22:03 por Muryllo.
            //Note que a tradução pode ter ficado ambígua.
            //Função carece de revisão pela equipe.
            case "calupe.api.msg.error.invalid.token".toUpperCase():
                return "Token inválido de API.";
            case "calupe.api.msg.error.method.only.available.for.mobile".toUpperCase():
                return "Erro interno da API. Este método é disponível apenas para mobile.";
            case "calupe.api.msg.error.method.only.available.for.portal".toUpperCase():
                return "Erro interno da API. Este método é disponível apenas para o portal.";
            case "calupe.api.msg.error.resource.method.without.permission.alias".toUpperCase():
                return "Método de recurso sem \"alias\" de permissão.";
            case "calupe.api.msg.error.unauthorized.token".toUpperCase():
                return "Token não autorizado de API.";
            case "calupe.api.msg.error.uniformed.token".toUpperCase():
                return "Token não informado à API.";
            case "calupe.api.msg.error.uri.key.not.found".toUpperCase():
                return "Chave de URI não encontrada.";
            case "calupe.api.msg.error.uri.key.type.not.support".toUpperCase():
                return "Tipo de chave não suportada nessa URI.";
            case "calupe.api.msg.error.uri.param.not.found".toUpperCase():
                return "Parâmetro não encontrado na URI.";

            // --> LABORATÓRIOS <--
            //Codificado por Emílio dia 26/08/19.
            //Note que a tradução pode ter ficado ambígua.
            //Função carece de revisão pela equipe.
            case "calupe.api.msg.error.laboratory.maximum.capacity.is.not.blank".toUpperCase():
                return "A capacidade máxima do laboratório não pode ficar em branco.";
            case "calupe.api.msg.error.laboratory.name.is.not.blank".toUpperCase():
                return "O nome do laboratório não pode ficar em branco.";
            case "calupe.api.msg.error.laboratory.name.is.unique.value".toUpperCase():
                return "Laboratório não tem um nome válido.";
            case "calupe.api.msg.error.laboratory.not.found".toUpperCase():
                return "Laboratório não encontrado.";
            case "calupe.api.msg.success.laboratory.was.removed".toUpperCase():
                return "Laboratório removido com sucesso.";
            case "calupe.api.msg.warning.laboratory.list.is.empty".toUpperCase():
                return "Atenção! A lista de laboratórios está vazia.";
            case "calupe.api.msg.warning.laboratory.no.has.been.removed".toUpperCase():
                return "Atenção! Laboratório não foi removido.";
            
            // --> RESERVAS <--
            //Codificado por Emílio dia 26/08/19.
            //Note que a tradução pode ter ficado ambígua.
            //Função carece de revisão pela equipe.
            case "calupe.api.msg.error.reservation.date.end.is.not.blank".toUpperCase():
                return "A data final não está em branco.";
            case "calupe.api.msg.error.reservation.date.end.must.be.after.current".toUpperCase():
                return "A data de reserva final deve ser após a data atual.";
            case "calupe.api.msg.error.reservation.date.start.is.not.blank".toUpperCase():
                return "A data de reserva inicial não pode estar em branco.";
            case "calupe.api.msg.error.reservation.date.start.must.be.after.current".toUpperCase():
                return "O inicio da data da reserva deve ser depois da data atual.";
            case "calupe.api.msg.error.reservation.duration.is.greater.than.maximum".toUpperCase():
                return "A duração da reserva não deve estender o tempo máximo.";
            case "calupe.api.msg.error.reservation.duration.is.less.than.minimum".toUpperCase():
                return "A duração da reserva não deve ser inferior ao tempo mínimo.";
            case "calupe.api.msg.error.reservation.is.disabled".toUpperCase():
                return "A reserva está indisponível.";
            case "calupe.api.msg.error.reservation.key.not.found".toUpperCase():
                return "A chave de reserva não foi encontrada.";
            case "calupe.api.msg.error.reservation.laboratory.date.start.must.be.before.end".toUpperCase():
                return "A data de início da reserva do laboratório precisa anteceder à data final de reserva.";
            case "calupe.api.msg.error.reservation.laboratory.is.not.blank".toUpperCase():
                return "O campo de reserva do laboratório não pode estar em branco.";
            case "calupe.api.msg.error.reservation.laboratory.not.available".toUpperCase():
                return "A reserva do laboratório não está disponível.";
            case "calupe.api.msg.error.reservation.laboratory.not.found".toUpperCase():
                return "A reserva do laboratório não foi encontrada.";
            case "calupe.api.msg.error.reservation.not.found".toUpperCase():
                return "A reserva não foi encontrada.";
            case "calupe.api.msg.error.reservation.user.modifier.is.not.blank".toUpperCase():
                return "O usuário do modificador da reserva não pode estar em branco.";
            case "calupe.api.msg.error.reservation.user.modifier.not.found".toUpperCase():
                return "O usuário do modificador não foi encontrado.";
            case "calupe.api.msg.error.reservation.user.register.is.not.blank".toUpperCase():
                return "O registro do usuário não pode estar em branco.";
            case "calupe.api.msg.error.reservation.user.register.not.found".toUpperCase():
                return "O registro do usuário não foi encontrado.";
            case "calupe.api.msg.error.reservation.user.remover.is.not.blank".toUpperCase():
                return "O usuário para remoção de reservas é obrigatório.";
            case "calupe.api.msg.error.reservation.user.remover.not.found".toUpperCase():
                return "O usuário para remoção de reservas não foi encontrado.";
            case "calupe.api.msg.error.reservation.user.requestor.has.reached.active.limit".toUpperCase():
                return "Usuário solicitante de reservas atingiu o limite ativo.";
            case "calupe.api.msg.error.reservation.user.requestor.is.not.blank".toUpperCase():
                return "A requisição de usuário é obrigatória.";
            case "calupe.api.msg.error.reservation.user.requestor.not.found".toUpperCase():
                return "Usuário solicitante de reserva não encontrado.";
            case "calupe.api.msg.success.reservation.was.removed".toUpperCase():
                return "A reserva foi removida com sucesso.";
            case "calupe.api.msg.warning.reservation.list.huge.response".toUpperCase():
                return "Atenção! Resposta da lista de reservas é muito grande.";
            case "calupe.api.msg.warning.reservation.list.is.empty".toUpperCase():
                return "Atenção! A lista de reserva está vazia.";
            case "calupe.api.msg.warning.reservation.no.has.been.removed".toUpperCase():
                return "Atenção! A reserva não foi removida.";

            //--> OUTROS <--
            //Codificado 26/08/2019 às 22:53 por Muryllo.
            //Note que a tradução pode ter ficado ambígua.
            //Função carece de revisão pela equipe.
            case "calupe.api.msg.error.act.method.not.acceptable".toUpperCase():
                return "Método não aceito.";
            case "calupe.api.msg.error.bad.request".toUpperCase():
                return "Requisição mal feita.";
            case "calupe.api.msg.error.rbac.roles.not.found".toUpperCase():
                return "Cargos ou atribuições não encontradas.";
            case "calupe.api.msg.error.unexpected".toUpperCase():
                return "Erro inesperado do servidor.";

            default:
                return "O servidor retornou um erro desconhecido.";                                                                                                                                
        }
    }
    else{
        return "O servidor retornou um erro desconhecido.";
    }
}

//Define um valor htmlText a ser posto em um element de id elementId.
/**
 * 
 * @param {string} elementId ID do elemento a ser modificado.
 * @param {string} htmlText Valor contendo HTML em forma de string.
 */
function SetHtmlById(elementId, htmlText){
    $("#".concat(elementId)).html(htmlText);
}

/**
 * Veja o modelo de um callback AJAX. https://stackoverflow.com/questions/377644/jquery-ajax-error-handling-show-custom-exception-messages
 * 
 * Use somente esse modelo de função para fazer requisições HTTP!
 * 
 * Programado por Muryllo 29/08/2019 às 18:36. 
 * 
 * @param {string} remoteAddr Endereço remoto o qual se fará a requisição;
 * @param {string} method Método da requisição (GET ou POST);
 * @param {function} successCallback Callback de retorno quando a requisição for um sucesso;
 * @param {function} errorCallback Callback de retorno quando a requisição for um fracasso;
 * @param {*} dataObj Dados a serem enviados, caso não haja passe null;
 * @param {string} dataObjType Tipo de dados a ser enviado, caso haja. Caso não haja, passe null.
 * @param {object} reqHeaders Cabeçalhos a serem enviados na requisição.
 */
function OpenAjax(remoteAddr, method, successCallback, errorCallback, dataObj, dataObjType, reqHeaders){
    return $.ajax({
        url: remoteAddr,
        type: method,
        success: successCallback,
        error: errorCallback,
        data: dataObj,
        dataType: dataObjType,
        headers: reqHeaders
    });
}

/**
 * API interna do Calupe, disponível para front-end.
 * Documentação disponível para a equipe de programadores.
 */
var CalupeInternalAPI = {

    //Public API functions;
    /**
     * 
     * @param {CalupeEvents} pcalupeEvts 
     */
    RetrieveLabs:function(pcalupeEvts){
        return OpenAjax("http://54.38.226.104/CalupeAPI/laboratorios", "GET", pcalupeEvts.OnRetrieveLabs, pcalupeEvts.OnRaiseCriticalError, null, null, null).readyState;
    },

    /**
     * 
     * @param {CalupeEvents} pcalupeEvts
     * @param {number} labId 
     */
    RetrieveLabById:function(pcalupeEvts, labId){
        return OpenAjax("http://54.38.226.104/CalupeAPI/laboratorios/" + labId.toString(), "GET", pcalupeEvts.OnRetrieveLabById, pcalupeEvts.OnRaiseCriticalError, null, null, null).readyState;
    },

    /**
     * 
     * @param {CalupeEvents} pcalupeEvts 
     */
    RetrieveReservs:function(pcalupeEvts){
        return OpenAjax("http://54.38.226.104/CalupeAPI/reservas", "GET", pcalupeEvts.OnRetrieveReservs, pcalupeEvts.OnRaiseCriticalError, null, null, null).readyState;
    },

    /**
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {number} reservId 
     */
    RetrieveReservById:function(pcalupeEvts, reservId){
        return OpenAjax("http://54.38.226.104/CalupeAPI/reservas/" + reservId.toString(), "GET", pcalupeEvts.OnRetrieveReservsById, pcalupeEvts.OnRaiseCriticalError, null, null, null).readyState;
    },

    //Protected by ADMIN permission functions;
    /**
     * 
     * @param {CalupeEvents} pcalupeEvts 
     */
    RetrieveAllUsers:function(pcalupeEvts, username, password, userEmail, userCpf, phone){
        return OpenAjax("http://54.38.226.104/CalupeAPI/usuarios/", 
        "POST", 
        pcalupeEvts.OnRegisterNewUser, 
        pcalupeEvts.OnRaiseCriticalError, 
        {
            nome: username,
            senha: password,
            email: userEmail,
            cpf: userCpf,
            telefone:phone
        }, "json", { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers':'x-requested-with'
        }).readystate;
    },

    RetrieveUserById:function(pcalupeEvts){

    },

    //POST functions;
    RegisterNewUser:function(pcalupeEvts){
        
    },

    RegisterNewLab:function(pcalupeEvts){

    },

    RegisterNewReserv:function(pcalupeEvts){

    },

    /**
     * Função de autenticação no Calupe.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     */
    CalupeAuth0: function(pcalupeEvts, userEmail, password){
        return OpenAjax("http://54.38.226.104/CalupeAPI/usuarios/autenticar/",
                        "POST", pcalupeEvts.OnCallupeAuthSuccess, 
                        pcalupeEvts.OnRaiseCriticalError, 
                        JSON.stringify({email: userEmail, senha: password}), "json", { 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Headers':'x-requested-with'
                        }).readyState;
    }
}

class CalupeEvents {

    constructor(){
        console.log("classe instanciada!");
    }

    OnRetrieveLabs(data){}
    OnRetrieveLabById(data){}
    OnRetrieveReservs(data){}
    OnRetrieveReservsById(data){}
    OnRetrieveAllUsers(data){}
    OnRetrieveUserById(data){}
    OnRegisterNewUser(data){}
    OnRegisterNewLab(data){}
    OnRegisterNewReserv(data){}
    OnCallupeAuthSuccess(data){
        console.log(data);
    }

    //Exceções não tratadas devem ser redirecionadas aqui por padrão.
    OnRaiseCriticalError(){}
    
}

//var calEvt = new CalupeEvents();

//console.log(CalupeInternalAPI.CalupeAuth0(calEvt, "testador@upe.br", "teste"));

// var sess = CreateSession("muryllo", "123", 5, null);
// console.log(sess);
// StartSession(sess);

// console.log(ReadCurrentSession(5));

// DestroySession();