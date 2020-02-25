const SERVER_ADDR = "http://200.196.181.164";
const SERVER_SMTP_TOKEN = "66D4DED0-BDDF-41A3-9AD4-AF0FB0309AFC";
const SERVER_MAIL_ALIAS = "cgBiAC4AZQBwAHUAQABlAHAAdQBsAGEAYwA=";
const SERVER_SMTP_BODY = "PABkAGkAdgAgAHMAdAB5AGwAZQA9ACIAbQBhAHIAZwBpAG4ALQByAGkAZwBoAHQAOgBhAHUAdABvADsAbQBhAHIAZwBpAG4ALQBsAGUAZgB0ADoAYQB1AHQAbwA7AG0AYQByAGcAaQBuAC0AdABvAHAAOgA1ADAAcAB4ADsAbQBhAHgALQB3AGkAZAB0AGgAOgA1ADkAMABwAHgAOwB3AGkAZAB0AGgAOgA4ADAAJQA7AGgAZQBpAGcAaAB0ADoAYQB1AHQAbwA7AGIAYQBjAGsAZwByAG8AdQBuAGQALQBjAG8AbABvAHIAOgAjADAAMAA2AGQAZgBmADsAYgBvAHIAZABlAHIAOgAxAHAAeAAgAHMAbwBsAGkAZAAgACMAMAAwADAAMAAwADAAOwBvAHYAZQByAGYAbABvAHcALQB4ADoAYQB1AHQAbwA7ACIAPgA8AGQAaQB2ACAAcwB0AHkAbABlAD0AIgB0AGUAeAB0AC0AYQBsAGkAZwBuADoAYwBlAG4AdABlAHIAOwBoAGUAaQBnAGgAdAA6ADkAMABwAHgAOwAiAD4AIAA8AGkAbQBnACAAcwByAGMAPQAiAGgAdAB0AHAAcwA6AC8ALwBpAC4AaQBtAGcAdQByAC4AYwBvAG0ALwBZAHAAUwBCAEQARwBLAC4AcABuAGcAIgAgAGEAbAB0AD0AIgBDAEEATABVAFAARQAiACAAcwB0AHkAbABlAD0AIgBtAGEAcgBnAGkAbgAtAHQAbwBwADoAMgAxAHAAeAA7ACIAPgA8AC8AZABpAHYAPgA8AGQAaQB2ACAAcwB0AHkAbABlAD0AIgBtAGEAeAAtAHcAaQBkAHQAaAA6ADUAOQAwAHAAeAA7AHcAaQBkAHQAaAA6ADEAMAAwACUAOwBoAGUAaQBnAGgAdAA6AGEAdQB0AG8AOwBiAGEAYwBrAGcAcgBvAHUAbgBkAC0AYwBvAGwAbwByADoAIwBjADQAZQBjAGYAZgA7AHQAZQB4AHQALQBhAGwAaQBnAG4AOgBqAHUAcwB0AGkAZgB5ADsAdABlAHgAdAAtAGoAdQBzAHQAaQBmAHkAOgBpAG4AdABlAHIALQB3AG8AcgBkADsAcABhAGQAZABpAG4AZwAtAHQAbwBwADoAMQAwAHAAeAA7AHAAYQBkAGQAaQBuAGcALQBiAG8AdAB0AG8AbQA6ADIAMABwAHgAOwAiAD4APABoADIAIABzAHQAeQBsAGUAPQAiAGMAbwBsAG8AcgA6ACMAMAAwADgAMAA4ADAAOwB0AGUAeAB0AC0AYQBsAGkAZwBuADoAYwBlAG4AdABlAHIAOwAiAD4AQwBvAG4AdAByAG8AbABlACAAQQBkAG0AaQBuAGkAcwB0AHIAYQB0AGkAdgBvACAAZABvAHMAIABMAGEAYgBvAHIAYQB0APMAcgBpAG8AcwAgAGQAYQAgAFUAUABFADwALwBoADIAPgA8AHAAIABzAHQAeQBsAGUAPQAiAG0AYQByAGcAaQBuAC0AcgBpAGcAaAB0ADoAMQA1AHAAeAA7AG0AYQByAGcAaQBuAC0AbABlAGYAdAA6ADEANQBwAHgAOwAiAD4APABiAD4ARQBtAGEAaQBsACAAZABvACAAdQBzAHUA4QByAGkAbwA6ADwALwBiAD4APABiAHIAPgAtACAAJAB7AHsARQBNAEEASQBMAF8AVQBTAFUAQQBSAEkATwB9AH0APAAvAHAAPgA8AHAAIABzAHQAeQBsAGUAPQAiAG0AYQByAGcAaQBuAC0AcgBpAGcAaAB0ADoAMQA1AHAAeAA7AG0AYQByAGcAaQBuAC0AbABlAGYAdAA6ADEANQBwAHgAOwAiAD4APABiAD4ATgCwACAAZABlACAATQBhAHQAcgDtAGMAdQBsAGEAOgA8AC8AYgA+ADwAYgByAD4ALQAgACQAewB7AE4AVQBNAEUAUgBPAF8ATQBBAFQAUgBJAEMAVQBMAEEAfQB9ADwALwBwAD4APABwACAAcwB0AHkAbABlAD0AIgBtAGEAcgBnAGkAbgAtAHIAaQBnAGgAdAA6ADEANQBwAHgAOwBtAGEAcgBnAGkAbgAtAGwAZQBmAHQAOgAxADUAcAB4ADsAIgA+ADwAYgA+AEEAcwBzAHUAbgB0AG8AIABhAGIAbwByAGQAYQBkAG8AOgA8AC8AYgA+ADwAYgByAD4ALQAgACQAewB7AEEAUwBTAFUATgBUAE8AXwBNAEUATgBTAEEARwBFAE0AfQB9ADwALwBwAD4APABwACAAcwB0AHkAbABlAD0AIgBtAGEAcgBnAGkAbgAtAHIAaQBnAGgAdAA6ADEANQBwAHgAOwBtAGEAcgBnAGkAbgAtAGwAZQBmAHQAOgAxADUAcAB4ADsAIgA+ADwAYgA+AE0AbwB0AGkAdgBvACAAZABhACAAbQBlAG4AcwBhAGcAZQBtADoAPAAvAGIAPgA8AGIAcgA+AC0AIAAkAHsAewBNAE8AVABJAFYATwBfAE0ARQBOAFMAQQBHAEUATQB9AH0APAAvAHAAPgA8AHAAIABzAHQAeQBsAGUAPQAiAG0AYQByAGcAaQBuAC0AcgBpAGcAaAB0ADoAMQA1AHAAeAA7AG0AYQByAGcAaQBuAC0AbABlAGYAdAA6ADEANQBwAHgAOwAiAD4APABiAD4ATQBlAG4AcwBhAGcAZQBtACAAZABvACAAdQBzAHUA4QByAGkAbwA6ADwALwBiAD4APABiAHIAPgAkAHsAewBDAE8AUgBQAE8AXwBNAEUATgBTAEEARwBFAE0AfQB9ADwALwBwAD4APAAvAGQAaQB2AD4APABkAGkAdgAgAHMAdAB5AGwAZQA9ACIAbQBhAHgALQB3AGkAZAB0AGgAOgA1ADkAMABwAHgAOwB3AGkAZAB0AGgAOgAxADAAMAAlADsAbQBpAG4ALQBoAGUAaQBnAGgAdAA6ADcAMABwAHgAOwBoAGUAaQBnAGgAdAA6AGEAdQB0AG8AOwBiAGEAYwBrAGcAcgBvAHUAbgBkAC0AYwBvAGwAbwByADoAIwAwADAANgBkAGYAZgA7AHQAZQB4AHQALQBhAGwAaQBnAG4AOgBjAGUAbgB0AGUAcgA7AGMAbwBsAG8AcgA6ACMAZgBmAGYAZgBmAGYAOwAiAD4APABwACAAcwB0AHkAbABlAD0AIgBmAG8AbgB0AC0AcwBpAHoAZQA6ADEANgBwAHgAOwBmAG8AbgB0AC0AdwBlAGkAZwBoAHQAOgBiAG8AbABkADsAbQBhAHIAZwBpAG4ALQB0AG8AcAA6ADEAMQBwAHgAOwAiAD4AqQAgADIAMAAxADkAIABVAG4AaQB2AGUAcgBzAGkAZABhAGQAZQAgAGQAZQAgAFAAZQByAG4AYQBtAGIAdQBjAG8AIAAtACAAQwBBAEwAVQBQAEUAPABiAHIAPgBOAOMAbwAgAHIAZQBzAHAAbwBuAGQAYQAgAGEAIABlAHMAdABlACAAZQBtAGEAaQBsACAAYQB1AHQAbwBtAOEAdABpAGMAbwAuADwALwBwAD4APAAvAGQAaQB2AD4APAAvAGQAaQB2AD4A";

