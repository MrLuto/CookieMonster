document.addEventListener('DOMContentLoaded', function() {

    var exit = document.getElementById('exit');
    exit.addEventListener('click', function() {
        window.close();
    });

    var menu = document.getElementById('menu');
    menu.addEventListener('click', function() {

        var text = document.getElementById("status");
        var checkBox = document.getElementById("selector");

        text.innerHTML = "#soon<br>a menu will be here";
        setTimeout(function() {
            if (checkBox.checked == true){
                text.innerHTML = "Cookie monster is </br> sleeping";
                local_blocked_num.innerHTML = "NO";
                local_blocked_num.style.color = "#505050";
      
              } else {
                text.innerHTML = "Cookie monster is eating all your cookies";
                local_blocked_num.innerHTML = "24"; //TODO: get number of blocked cookies
                local_blocked_num.style.color = "#FF6600";
              }
          }, 2000);
    });

    var selector = document.getElementById('selector');
    selector.addEventListener('click', function() {

        var checkBox = document.getElementById("selector");
        var text = document.getElementById("status");
        var local_blocked_num = document.getElementById("local_blocked_num");

        if (checkBox.checked == true){
          text.innerHTML = "Cookie monster is </br> sleeping";
          local_blocked_num.innerHTML = "NO";
          local_blocked_num.style.color = "#505050";

        } else {
          text.innerHTML = "Cookie monster is eating all your cookies";
          local_blocked_num.innerHTML = "24"; //TODO: get number of blocked cookies
          local_blocked_num.style.color = "#FF6600";
        }
    });

    function onload() {
        //TODO cookie reading for data
        document.cookie = "LastCookieEver=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        console.log(document.cookie);
        if (false){
            
        }
        var Current_Domain = document.getElementById("Current_Domain");
        var local_blocked_num = document.getElementById("local_blocked_num");
        var total_blocked_num = document.getElementById("total_blocked_num");

        //TODO: check if cookie blocking is enabled for this domain
        //TODO: get number of blocked cookies for this domain
        //TODO: get number of blocked cookies for all domains
    
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let fqnd = tabs[0].url;
            let stripprot = fqnd.split('//');
            let dn = stripprot[1].split('/');
             Current_Domain.innerHTML = dn[0];
            // use `url` here inside the callback because it's asynchronous!
        });
    }
    onload();


});