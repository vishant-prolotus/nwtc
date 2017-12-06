$(document).ready(function() {
  var currentToken;
  

    $("#deployToken button").click(function() {
  var num1 = $('#deployToken .numToken').val();
  var num2 = $('#deployToken .nameToken').val();
  var num3 = $('#deployToken .symbolToken').val();
  var num4 = $('#deployToken .decimalToken').val();
      console.log(num1,num2,num3,num4);
      TokenNWTC.deploy([num1,num2,num3,num4]).then(function(deployedToken) {
        console.log(2);
        currentToken = deployedToken;
        console.log(3);
        console.log(currentToken);
        console.log(4);
        $("#deployToken .result").append("<br>Token deployed with address: " + deployedToken.address);
      });
  });

  $("#useToken button").click(function() {
      var address = currentToken.address;
      currentToken = new EmbarkJS.Contract({
        abi: TokenNWTC.abi,
        address: address
      });
  });


  web3.eth.getAccounts(function(err, accounts) {
      $('#queryBalance input').val(accounts[0]);
    });
  $('#queryBalance button').click(function() {
      var address = $('#queryBalance input').val();
      console.log(address);
      currentToken.balanceOf(address).then(function(balance) {
        $('#queryBalance .result').html(balance.toString());
      });
    });
  $('#transfer button').click(function() {
  
    console.log("hi");
      var address = $('#transfer .addressTransfer').val();
      var num = $('#transfer .numTransfer').val();
      currentToken.transfer(address, num).then(function() {
        $('#transfer .result').html('Done!');
      });;
    });
    $('#transferFrom button').click(function() {
      console.log("hi1");
      var addressFrom = $('#transferFrom .addressFrom').val();
      var addressTo = $('#transferFrom .addressTo').val();
      var num = $('#transferFrom .numTransferFrom').val();
      currentToken.transferFrom(addressFrom,addressTo, num).then(function() {
        $('#transferFrom .result').html('Done!');
      });;
    });
    $('#approve button').click(function() {
      var address = $('#approve .addressApprove').val();
      var num = $('#approve .numApprove').val();
      currentToken.approve(address, num).then(function() {
        $('#approve .result').html('Done!');
      });;
    });
      $('#approveAndCall button').click(function() {
      var addOwner = $('#approveAndCall .addressOwner').val();
      var addSpender = $('#approveAndCall .addressSpender').val();
      currentToken.allowance(addOwner, addSpender).then(function() {
        $('#allowance .result').html('Done!');
      });;
    });
      $('#mintToken button').click(function() {
      var address = $('#mintToken .addressMint').val();
      var num = $('#mintToken .numMint').val();
      currentToken.mintToken(address, num).then(function() {
        $('#mintToken .result').html('Done!');
      });;
    });
     $('#freezeAccount button').click(function() {
      var address = $('#freezeAccount .addressFreeze').val();
      var num = $('#freezeAccount .numFreeze').val();
      console.log(address);
      console.log(num);
      currentToken.freezeAccount(address, num).then(function(err) {
        console.log(123);
        console.log(err);
        $('#freezeAccount .result').html('Freez!');
      });;
    });

    $('#freezeAccountEmergency button').click(function() {
      var num = $('#freezeAccountEmergency .numEm').val();
      currentToken.freezeAllAccountInEmergency(num).then(function() {
        $('#freezeAccountEmergency .result').html('Freez!');
      });;
    });

      $('#setPrices button').click(function() {
      var sell = $('#setPrices .sellprice').val();
      var buy = $('#setPrices .buyprice').val();
      currentToken.setPrices(sell, buy).then(function() {
        $('#setPrices .result').html('Done!');
      });;
    });
    $('#owner button').click(function() {
      currentToken.owner().then(function(balance) {
        $('#owner .result').html(balance.toString());
      });;
    });
    $('#supply button').click(function() {
      currentToken.totalSupply().then(function(balance) {
        $('#supply .result').html(balance.toString());
      });;
    });
    $('#readAllUsers button').click(function() {
      currentToken.readAllUsers().then(function(users1) {
        $('#readAllUsers .result').html(users1.toString());
      });;
    });
      $('#readAllFrzAcc button').click(function() {
      currentToken.readAllFrzAcc().then(function(frzAcc1) {
        $('#readAllFrzAcc .result').html(frzAcc1.toString());
      });;
    })

    $('#readSellToken button').click(function() {
      currentToken.readSellTokenAmount().then(function(a) {
        $('#readSellToken .result').html(a.toString());
      });;
    })

      $('#buy button').click(function() {
        var buyAmount = $('#buy .amountBuy').val();
        currentToken.buy({value: web3.toWei(buyAmount,"ether")}).then(function(err) { 
        $('#buy .result').html(err.toString());
      });;
    })
      $('#sell button').click(function() {
        console.log("hi");
        var num = $('#sell .numSell').val();
        console.log(num);
        console.log("hi1");
      currentToken.sell(num).then(function() {
        console.log("h3");
      $('#sell .result').html('Done!');
      });;
    })
  });

