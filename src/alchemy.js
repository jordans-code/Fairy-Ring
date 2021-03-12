function customstorebuy() {
	try {
	dustshopinject()
	document.getElementById('shopinjectorsend').addEventListener('click', function() {
		var amount = document.getElementById('shopinjectornum').value
		sendit(amount);
	});
	} catch(e) {
		console.log("Error injecting the custom dust buying box")
		console.log(e);
	}
}

function dustshopinject() {
	$('#shopdetail').parent().append(`<table id="shopinjecttable"><tr><td valign="top"><div id='customshopinject' style="position: relative;pointer-events:none; height: 300px;"></td></tr><tr><td valign="bottom"><center>
	<div id='customshopinject2' style="position: absolute; color:black; height: 10px; bottom: 0; right: 0;  left: 0;">
	New Fairy Ring feature! To buy a custom amount of dust: <br>1. Type in any amount in the box below. <b>Be careful, there is no limit</b>.<br>2. Click "set" <br>3. Then click buy on the dust you want!<br><br>
	<input id="shopinjectornum" type="number" min="1" max="5000" value="1" style="width: 50px">  
	<button id="shopinjectorsend" class="shopinputsubmit">Set</button>
	<br>
	<br>
	<b>Caution:</b> Do not try to input a negative number or it will delete the amount you specified and still charge you!
	<br>Always double check your amount before buying, I am not responsible if you buy too much and bankrupt yourself :)
	<br>Also I sadly cannot add this to the garden pages due to how fairyland works (it shares the shop page with the food/pot store). <br>Trust me, I spent 3 hours trying but it would hurt loading speeds to be able to do it.
	</div></div></center></td></tr></table>`)
}

function sendit(amount) {
	var option = `<option value="${amount}"> ${amount}</option>`;
	$('#qty4').append(option)
	$('#qty4').val(amount)
	$('#qty5').append(option)
	$('#qty5').val(amount)
	$('#qty6').append(option)
	$('#qty6').val(amount)
	$('#qty7').append(option)
	$('#qty7').val(amount)
	$('#qty9').append(option)
	$('#qty9').val(amount)
	$('#qty10').append(option)
	$('#qty10').val(amount)
	$('#qty16').append(option)
	$('#qty16').val(amount)
}

function alchemy(settings) {
	customstorebuy();
	if (settings.alchemybutton) {
		var recipebutton = '<center><input id="okbutton2" type="submit" class="inputsubmit" value="Try Recipe!"></center>'
		$('#okbutton').parents().eq(0).prepend(recipebutton);
		// Step 1 1-4
		$("#" +settings.step1choice).children().eq(0).click()
		// Step 2 
		$("#" +settings.step2choice).children().eq(0).click()
		// Step 3 12-15
		$("#" +settings.step3choice).children().eq(0).click()
		// Step 4 0, 1, 2, 3, 8
		$("#" + settings.step4choice).children().eq(0).click()
		$('#okbutton2').on("click", function() {  // Normal water button
				$('#okbutton').click();
		});
	}
}

function alchemyresult(settings) {
	if (settings.alchemybutton) {
	var disclaimer = '<br><br><center>Note: the gold has already been added. Click above to head back.<br></center>';
	var backbutton = '<center><a class="inputsubmit" href="alchemy.php">Try Alchemy Again?</a></center>';
	$('#pot').parents().eq(1).prepend(disclaimer);
	$('#pot').parents().eq(1).prepend(backbutton);
	}
}