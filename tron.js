var tronWeb;
var waiting = 0;
var currentAddr;
var time = 0;
var pottime = 0;

var a_godTimer = "";
var godtimer_in_seconds = 0;
var god_numhours = 0;
var god_numminutes = 0;
var god_numseconds = 0;

var god_roundover = false;
var godtimer_lastminute = 300;
var i_godTimer = true;
var calledEvent = false;

var previouslvl;

async function main() {
    if (typeof window.tronWeb === "undefined") {
        console.log("Waiting for tronWeb...");
        waiting += 1;
        if (waiting == 5) {
            alert("please ensure tronlink is installed and connected ");
        }
        setTimeout(main, 1000);
    } else {
        tronWeb = window.tronWeb;
        tower = await tronWeb.contract().at("TM1zBDx64PZJyFFWmDQPjaGszFd8n3YzAr");

        BigNumber = tronWeb.BigNumber;
        currentAddr = tronWeb.defaultAddress["base58"];
        setTimeout(function() {
            $("#check").hide();
            updatedata();

        }, 2000);
        setInterval(function() {
            mainloop();

        }, 2000);
    }
}

function nFormatter(num) {
    isNegative = false;
    if (num < 0) {
        isNegative = true;
    }
    num = Math.abs(num);
    if (num >= 1000000000) {
        formattedNumber = (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "G";
    } else if (num >= 1000000) {
        formattedNumber = (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1000) {
        formattedNumber = (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
        formattedNumber = num;
    }
    if (isNegative) {
        formattedNumber = "-" + formattedNumber;
    }
    return formattedNumber;
}

function mainloop() {
    if (tronWeb.defaultAddress["base58"] !== currentAddr) {
        location.reload();
    }

    var dataRef =
        window.location.origin + "?ref=" + tronWeb.defaultAddress["base58"];
    // document.getElementById('intialAccount').textContent = dataRef;



    
  
    
       tower.player().call().then((result) => {
        var player = result.toNumber();
        
        document.getElementById("player").textContent = player;

    });
    
        tower.totalWagered().call().then((result) => {
        var totalWagered = result.toNumber();
        
        document.getElementById("totalWagered").textContent = totalWagered/1e6;

    });
    
         tower.totalWon().call().then((result) => {
        var totalWon = result.toNumber();
        
        document.getElementById("totalWon").textContent = totalWon/1e6;

    });
    
        tower.cash().call().then((result) => {
        var cash = result.toNumber();
        
        document.getElementById("cash").textContent = cash/1e6;

    });
    
         tower.Mined().call().then((result) => {
        var Mined = result.toNumber();
        
        document.getElementById("Mined").textContent = Mined/1e6;

    });
      tower.betAmt(currentAddr).call().then((result) => {
        var val = result.toNumber();
        
        var datar1 =  (val * 120) /100;
    document.getElementById("sec10").textContent = datar1/1e6;
    document.getElementById("sec11").textContent = datar1/1e6;
     var datar1 =  (val * 160) /100;
    document.getElementById("sec20").textContent = datar1/1e6;
    document.getElementById("sec21").textContent = datar1/1e6;
     var datar1 =  (val * 200) /100;
    document.getElementById("sec30").textContent = datar1/1e6;
    document.getElementById("sec31").textContent = datar1/1e6;
     var datar1 =  (val * 300) /100;
    document.getElementById("sec40").textContent = datar1/1e6;
    document.getElementById("sec41").textContent = datar1/1e6;
     

    });
    
    
    


}
function getEvent() {
     tower.onBet().watch((err, {result}) => {
        if (err) return console.error('Failed to bind event listener:', err);
        console.log(result);
    });
}

function updatedata() {
    tower.userBet(currentAddr).call().then((result) => {
        var data = result.GameId;
        var level = result.level.toNumber();
        var previouslvl = level - 1;
        var tab = 'r' + level;

        console.log(tab);
        if (level == 0) {
            $('.winwin').hide();
            $('.start').show();
            $('.cashout').hide();
            $('#r4').removeClass('act_tab')
            $('#r3').removeClass('act_tab')
            $('#r2').removeClass('act_tab')
            $('#r1').removeClass('act_tab')
            $('.sec1').removeClass('active')
            $('.sec2').removeClass('active')
            $('.sec3').removeClass('active')
            $('.sec4').removeClass('active')
            $('.selectors').addClass('opc')
          //  $('.selectors').innerHTML = '0';
            $('.selectors').text('0.000');


        } else if (level == 1) {
           
            $('.selectors').removeClass('opc')
            $('.start').hide();
            $('.cashout').show();
            $('#r1').addClass('act_tab')
            $('.sec1').addClass('active')

            $('#r4').removeClass('act_tab')
            $('#r3').removeClass('act_tab')
            $('#r2').removeClass('act_tab')
            // $('#r1').removeClass('act_tab')
            //  $('.sec1').removeClass('active')
            $('.sec2').removeClass('active')
            $('.sec3').removeClass('active')
            $('.sec4').removeClass('active')
        } else if (level == 2) {
            $('#id1').show();
            $('.start').hide();
            $('.cashout').show();
            $('#r2').addClass('act_tab')
            $('.sec2').addClass('active')

            $('#r4').removeClass('act_tab')
            $('#r3').removeClass('act_tab')
            //  $('#r2').removeClass('act_tab')
            $('#r1').removeClass('act_tab')
            $('.sec1').removeClass('active')
            // $('.sec2').removeClass('active')
            $('.sec3').removeClass('active')
            $('.sec4').removeClass('active')
        } else if (level == 3) {
              $('#id2').show();
            $('.start').hide();
            $('.cashout').show();
            $('#r3').addClass('act_tab')
            $('.sec3').addClass('active')

            $('#r4').removeClass('act_tab')
            //  $('#r3').removeClass('act_tab')
            $('#r2').removeClass('act_tab')
            $('#r1').removeClass('act_tab')
            $('.sec1').removeClass('active')
            $('.sec2').removeClass('active')
            //   $('.sec3').removeClass('active')
            $('.sec4').removeClass('active')
        } else if (level == 4) {
            $('#id3').show();
            $('.start').hide();
            $('.cashout').show();
            $('#r4').addClass('act_tab')
            $('.sec4').addClass('active')

            // $('#r4').removeClass('act_tab')
            $('#r3').removeClass('act_tab')
            $('#r2').removeClass('act_tab')
            $('#r1').removeClass('act_tab')
            $('.sec1').removeClass('active')
            $('.sec2').removeClass('active')
            $('.sec3').removeClass('active')
            // $('.sec4').removeClass('active')
        }

    });
}
/*
$("#trxEnabled").click(function () {
  document.getElementById("fragEnabled").checked = false;
  document.getElementById("trxEnabled").checked = true;
  document.getElementById("bankrEnabled").checked = false;
});
          
          
$("#r1").click(function () {
    $(".tab1").removeClass(act_tab);
  
});
  $("#trxEnabled").click(function () {
  document.getElementById("fragEnabled").checked = false;
  document.getElementById("trxEnabled").checked = true;
  document.getElementById("bankrEnabled").checked = false;
});
  */

function showwin() {
      $('.winwin').toggle();
}

function startgame() {
    tower
        .startGame(1)
        .send({
            callValue: 10000000,
        })
        .then((result) => {
            updatedata();
        })
        .catch((err) => {

            console.log(err);
        });

}
function cashout() {
    tower
        .cashout()
        .send({
            
        })
        .then((result) => {
            updatedata();
        })
        .catch((err) => {

            console.log(err);
        });

}


function startgame() {
    tower
        .startGame(1)
        .send({
            callValue: 100000000,
        })
        .then((result) => {
            updatedata();
        })
        .catch((err) => {

            console.log(err);
        });

}


async function dataevent(num) {
   
        
        await tower.onBet().watch((err, event) => {
        if (err) {
            return console.error('Error with "method" event:', err);
        }
        if (event && calledEvent == true) {
            console.log('here is event',event)
            var address = tronWeb.address.fromHex(event.result.customerAddress.toString());
            var levelid = event.result.levelid;
            var selectedid = event.result.selectedid;
            var won = event.result.won;
             var pr = (event.result.prize)/1e6;
           calledEvent = false;  
            
            console.log('calledEvent', calledEvent);
            updatedata();
            console.log(won);
            var bg ;
            if(selectedid == won){
                bg = 'win'
              }
            else{
                bg = 'loss'
            }
            
            var dataAdd = address.substring(0, 5) +'...'+ address.substring(5, 10);
          
            $("#historydata").prepend('<div class="datahis '+bg+'"><div>'+ dataAdd + '</div><div>'+levelid+ '</div><div>' + selectedid + '</div><div>'+won+ '</div><div>'+pr+'</div></div>').fadeIn('slow');
   }
    });
      
  
    
}


$('#buy').on('keyup input', function() {
    var val = document.getElementById("buy").value;
    var datar1 =  (val * 120) /100;
    document.getElementById("sec10").textContent = datar1;
    document.getElementById("sec11").textContent = datar1;
     var datar1 =  (val * 160) /100;
    document.getElementById("sec20").textContent = datar1;
    document.getElementById("sec21").textContent = datar1;
     var datar1 =  (val * 200) /100;
    document.getElementById("sec30").textContent = datar1;
    document.getElementById("sec31").textContent = datar1;
     var datar1 =  (val * 300) /100;
    document.getElementById("sec40").textContent = datar1;
    document.getElementById("sec41").textContent = datar1;
     

});

function buildTower(data) {
    tower
        .buildTower(1, data)
        .send({

        })
        .then((result) => {
            calledEvent = true;
            dataevent(data);
 
        })
        .catch((err) => {

            console.log(err);
        });

}

function placebet() {
    var amt = document.getElementById("buy").value;
    var data = amt * 1e6;
    var id = 1;
    tower
        .startGame(id)
        .send({
            callValue: data,
        })
        .then((result) => {
            console.log('data', result);
        })
        .catch((err) => {
            console.log(err);
        });
}

main();