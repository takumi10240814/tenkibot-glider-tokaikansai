function sendMessage(message) {
const line_token = PropertiesService.getScriptProperties().getProperty('clientSecret');
const url = 'https://api.line.me/v2/bot/message/broadcast';
  const payload = {
    messages: [
      { type: 'text', text: message }
    ]
  };
  const params = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: 'Bearer ' + line_token
    },
    payload: JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, params);
  }
function fetchWether() {
const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/210000.json';
  const params = {
    method: 'get',
    contentType: 'application/json'
  };
const response = UrlFetchApp.fetch(url, params);
const responseData = JSON.parse(response.getContentText());
const wind = responseData[0].timeSeries[0].areas[0].winds[0];
return wind;
}
function sendWetherMessage() {
const wind = fetchWether();
const tenki = fetchTenki();
Logger.log(wind + tenki); 
sendMessage(wind + tenki);
}
function fetchTenki() {
  const url = 'https://www.jma.go.jp/bosai/forecast/data/forecast/210000.json';
  const params = {
    method: 'get',
    contentType: 'application/json'
  };
const response = UrlFetchApp.fetch(url, params);
const responseData = JSON.parse(response.getContentText());
const tenki = responseData[0].timeSeries[0].areas[0].weathers[0];
var prettyJson = JSON.stringify(tenki, null, 2);
Logger.log(prettyJson);
return tenki;
}