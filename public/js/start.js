function getCookie(name) {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let split = el.split("=");
    cookie[split[0].trim()] = split.slice(1).join("=");
  });
  return cookie[name];
}

// function setCookie(name, value, days) {
//   var expires = "";
//   if (days) {
//     var date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     expires = "; expires=" + date.toUTCString();
//   }
//   console.log("SET COOKIE", name);
//   document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

let theme;

//console.log("TG THEME", Telegram.WebApp.colorScheme);
document.querySelector("html").style.backgroundColor = "#18191d";
theme = getCookie("theme");
//console.log("START COOKIE THEME", theme);
if (!theme && Telegram) {
  theme = Telegram.WebApp.colorScheme;
  //setCookie("theme", theme, 365);
}
//console.log("RESULT THEME", theme);
var stylesheet = document.styleSheets[0];

if (theme === "dark") {
  document.querySelector("body").style.backgroundColor = "#18191d";
  stylesheet.insertRule(
    ".loading-page-rule { background-color: #18191d  !important;}",
    0
  );
} else {
  document.querySelector("html").style.backgroundColor = "#F5F5F5";
  stylesheet.insertRule(
    ".loading-page-rule { background-color: #F5F5F5  !important;}",
    0
  );
}