/**
 * Biblioteca SmtpJs responsável por prover acesso aos servidores SMTP.
 */
var SmtpJs = {
    send: function(a) {
        return new Promise(function(n, e) {
            a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
            var t = JSON.stringify(a);
            SmtpJs.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function(e) {
                n(e);
            });
        })
    },
    ajaxPost: function(e, n, t) {
        var a = SmtpJs.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function() {
            var e = a.responseText;
            null != t && t(e);
        }, a.send(n);
    },
    ajax: function(e, n) {
        var t = SmtpJs.createCORSRequest("GET", e);
        t.onload = function() {
            var e = t.responseText;
            null != n && n(e);
        }, t.send();
    },
    createCORSRequest: function(e, n) {
        var t = new XMLHttpRequest;
        return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
    }
};

/**
 * @see https://ourcodeworld.com/articles/read/188/encode-and-decode-html-entities-using-pure-javascript
 */
var htmlentities = {
    /**
     * Converts a string to its html characters completely.
     *
     * @param {String} str String with unescaped HTML characters
     **/
    encode: function (str) {
        let buf = [];
        for (let i = str.length - 1; i >= 0; i--) {
            buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }
        return buf.join('');
    },
    /**
     * Converts an html characterSet into its original character.
     *
     * @param {String} str htmlSet entities
     **/
    decode: function (str) {
        return str.replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
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
    SetCookie: function (cookieName, cookieValue, cookieDurationInMsec, cookiePath) {
        let date = new Date();
        date.setTime(date.getTime() + cookieDurationInMsec);
        if (this.GetCookie(cookieName) == null) {
            document.cookie = cookieName + "=" + cookieValue + "; expires=" + date.toUTCString() + "; path=" + cookiePath + ";";
        }
    },
    /**
     * Retorna o valor contido em um cookie.
     * 
     * @param {string} cookieName 
     */
    GetCookie: function (cookieName) {
        let cookies = document.cookie.split(";");
        for (k = 0; k < cookies.length; k++) {
            var cookieTmp = cookies[k].trim();
            if (cookieTmp.indexOf(cookieName) == 0) {
                return cookieTmp.substring(cookieName.length + 1, cookieTmp.length);
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
    DeleteCookie: function (cookieName, cookiePath) {
        let date = new Date();
        date.setTime(date.getTime() - 100 * 365 * 24 * 60 * 60 * 1000);
        document.cookie = cookieName + "=; expires=" + date.toUTCString() + "; path=" + cookiePath + ";";
    }
}

/**
 * Programado por Muryllo  12/10/2019 às 18:13
 */
var LocalStorageManager = {
    /**Define ou cria um novo item e atribui a ele um valor.
     * 
     * @param {string} itemName Nome do item armazenado.
     * @param {string} itemValue Valor do item de armazenamento.
     */
    SetItem: (itemName, itemValue) => {
        window.localStorage.setItem(itemName, itemValue);
    },
    /**Recupera o valor de um item armazenado.
     * 
     * @param {string} itemName Nome do item armazenado.
     */
    GetItem: (itemName) => {
        return window.localStorage.getItem(itemName);
    },
    /**Deleta um item armazenado.
     * 
     * @param {string} itemName Nome do item armazenado.
     */
    DeleteItem: (itemName) => {
        window.localStorage.removeItem(itemName);
    },
    /**
     * Apaga todos os itens armazenados.
     */
    ClearItems: () => {
        window.localStorage.clear();
    }
}

/**
 * Programado por Muryllo  12/10/2019 às 18:30
 */
var SessionStorageManager = {
    /**Define ou cria um novo item e atribui a ele um valor.
     * 
     * @param {string} itemName Nome do item armazenado.
     * @param {string} itemValue Valor do item de armazenamento.
     */
    SetItem: (itemName, itemValue) => {
        window.sessionStorage.setItem(itemName, itemValue);
    },
    /**Recupera o valor de um item armazenado.
     * 
     * @param {string} itemName Nome do item armazenado.
     */
    GetItem: (itemName) => {
        return window.sessionStorage.getItem(itemName);
    },
    /**Deleta um item armazenado.
     * 
     * @param {string} itemName Nome do item armazenado.
     */
    DeleteItem: (itemName) => {
        window.sessionStorage.removeItem(itemName);
    },
    /**
     * Apaga todos os itens armazenados.
     */
    ClearItems: () => {
        window.sessionStorage.clear();
    }
}

/**Reverte a string.
 * 
 * @param {string} str Retorna a string ao revertida.
 */
function ReverseString(str){
    return str.split("").reverse().join("");
}

/**Cria um apelido de email para evitar a presença do texto puro no arquivo javascript.
 * 
 * @param {string} origMail Email original.
 */
function CreateMailAlias(origMail){
    return Base64EncodeUTF16(ReverseString(origMail));
}

/**Remove o apelido do email.
 * 
 * @param {string} mangledMail Apelido do email.
 */
function RemoveMailAlias(aliasMail){
    return ReverseString(Base64DecodeUTF16(aliasMail));
}

/**Retorna uma string contendo o design padrão de mensagem em HTML que deve ser enviado por email.
 * 
 * @param {string} userMail Email do usuário que enviou a mensagem.
 * @param {string} idUpe Matrícula do usuário que enviou a mensagem.
 * @param {string} subjectMsg Assunto da mensagem.
 * @param {string} reasonMsg Motivo da mensagem.
 * @param {string} bodyMsg Corpo da mensagem.
 */
function CreateDefaultCalupeMail(userMail, idUpe, subjectMsg, reasonMsg, bodyMsg){
    return Base64DecodeUTF16(SERVER_SMTP_BODY).replace("${{EMAIL_USUARIO}}", userMail).replace("${{NUMERO_MATRICULA}}", idUpe).replace("${{ASSUNTO_MENSAGEM}}", subjectMsg).replace("${{MOTIVO_MENSAGEM}}", reasonMsg).replace("${{CORPO_MENSAGEM}}", bodyMsg);
}

/**Cria o objeto de email smtp no padrão SmtpJs.
 * 
 * @param {string | string[]} _to Quais os destinatários. Pode ter um ou mais destinatários.
 * @param {string} _from Quem enviou a mensagem.
 * @param {string} _subject Mensagem que aparece na barra de assunto do email.
 * @param {string} _body Conteúdo a ser enviado por email.
 */
function CreateSmtpMailObject(_to, _from, _subject, _body){
    return { To: _to, From: _from, Subject: _subject, Body: _body };
}

/**Envia um email para um ou mais destinatários a partir de um objeto de email.
 * 
 * @param {object} mailObj Objeto contendo as informações do email. { To: ..., From: ..., Subject: ..., Body: ... }.
 * @param {string} secureToken Token se segurança criado no SmtpJs. 
 * @param {function} successCallback Callback de sucesso caso a operação seja concluída. Parâmetros: message.
 * @param {function} errorCallback Callback de fracasso caso a operação não seja concluída. Parâmetros: reason.
 */
function SendSmtpMail(mailObj, secureToken, successCallback, errorCallback){
    SmtpJs.send({
        SecureToken: secureToken,
        To: mailObj.To,
        From: mailObj.From,
        Subject: mailObj.Subject,
        Body: mailObj.Body
    }).then(successCallback).catch(errorCallback);
}

/**Converte os valores especificados em um DateTime (Date).
 * 
 * @param {number} day Dia.
 * @param {number} month Mês.
 * @param {number} year Ano.
 * @param {number} hours Horas.
 * @param {number} minutes Minutos.
 * @param {number} seconds Segundos.
 */
function ConvertToDateTime(day, month, year, hours, minutes, seconds){
    return new Date(year, month-1, day, hours, minutes, seconds, 0);
}

/**Converte uma data em padrão 
 * 
 * @param {Date} dateObj Objeto contendo a data.
 */
function ConvertToDateTimeString(dateObj){
    return dateObj.getFullYear() + "-" + ((dateObj.getMonth() + 1) < 10 ? "0" + (dateObj.getMonth() + 1) : (dateObj.getMonth() + 1)) + "-" + (dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate()) + "T" + (dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours()) + ":" + (dateObj.getMinutes() < 10 ? "0" + dateObj.getMinutes() : dateObj.getMinutes());
}

/**Converte um objeto de data no formato DD/MM/YYYY compatível com o DatePicker Gijgo.
 * 
 * @param {Date} dateObj Objeto de data.
 */
function ConvertDateTimeToDatePickerFormat(dateObj){
    return (dateObj.getDate() < 10 ? "0" + dateObj.getDate() : dateObj.getDate()) + "/" + (dateObj.getMonth() + 1 < 10 ? "0" + dateObj.getMonth() + 1 : dateObj.getMonth() + 1) + "/" + dateObj.getFullYear();
}

/**Retorna uma string humana legível no formato DD/MM/YYYY às HH:MM.
 * 
 * @param {string} dateValue DateTime em formato YYYY-MM-DDTHH:MM
 */
function ConvertDateTimeToHumanReadableDate(dateValue){
    let buffer = dateValue.split("T");
    let date__ = buffer[0];
    let time__ = buffer[1];
    buffer = date__.split("-");
    return (buffer[2] + "/" + buffer[1] + "/" + buffer[0] + " às " + time__);
}

/**Retorna um objeto em formato: {endhour: endHour, endminute: endMinute} 
 * 
 * @param {number} hour Hora
 * @param {number} minute Minuto
 * @param {number} minuteToSum Quantidade de minutos a serem somados
 */
function SumTimeWithMinute(hour, minute, minuteToSum){
    let totalMinutes = (hour * 60) + minute + minuteToSum;
    let endMinute = totalMinutes % 60;
    let endHour = (totalMinutes - endMinute) / 60;
    return {endhour: endHour, endminute: endMinute};
}

/**Retorna uma sugestão contendo o horário inicial e final de uma possível reserva com base no horário do computador.
 * 
 */
function CreateIntervalSuggestion(){
    let possibilities = [
        {starthour: 7,  startminute: 30 },  {starthour: 8,  startminute: 20 },  {starthour: 9,  startminute: 10 },  {starthour: 10, startminute: 0  },
        {starthour: 11, startminute: 50 },  {starthour: 12, startminute: 40 },  {starthour: 13, startminute: 30 },  {starthour: 14, startminute: 20 },
        {starthour: 15, startminute: 10 },  {starthour: 16, startminute: 0  },  {starthour: 16, startminute: 50 },  {starthour: 17, startminute: 30 },
        {starthour: 18, startminute: 20 },  {starthour: 19, startminute: 10 },  {starthour: 20, startminute: 0  },  {starthour: 21, startminute: 50 }
    ];
    let currentHour = new Date().getHours();
    let currentMinute = new Date().getMinutes();
    for (let k = 0; k < possibilities.length; k++){
        let possibility = possibilities[k];
        if (currentHour >= 22 && currentMinute >= 0){
            return [possibilities[0], SumTimeWithMinute(possibilities[0].starthour, possibilities[0].startminute, 100)] ;
        }
        else{
            if ((possibility.starthour * 60 + possibility.startminute) - (currentHour * 60 + currentMinute) > 0 &&
                (possibility.starthour * 60 + possibility.startminute) - (currentHour * 60 + currentMinute) < 50) {
                return [possibilities[k], SumTimeWithMinute(possibilities[k].starthour, possibilities[k].startminute, 100)];
            }
            else{
                if ((possibility.starthour * 60 + possibility.startminute) - (currentHour * 60 + currentMinute) == 0 &&
                    (possibility.starthour * 60 + possibility.startminute) - (currentHour * 60 + currentMinute) < 50) {
                    return [possibilities[k+1], SumTimeWithMinute(possibilities[k+1].starthour, possibilities[k+1].startminute, 100)];
                }
            }
        }
    }
    return [possibilities[0], SumTimeWithMinute(possibilities[0].starthour, possibilities[0].startminute, 100)];
}

/**Codifica uma string UTF16 em uma string Base64.
 * 
 * @param {string} sString String em UTF16.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_.22Unicode_Problem.22
 */
function Base64EncodeUTF16(sString) {
    let aUTF16CodeUnits = new Uint16Array(sString.length);
    Array.prototype.forEach.call(aUTF16CodeUnits, function (el, idx, arr) { arr[idx] = sString.charCodeAt(idx); });
    return btoa(String.fromCharCode.apply(null, new Uint8Array(aUTF16CodeUnits.buffer)));
}

/**Decodifica uma string Base64 em uma string UTF16.
 * 
 * @param {string} sBase64 String em Base64.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_.22Unicode_Problem.22
 */
function Base64DecodeUTF16(sBase64) {
    let sBinaryString = atob(sBase64), aBinaryView = new Uint8Array(sBinaryString.length);
    Array.prototype.forEach.call(aBinaryView, function (el, idx, arr) { arr[idx] = sBinaryString.charCodeAt(idx); });
    return String.fromCharCode.apply(null, new Uint16Array(aBinaryView.buffer));
}

/**RC4 symmetric cipher encryption/decryption
 *
 * @license Public Domain
 * @param {string} key - secret key for encryption/decryption
 * @param {string} str - string to be encrypted/decrypted
 * @return {string}
 */
function RC4(key, str) {
    let s = [];
    let j = 0;
    let x;
    let res = '';
    for (let i = 0; i < 256; i++) {
        s[i] = i;
    }
    for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }
    i = 0;
    j = 0;
    for (let y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }
    return res;
}

/**Gera um UUID hexadecimal de comprimento variável.
 * 
 * @param {number} length Tamanho do UUID a ser gerado.
 */
function Uuid(length){
    if (length > 0){
        let charkeys = "0123456789abcdef";
        let uuid = "";
        for (let k = 0; k < length; k++){
            for (let j = 0; j < 8; j++){
                uuid += charkeys.charAt(Math.floor(Math.random() * (charkeys.length)));
            }
            if (k != (length - 1)){
                uuid += "-";
            }
        }
        return uuid;
    }
    else{
        return null;
    }
}

/**Codifica o usuário e senha e encapsula um parâmetro reservado para uso futuro em um JSON criptografado por RC4.
 * 
 * RETORNO: JSON OBJETO CONTENDO A SESSÃO.
 * 
 * Programado por Muryllo 29/08/2019 às 19:04.
 * 
 * @param {string} user Usuário (email do usuário).
 * @param {string} password Senha da conta do usuário.
 * @param {*} reserved Parâmetro reservado, deve passar NULL.
 * @param {string} secretKey Chave secreta para criptografia da sessão.
 */
function CreateSession(user, password, reserved, secretKey) {
    let encUser = Base64EncodeUTF16(RC4(secretKey, user));
    let encPass = Base64EncodeUTF16(RC4(secretKey, password));
    return JSON.stringify({
        ul: encUser.length,
        pl: encPass.length,
        crd: Base64EncodeUTF16(encUser.concat(encPass)),
        reserved1: reserved
    });
}

/**Inicia uma nova sessão de usuário a partir de um objeto de sessão.
 * 
 * @param {JSON} sessionObject Objeto contendo a sessão do usuário.
 */
function StartSession(sessionObject) {
    let sessObj = JSON.parse(sessionObject);
    let ulc = sessObj.ul;
    let plc = sessObj.pl;
    CookieSessionManager.SetCookie("crd", sessObj.crd, 0x5265C00, "/");
    CookieSessionManager.SetCookie("ul", ulc, 0x5265C00, "/");
    CookieSessionManager.SetCookie("pl", plc, 0x5265C00, "/");
    CookieSessionManager.SetCookie("reserv1", sessObj.reserved1, 0x5265C00, "/");
}

/**Lê a sessão atual e retorna um objeto contendo as credenciais do usuário.
 * @param {string} secretKey Chave secreta usada na criptografia simétrica do objeto de sessão.
 */
function ReadCurrentSession(secretKey) {
    let __crd = Base64DecodeUTF16(CookieSessionManager.GetCookie("crd"));
    return {
        user: RC4(secretKey, Base64DecodeUTF16(__crd.substr(0, CookieSessionManager.GetCookie("ul")))),
        password: RC4(secretKey, Base64DecodeUTF16(__crd.substr(CookieSessionManager.GetCookie("ul"), CookieSessionManager.GetCookie("pl")))),
        reserved1: CookieSessionManager.GetCookie("reserv1")
    };
}

/**
 * Destrói a sessão do usuário.
 */
function DestroySession() {
    CookieSessionManager.DeleteCookie("crd", "/");
    CookieSessionManager.DeleteCookie("ul", "/");
    CookieSessionManager.DeleteCookie("pl", "/");
    CookieSessionManager.DeleteCookie("reserv1", "/");
}

/**
 * Retorna o estado da sessão, se está aberta ou fechada.
 */
function SessionState(){
    return (CookieSessionManager.GetCookie("crd") != null && CookieSessionManager.GetCookie("ul") != null && CookieSessionManager.GetCookie("pl") != null);
}

/**
 * Retorna o texto associado a qualquer erro interno do Calupe.
 * 
 * Programado por Muryllo e Emílio
 * 
 * @param {string} message A mensagem de status retornada pelo Calupe.
 */
function GetMessageString(message) {
    if (typeof (message) == "string") {
        switch (message.toUpperCase()) {

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
            case "calupe.api.msg.error.user.has.reservation.to.expire".toUpperCase():
                return "Usuário tem reservas expirando.";
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
            case "calupe.api.msg.error.reservation.is.expired".toUpperCase():
                return "A reserva já expirou.";
            default:
                return "O servidor retornou um erro desconhecido.";
        }
    }
    else {
        return "O servidor retornou um erro desconhecido.";
    }
}

/**Retorna o objeto de sessão da API Calupe (dados do usuário).
 * 
 * @param {string} sKey Chave secreta
 * @return {Promise} Dados do usuário.
 */
async function ReadUserData(sKey) {
    return new Promise(resolve => {
        let calEvts = new CalupeEvents();
        calEvts.OnCalupeAuthSuccess = (dataObj) => {
            resolve(dataObj);
        }
        calEvts.OnRaiseCriticalError = (xhr, ajaxOptions, result) => {
            resolve(null);
        }
        CalupeInternalAPI.CalupeAuth0(calEvts, ReadCurrentSession(sKey).user, ReadCurrentSession(sKey).password);
    });
}

/**Retorna um valor booleano indicando se o usuário logado é administrator ou não.
 * 
 * @param {string} sKey Chave secreta
 * @return {Promise} Valor booleano.
 */
async function IsAdministrator(sKey){
    let dataObj = await ReadUserData(sKey);
    if (dataObj != null && dataObj != undefined) {
        for (let k = 0; k < dataObj.papeis.length; k++){
            if (dataObj.papeis[k].nome.toUpperCase() == "ADMINISTRADOR"){
                return true;
            }
        }
        return false
    }
    else{
        return false;
    }
}

/**Define um valor htmlText a ser posto em um element de id elementId.
 * 
 * @param {string} elementId ID do elemento a ser modificado.
 * @param {string} htmlText Valor contendo HTML em forma de string.
 */
function SetHtmlById(elementId, htmlText) {
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
 * @param {*} AUTH_USERNAME Usuário usado na autenticação do cabeçalho Authorization.
 * @param {*} AUTH_PASSWORD Senha usada na autenticação do cabeçalho Authorization.
 */
function OpenAjax(remoteAddr, method, successCallback, errorCallback, dataObj, dataObjType, reqHeaders, AUTH_USERNAME, AUTH_PASSWORD) {
    return $.ajax({
        url: remoteAddr,
        type: method,
        success: successCallback,
        error: errorCallback,
        data: dataObj,
        dataType: dataObjType,
        headers: reqHeaders,
        crossDomain:true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(AUTH_USERNAME + ":" + AUTH_PASSWORD));
        }
    });
}

/**
 * API interna do Calupe, disponível para front-end.
 * Documentação disponível para a equipe de programadores.
 */
var CalupeInternalAPI = {

    //Public API functions;
    /**SUCESSO NO TESTE.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     */
    RetrieveLabs: function (pcalupeEvts) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/laboratorios/", "GET", 
        pcalupeEvts.OnRetrieveLabs, 
        pcalupeEvts.OnRaiseCriticalError, 
        null, null, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, null, null).readyState;
    },

    /**SUCESSO NO TESTE.
     * 
     * @param {CalupeEvents} pcalupeEvts
     * @param {number} labId 
     */
    RetrieveLabById: function (pcalupeEvts, labId) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/laboratorios/" + labId, "GET", 
        pcalupeEvts.OnRetrieveLabById, 
        pcalupeEvts.OnRaiseCriticalError, 
        null, null, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, null, null).readyState;
    },

    /**SUCESSO NO TESTE.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {number} month
     * @param {number} year
     */
    RetrieveReservs: function (pcalupeEvts, month, year) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/reservas?mes=" + month + "&ano=" + year, "GET", 
        pcalupeEvts.OnRetrieveReservs, 
        pcalupeEvts.OnRaiseCriticalError, 
        null, null, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, null, null).readyState;
    },

    /**SUCESSO NO TESTE.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {number} reservId 
     */
    RetrieveReservById: function (pcalupeEvts, reservId) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/reservas/" + reservId, "GET",
        pcalupeEvts.OnRetrieveReservsById,
        pcalupeEvts.OnRaiseCriticalError,
        null, null, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, null, null).readyState;
    },

    /**SUCESSO NO TESTE
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     */
    RetrieveAllUsers: function (pcalupeEvts, userEmail, password) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/usuarios/",
            "GET",
            pcalupeEvts.OnRetrieveAllUsers,
            pcalupeEvts.OnRaiseCriticalError,
            null, null, {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-requested-with'
            }, userEmail, password).readyState;
    },

    /**SUCESSO NO TESTE.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {number} userId 
     */
    RetrieveUserById: function (pcalupeEvts, userEmail, password, userId) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/usuarios/" + userId,
            "GET",
            pcalupeEvts.OnRetrieveUserById,
            pcalupeEvts.OnRaiseCriticalError,
            null, null, {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-requested-with'
            }, userEmail, password).readyState;
    },

    /**Retorna as reservas feitas nos últimos meses.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {number} startMonth 
     * @param {number} startYear 
     * @param {number} lastNumMonths 
     * @param {string} username 
     */
    RetrieveReservsByUsername: function (pcalupeEvts, startMonth, startYear, lastNumMonths, username) {
        let pending = 0;
        let count = 0;
        let reservs = [];
        let month = startMonth;
        let year = startYear;
        let calEvts = new CalupeEvents();
        calEvts.OnRetrieveReservs = function (dataObj) {
            for (let k in dataObj) {
                if (dataObj[k]["quem_reservou"].nome.toUpperCase() == username.toUpperCase()) {
                    reservs.push(dataObj[k]);
                }
            }
            count++;
            pcalupeEvts.OnRetrieveReservsByUsernameProgressCallback(count, lastNumMonths);
            if (count == lastNumMonths) {
                pcalupeEvts.OnRetrieveReservsByUsernameCompletionCallback(reservs);
            }
        }
        calEvts.OnRaiseCriticalError = function (dataObj) {
            count++;
            pcalupeEvts.OnRetrieveReservsByUsernameProgressCallback(count, lastNumMonths);
            if (count == lastNumMonths) {
                pcalupeEvts.OnRetrieveReservsByUsernameCompletionCallback(reservs);
            }
        }
        while (pending != lastNumMonths) {
            CalupeInternalAPI.RetrieveReservs(calEvts, month, year);
            pending++;
            year = (month - 1 == 0 ? year - 1 : year);
            month = (month - 1 == 0 ? 12 : month - 1);
        }
    },

    //POST functions;

    /**SUCESSO NO TESTE.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {string} targetUserEmail 
     * @param {string} targetUserPassword 
     * @param {string} targetUsername 
     * @param {string} targetUserPhone 
     * @param {string} targetUserCpf 
     */
    RegisterNewUser: function (pcalupeEvts, userEmail, password, targetUserEmail, targetUserPassword, targetUsername, targetUserPhone, targetUserCpf) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/usuarios/",
            "POST",
            pcalupeEvts.OnRegisterNewUser,
            pcalupeEvts.OnRaiseCriticalError,
            JSON.stringify({ email: targetUserEmail, senha: targetUserPassword, nome: targetUsername, cpf: targetUserCpf, telefone: targetUserPhone }),
            "json", {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-requested-with'
            }, userEmail, password).readyState;
    },

    /**SUCESSO NO TESTE.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {string} description 
     * @param {string} capacity 
     */
    RegisterNewLab: function (pcalupeEvts, userEmail, password, description, capacity) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/laboratorios/",
            "POST",
            pcalupeEvts.OnRegisterNewLab,
            pcalupeEvts.OnRaiseCriticalError,
            JSON.stringify({ descricao: description, capacidade: capacity }),
            "json", {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-requested-with'
            }, userEmail, password).readyState;
    },

    /**SUCESSO NO TESTE.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {number} userId 
     * @param {string} laboratoryId 
     * @param {string} startDate 
     * @param {string} endDate 
     */
    RegisterNewReserv: function (pcalupeEvts, userEmail, password, userId, laboratoryId, startDate, endDate, description) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/reservas/",
            "POST",
            pcalupeEvts.OnRegisterNewReserv,
            pcalupeEvts.OnRaiseCriticalError,
            JSON.stringify({
                data_inicio: startDate,
                data_fim: endDate, quem_solicitou: { id: userId },
                laboratorio: { id: laboratoryId },
                descricao: description
            }),
            "json", {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-requested-with'
            }, userEmail, password).readyState;
    },

    /**SUCESSO NO TESTE
     * Função de autenticação no Calupe.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     */
    CalupeAuth0: function (pcalupeEvts, userEmail, password) {
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/usuarios/autenticar/",
            "POST", pcalupeEvts.OnCalupeAuthSuccess,
            pcalupeEvts.OnRaiseCriticalError,
            JSON.stringify({ email: userEmail, senha: password }), "json", {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'x-requested-with'
            }, null, null).readyState;
    },

    //DELETE functions;

    //Corrigir e implementar essa API depois.
    /**Solicita ao servidor a exclusão de um usuário a partir do seu ID.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {number} targetUserId 
     */
    DeleteUser: function(pcalupeEvts, userEmail, password, targetUserId){
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/usuarios/" + targetUserId, "DELETE",
        pcalupeEvts.OnDeleteUser,
        pcalupeEvts.OnRaiseCriticalError, null, null, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, userEmail, password).readyState;
    },

    /**SUCESSO NO TESTE.
     * Solicita ao servidor a exclusão de um laboratório a partir do seu ID.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {number} labId 
     */
    DeleteLab: function (pcalupeEvts, userEmail, password, labId){
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/laboratorios/" + labId, "DELETE", 
        pcalupeEvts.OnDeleteLab, 
        pcalupeEvts.OnRaiseCriticalError, null, null, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, userEmail, password).readyState;
    },

    /**SUCESSO NO TESTE.
     * Solicita ao servidor a exclusão de uma reserva a partir do seu ID.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {number} reservId 
     */
    DeleteReserv: function (pcalupeEvts, userEmail, password, reservId){
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/reservas/" + reservId, "DELETE", 
        pcalupeEvts.OnDeleteReserv, 
        pcalupeEvts.OnRaiseCriticalError, null, null, {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, userEmail, password).readyState;
    },

    //PUT functions;
    /**SUCESSO NO TESTE.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {string} newTargetEmail 
     * @param {string} newTargetPassword 
     * @param {string} newTargetName 
     * @param {string} newTargetCpf 
     * @param {string} newTargetPhone 
     * @param {number} targetUserId
     */
    UpdateUser: function (pcalupeEvts, userEmail, password, newTargetEmail, newTargetPassword, newTargetName, newTargetCpf, newTargetPhone, targetUserId){
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/usuarios/" + targetUserId, "PUT",
        pcalupeEvts.OnUpdateUser,
        pcalupeEvts.OnRaiseCriticalError,
        JSON.stringify({email: newTargetEmail, senha: newTargetPassword, nome: newTargetName, cpf: newTargetCpf, telefone: newTargetPhone}), "json", {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, userEmail, password).readyState;
    },

    /**SUCESSO NO TESTE.
     * 
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {string} newDescription 
     * @param {string} newCapacity 
     * @param {number} labId
     */
    UpdateLab: function (pcalupeEvts, userEmail, password, newDescription, newCapacity, labId){
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/laboratorios/" + labId, "PUT",
        pcalupeEvts.OnUpdateLab,
        pcalupeEvts.OnRaiseCriticalError,
        JSON.stringify({descricao: newDescription, capacidade: newCapacity}), "json", {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, userEmail, password).readyState;
    },

    /**SUCESSO NO TESTE.
     * Atualiza uma reserva feita. Administradores ou o próprio usuário que fez a reserva podem atualizá-la.
     * 
     * @param {CalupeEvents} pcalupeEvts 
     * @param {string} userEmail 
     * @param {string} password 
     * @param {string} newStartDate 
     * @param {string} newEndDate 
     * @param {number} newRequesterId 
     * @param {number} newLabId 
     * @param {number} reservId 
     */
    UpdateReserv: function (pcalupeEvts, userEmail, password, newStartDate, newEndDate, newRequesterId, newLabId, reservId, description){
        return OpenAjax(SERVER_ADDR + "/CalupeAPI/reservas/" + reservId, "PUT",
        pcalupeEvts.OnUpdateReserv,
        pcalupeEvts.OnRaiseCriticalError,
        JSON.stringify({data_inicio: newStartDate, data_fim: newEndDate, quem_solicitou:{id: newRequesterId}, laboratorio:{id: newLabId}, descricao: description}),
        "json", {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'x-requested-with'
        }, userEmail, password).readyState;
    }

}

