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
        tower = await tronWeb.contract().at("TMgGcgfRCDGCExXjmSbDSEXeR3f5YxDtRM");

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



    
    tower.betResults(currentAddr).call().then((result) => {
        var data = result.won.toNumber();
        var data1 = result.random.toNumber();
        document.getElementById("numbe").textContent = data;
        document.getElementById("ran").textContent = data1;

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

async function dataevent(num) {
    await tower.onBet().watch((err, event) => {
        if (err) {
            return console.error('Error with "method" event:', err);
        }
        if (event) {
            console.log(event)
            var address = event.result.customerAddress.toString();
            var levelid = event.result.levelid;
            var selectedid = event.result.selectedid;
            var won = event.result.won;
             updatedata();
            if (levelid == 1) {
                if(num == 1){
                   if (num == won) {
                   updatedata();
                     $('#id1').show();
                     

                } else {

                     

                }
                }
                
                
               else {
                  if (num == won) {
                    document.getElementById("").textContent = "won";
                      updatedata();
                       $('#id1').show();
                       
                } else {

                    
                }
            }
                

            }
            
            

            if (levelid == 2) {
                if(num == 1){
                   if (num == won) {
                      updatedata();
                       $('#id2').show();
                       
                } else {

                    
                }
                }
               else {
                   if (num == won) {
                       updatedata();
                        $('#id2').show();
                        
                } else {

                     
                }
            }
                

            }
            if (levelid == 3) {
                 if(num == 1){
                   if (num == won) {
                        updatedata();
                        $('#id3').show();
                        
                } else {

                    
                }
                }
               else {
                   if (num == won) {
                         updatedata();
                        $('#id3').show();
                       
                } else {

                     
                }
            }
                

            }

            if (levelid == 4) {
                if(num == 1){
                   if (num == won) {
                        updatedata();
                        $('#id4').show();
                          
                } else {

                     
                }
                }
               else {
                   if (num == won) {
                       updatedata();
                        $('#id4').show();
                         
                } else {

                    
                }
            }
                
            }

            console.log(won);




           
        }
    });
}

function buildTower(data) {
    tower
        .buildTower(1, data)
        .send({

        })
        .then((result) => {
            dataevent(data);


            /*
   tower.onBet().watch().then((result) => {
        var level = result.levelid.toNumber();
        var won  = result.levelid.toNumber() ;
        var nextlevl  = result.levelid.toNumber();
        var selectedid  = result.selectedid.toNumber();
         
     if(data == won){
         updatedata();
      }
        
      //  console.log(result);
       });  */
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