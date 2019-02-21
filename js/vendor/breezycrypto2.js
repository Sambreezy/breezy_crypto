   
loadJSONDoc();

/* Captcha Generation*/
function generateCaptcha() {
    var a = Math.ceil (Math.random() * 10) + '';
    var b = Math.ceil (Math.random() * 10) + '';
    var c = Math.ceil (Math.random() * 10) + '';

   captcha = a.toString() + b.toString() + c.toString();
   document.getElementById("noInput").value = captcha;
}

/*Form Validation*/
function validateForm() {
    var w = document.forms["myForm"]["name"].value;
    var x = document.forms["myForm"]["email"].value;
    var y = document.getElementById("number").value;
    var z = document.getElementById("input").value;

    if (w == "" || x == "" || y == "" || z == "") {
        alert ("All fields must be filled!");
        return false;
    } else if (x.indexOf("@", 0) < 0 || x.indexOf(".", 0) < 0) {
        document.getElementById("emailid").innerHTML = "*Invalid e-mail";
        return false;
    } else if (y.length != 11 || isNaN(y)) {
        document.getElementById("phoneid").innerHTML = "*Invalid phone number";
        return false;
    } else if (z !== captcha) {
        document.getElementById("captchaid").innerHTML = "*Refresh captcha";
        return false;
    } else {
        document.location.replace("breezycrypto2-2.html");
        return true;
    } 
}

/*Update Table*/
function loadJSONDoc() {
    $.get('https://api.coinmarketcap.com/v2/ticker/?convert=BTC&limit=10.JSON', function(data){
        myFunction(data);
        // console.log(data);
    });
    $.get('https://api.coinmarketcap.com/v2/global/?convert=BTC.JSON', function(data){
        marketValues(data);
        // console.log(data);
    });
}

function myFunction(json) {
    var i;
    var table="<tr><th>#</th><th>Name</th><th>Market Cap</th><th>Price</th><th>Volume (24h)</th><th>Circulating Supply</th><th>Change (24h)</th></tr>";
    var y = json.data;
    var x = [];
    for (i in y) {    
        if(y[i].rank > 5) {
            
            continue
        }
        x.push(y[i]);
    }

    x = x.sort(function(a, b){
        return parseInt(a.rank) - parseInt(b.rank);
    });

    for (i in x) {   
        
        let image = getCoinLogo(x[i].symbol);
        table += `<tr>
        <td>${x[i].rank}</td>
        <td class = "myfont">${image} ${x[i].name} </td>
        <td>${x[i].quotes.USD.market_cap}</td>
        <td class = "mycolor">${x[i].quotes.USD.price} </td>
        <td class = "mycolor">${x[i].quotes.USD.volume_24h}</td>
        <td>${x[i].circulating_supply}</td>
        <td class = "mycolors">${x[i].quotes.USD.percent_change_24h}</td>
        </tr>`;
    }    
    
    document.getElementById("tabular").innerHTML = table;
}

function marketValues(json) {
    var i;
    var txt = "";
    var txt1 = "";
    var txt2 = "";
    var txt3 = "";
    var txt4 = "";
    var x = json.data;

    txt += x.active_cryptocurrencies;
    document.getElementById("head1").innerHTML = txt;

    txt1 += x.active_markets;
    document.getElementById("head2").innerHTML = txt1;

    txt2 += x.quotes.USD.total_market_cap;
    document.getElementById("head3").innerHTML = txt2;

    txt3 += x.quotes.USD.total_volume_24h;
    document.getElementById("head4").innerHTML = txt3;

    txt4 += x.bitcoin_percentage_of_market_cap;
    document.getElementById("head5").innerHTML = txt4;
}

function getCoinLogo(symbol){
    switch(symbol){
        case 'BTC':
           return '<img src = "img/1.png">';
           break;
        case 'ETH':
           return '<img src = "img/3.png">';
           break;
        case 'XRP':
           return '<img src = "img/2.png">';
           break;
        case 'BCH':
           return '<img src = "img/5.png">';
           break;
        case 'EOS':
           return '<img src = "img/4.png">';
           break; 
        default:
           return "";

    }
}