class CalupeEvents {

    OnRetrieveLabs(data) {
        console.log(data);
    }
    OnRetrieveLabById(data) {
        console.log(data);
    }
    OnRetrieveReservs(data) {
        console.log(data);
    }
    OnRetrieveReservsById(data) {
        console.log(data);
    }
    OnRetrieveAllUsers(data) {
        console.log(data);
    }
    OnRetrieveUserById(data) {
        console.log(data);
    }
    

    OnRegisterNewUser(data) {
        console.log(data);
    }
    OnRegisterNewLab(data) {
        console.log(data);
    }
    OnRegisterNewReserv(data) {
        console.log(data);
    }
    OnCalupeAuthSuccess(data) {
        console.log(data);
    }


    OnDeleteUser(data) {
        console.log(data);
    }
    OnDeleteLab(data) {
        console.log(data);
    }
    OnDeleteReserv(data) {
        console.log(data);
    }


    OnUpdateUser(data) {
        console.log(data);
    }
    OnUpdateLab(data) {
        console.log(data);
    }
    OnUpdateReserv(data) {
        console.log(data);
    }


    OnRetrieveReservsByUsernameProgressCallback(value, totalValue){
        console.log(value / totalValue);
    }
    OnRetrieveReservsByUsernameCompletionCallback(reservs){
        console.log(reservs);
    }


    //Exceções não tratadas devem ser redirecionadas aqui por padrão.
    OnRaiseCriticalError(xhr, ajaxOptions, result) {
        if (xhr.responseJSON != null && typeof xhr.responseJSON != "undefined"){
            console.log(xhr.responseJSON);
        }
    }

}