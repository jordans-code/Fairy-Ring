
function alchemy(settings) {
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