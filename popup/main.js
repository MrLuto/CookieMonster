let text = document.getElementById("status");
let selector = document.getElementById("selector");
let exit = document.getElementById('exit');
let menu = document.getElementById('menu');
let local_blocked_num = document.getElementById("local_blocked_num");
let total_blocked_num = document.getElementById("total_blocked_num");
let Current_Domain = document.getElementById("Current_Domain");

async function Get_Current_Domain() {
  let [tabs] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  let fqnd = tabs.url;
  let stripprot = fqnd.split('//');
  let dn = stripprot[1].split('/');
  gcd = dn[0];
  return gcd;
}

async function Set_status() {
  //let GCD = await Get_Current_Domain();
  //let key = GCD + "_status";
  //let localkey = GCD + "_DeletedCookies";
  //chrome.storage.local.get(["AllDeletedCookies"]).then((result) => {total_blocked_num.innerHTML = result.AllDeletedCookies});

  if (selector.checked == true){
    text.innerHTML = "Cookie monster is </br> sleeping";
    local_blocked_num.innerHTML = "NO";
    local_blocked_num.style.color = "#505050";
    chrome.storage.local.set({ key: true }).then(() => {});
  } else {
    //TODO: get number of blocked cookies for this domain
    let local_blocked_amount = "#soon";
    //chrome.storage.local.get([`${localkey}`]).then((result) => {total_blocked_num.innerHTML = result.localkey});
    text.innerHTML = "Cookie monster is eating all your cookies";
    local_blocked_num.innerHTML = local_blocked_amount;
    local_blocked_num.style.color = "#FF6600";
    chrome.storage.local.set({ key: false }).then(() => {});
  }
}


document.addEventListener('DOMContentLoaded', function() {

    exit.addEventListener('click', function() {window.close()});
    selector.addEventListener('click', function() {Set_status()});

    menu.addEventListener('click', function() {
        text.innerHTML = "#soon<br>a menu will be here";
        setTimeout(function() {Set_status()}, 2000);
    });

    async function onload() {
      let cookies = await chrome.cookies.getAll({});
          let GCD = await Get_Current_Domain();
          let key = GCD + "_status";
          Current_Domain.innerHTML = GCD;
          let dn_splitted = GCD.split('.');
          const cookies_filterd = cookies.filter(cookie => cookie["domain"].includes(dn_splitted[1]));

          chrome.storage.local.get([key]).then((result) => {
            console.log(result); //TODO: check if cookie blocking is enabled for this domain
          });

          if (selector.checked == false){
            if(cookies_filterd.length == 0){
            }else{

              cookies_filterd.forEach(function(cookie) {
                chrome.cookies.remove({"url": "http://"+cookie["domain"]+cookie["path"], "name": cookie["name"]});
              });

              chrome.storage.local.get(["AllDeletedCookies"]).then((result) => {

                if (result.AllDeletedCookies == undefined) chrome.storage.local.set({ "AllDeletedCookies": 0 }).then(() => {});
                let localkey = GCD + "_DeletedCookies";
                let value = result.AllDeletedCookies + cookies_filterd.length;
                chrome.storage.local.set({ "AllDeletedCookies": value }).then(() => {});
                chrome.storage.local.set({ localkey: value }).then(() => {});
              });
            }
          }
    Set_status();
    }
    onload();
});