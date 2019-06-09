// Saves options to chrome.storage

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getrgb(hex) {
	var rawrgb = hexToRgb(hex);
	return `rgb(${rawrgb.r}, ${rawrgb.g}, ${rawrgb.b})`
}

function save_options() {
  var hidenofood = document.getElementById('hidenofood').checked;
  var colorgardentext = document.getElementById('colorgardentext').checked;
  var foodoverlay = document.getElementById('foodoverlay').checked;
  var toprightchance = document.getElementById('toprightchance').checked;
  var colorborder = document.getElementById('colorborder').checked;
  var colorwindow = document.getElementById('colorwindow').checked;
  var waterbutton = document.getElementById('waterbutton').checked;
  var gardenExtraBtns = document.getElementById('gardenExtraBtns').checked;
  var biggerBtns = document.getElementById('biggerBtns').checked;
  var biggerBtnsSizeW = document.getElementById('biggerBtnsSizeW').value;
  var biggerBtnsSizeH = document.getElementById('biggerBtnsSizeH').value;
  var autosnail = document.getElementById('autosnail').checked;
  var snailchoice = document.getElementById('snailchoice').value;
  // typer
  var automsg = document.getElementById('automsg').checked;
  var msg = document.getElementById('msg').value;
  var newspotmsg = document.getElementById('newspotmsg').checked;
  var newmsgtext = document.getElementById('newmsgtext').value;
  var pdtext = document.getElementById('pdtext').value;
  var samplepd = document.getElementById('samplepd').checked;
  var samplecritter1 = document.getElementById('samplecritter1').value;
  var samplecritter2 = document.getElementById('samplecritter2').value;
  var samplecritter3 = document.getElementById('samplecritter3').value;
  var samplecritter4 = document.getElementById('samplecritter4').value;
  //
  var debug = document.getElementById('debug').checked;
  // thresholds
  var threshold1 = document.getElementById('threshold1').value; 
  var threshold2 = document.getElementById('threshold2').value;
  var threshold3 = document.getElementById('threshold3').value;
  var threshold4 = document.getElementById('threshold4').value;
  var threshold5 = document.getElementById('threshold5').value;
  var threshold1c = document.getElementById('threshold1c').value;
  var threshold2c = document.getElementById('threshold2c').value;
  var threshold3c = document.getElementById('threshold3c').value;
  var threshold4c = document.getElementById('threshold4c').value;
  var threshold5c = document.getElementById('threshold5c').value;
  var threshold6c = document.getElementById('threshold6c').value;
  
  var pthreshold1 = document.getElementById('pthreshold1').value; 
  var pthreshold2 = document.getElementById('pthreshold2').value;
  var pthreshold3 = document.getElementById('pthreshold3').value;
  var pthreshold4 = document.getElementById('pthreshold4').value;
  var pthreshold5 = document.getElementById('pthreshold5').value;
  var pthreshold1c = document.getElementById('pthreshold1c').value;
  var pthreshold2c = document.getElementById('pthreshold2c').value;
  var pthreshold3c = document.getElementById('pthreshold3c').value;
  var pthreshold4c = document.getElementById('pthreshold4c').value;
  var pthreshold5c = document.getElementById('pthreshold5c').value;
  var pthreshold6c = document.getElementById('pthreshold6c').value;
  // alchemy
  var alchemybutton = document.getElementById('alchemybutton').checked;
  var step1choice = document.getElementById('step1choice').value; 
  var step2choice = document.getElementById('step2choice').value; 
  var step3choice = document.getElementById('step3choice').value; 
  var step4choice = document.getElementById('step4choice').value; 
  // Games
  var automushroom = document.getElementById('automushroom').checked;
  var mushroomgameamount = document.getElementById('mushroomgameamount').value; 
  chrome.storage.sync.set({
	hidenofood: hidenofood,
    colorgardentext: colorgardentext,
	foodoverlay: foodoverlay,
	toprightchance: toprightchance,
	colorborder: colorborder,
	colorwindow: colorwindow,
	waterbutton: waterbutton,
	gardenExtraBtns: gardenExtraBtns,
	biggerBtns: biggerBtns,
	biggerBtnsSizeW: biggerBtnsSizeW,
	biggerBtnsSizeH: biggerBtnsSizeH,
	autosnail: autosnail,
	snailchoice: snailchoice,
	
	automsg: automsg,
	msg: msg,
	newspotmsg: newspotmsg,
	newmsgtext: newmsgtext,
	pdtext: pdtext,
	samplepd: samplepd,
	samplecritter1: samplecritter1,
	samplecritter2: samplecritter2,
	samplecritter3: samplecritter3,
	samplecritter4: samplecritter4,
	
	debug: debug,
	threshold1: threshold1,
	threshold2: threshold2,
	threshold3: threshold3,
	threshold4: threshold4,
	threshold5: threshold5,
	threshold1c: threshold1c,
	threshold2c: threshold2c,
	threshold3c: threshold3c,
	threshold4c: threshold4c,
	threshold5c: threshold5c,
	threshold6c: threshold6c,

	pthreshold1: pthreshold1,
	pthreshold2: pthreshold2,
	pthreshold3: pthreshold3,
	pthreshold4: pthreshold4,
	pthreshold5: pthreshold5,
	pthreshold1c: pthreshold1c,
	pthreshold2c: pthreshold2c,
	pthreshold3c: pthreshold3c,
	pthreshold4c: pthreshold4c,
	pthreshold5c: pthreshold5c,
	pthreshold6c: pthreshold6c,
	
	alchemybutton: alchemybutton,
	step1choice: step1choice,
	step2choice: step2choice,
	step3choice: step3choice,
	step4choice: step4choice,
	
	automushroom: automushroom,
	mushroomgameamount: mushroomgameamount
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
	document.getElementById("sampletext").value = (formatmessage({"pdtext": pdtext, "msg": msg, "newspotmsg": newspotmsg, "newmsgtext": newmsgtext, "debug": debug, "automsg": automsg}, {"pd": samplepd}, [samplecritter1, samplecritter2, samplecritter3, samplecritter4], {"pd": false}));
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get(defaults, function(items) {
	document.getElementById('hidenofood').checked = items.hidenofood;
    document.getElementById('colorgardentext').checked = items.colorgardentext;
	document.getElementById('foodoverlay').checked = items.foodoverlay;
	document.getElementById('toprightchance').checked = items.toprightchance;
	document.getElementById('colorborder').checked = items.colorborder;
	document.getElementById('colorwindow').checked = items.colorwindow;
	document.getElementById('waterbutton').checked = items.waterbutton;
	document.getElementById('gardenExtraBtns').checked = items.gardenExtraBtns;
	document.getElementById('biggerBtns').checked = items.biggerBtns;
	document.getElementById('biggerBtnsSizeW').value = items.biggerBtnsSizeW;
	document.getElementById('biggerBtnsSizeH').value = items.biggerBtnsSizeH;
	document.getElementById('autosnail').checked = items.autosnail;
	document.getElementById('snailchoice').value = items.snailchoice;
	
	document.getElementById('automsg').checked = items.automsg;
	document.getElementById('msg').value = items.msg;
	document.getElementById('newspotmsg').checked = items.newspotmsg;
	document.getElementById('newmsgtext').value = items.newmsgtext;
	document.getElementById('pdtext').value = items.pdtext;
	document.getElementById('samplepd').checked = items.samplepd;
	document.getElementById('samplecritter1').value = items.samplecritter1;
	document.getElementById('samplecritter2').value = items.samplecritter2;
	document.getElementById('samplecritter3').value = items.samplecritter3;
	document.getElementById('samplecritter4').value = items.samplecritter4;
	
	document.getElementById('debug').checked = items.debug;
	document.getElementById("threshold1").value = items.threshold1;
	document.getElementById("threshold2").value = items.threshold2;
	document.getElementById("threshold3").value = items.threshold3;
	document.getElementById("threshold4").value = items.threshold4;
	document.getElementById("threshold5").value = items.threshold5;
	document.getElementById("threshold1c").value = items.threshold1c;
	document.getElementById("threshold2c").value = items.threshold2c;
	document.getElementById("threshold3c").value = items.threshold3c;
	document.getElementById("threshold4c").value = items.threshold4c;
	document.getElementById("threshold5c").value = items.threshold5c;
	document.getElementById("threshold6c").value = items.threshold6c;

	document.getElementById("pthreshold1").value = items.pthreshold1;
	document.getElementById("pthreshold2").value = items.pthreshold2;
	document.getElementById("pthreshold3").value = items.pthreshold3;
	document.getElementById("pthreshold4").value = items.pthreshold4;
	document.getElementById("pthreshold5").value = items.pthreshold5;
	document.getElementById("pthreshold1c").value = items.pthreshold1c;
	document.getElementById("pthreshold2c").value = items.pthreshold2c;
	document.getElementById("pthreshold3c").value = items.pthreshold3c;
	document.getElementById("pthreshold4c").value = items.pthreshold4c;
	document.getElementById("pthreshold5c").value = items.pthreshold5c;
	document.getElementById("pthreshold6c").value = items.pthreshold6c;
	
	document.getElementById('alchemybutton').checked = items.alchemybutton;
	document.getElementById("step1choice").value = items.step1choice;
	document.getElementById("step2choice").value = items.step2choice;
	document.getElementById("step3choice").value = items.step3choice;
	document.getElementById("step4choice").value = items.step4choice;
	
	document.getElementById("blocktotal").value = items.blocktotal;
	document.getElementById("blockid").value = items.blockid;
	document.getElementById("automushroom").checked = items.automushroom;
	document.getElementById("mushroomgameamount").value = items.mushroomgameamount;
	
	
	$('#threshold1c').css('background-color', getrgb(items.threshold1c));
	$('#threshold2c').css('background-color', getrgb(items.threshold2c));
	$('#threshold3c').css('background-color', getrgb(items.threshold3c));
	$('#threshold4c').css('background-color', getrgb(items.threshold4c));
	$('#threshold5c').css('background-color', getrgb(items.threshold5c));
	$('#threshold6c').css('background-color', getrgb(items.threshold6c));
	$('#pthreshold1c').css('background-color', getrgb(items.pthreshold1c));
	$('#pthreshold2c').css('background-color', getrgb(items.pthreshold2c));
	$('#pthreshold3c').css('background-color', getrgb(items.pthreshold3c));
	$('#pthreshold4c').css('background-color', getrgb(items.pthreshold4c));
	$('#pthreshold5c').css('background-color', getrgb(items.pthreshold5c));
	$('#pthreshold6c').css('background-color', getrgb(items.pthreshold6c));
	var color = "#FFBFB3";
	if (!items.hidenofood) { $('#divhidenofood').css('background-color', color)}
	if (!items.colorgardentext) { $('#divcolorgardentext').css('background-color', color)}
	if (!items.foodoverlay) { $('#divfoodoverlay').css('background-color', color)}
	if (!items.toprightchance) { $('#divtoprightchance').css('background-color', color)}
	if (!items.colorborder) { $('#divcolorborder').css('background-color', color)}
	if (!items.colorwindow) { $('#divcolorwindow').css('background-color', color)}
	if (!items.waterbutton) { $('#divwaterbutton').css('background-color', color)}
	if (!items.gardenExtraBtns) { $('#divextraBtns').css('background-color', color)}
	if (!items.biggerBtns) { $('#divbiggerBtns').css('background-color', color)}
	if (!items.autosnail) { $('#divautosnail').css('background-color', color)}
	if (!items.automsg) { $('#divautomsg').css('background-color', color)}
	if (!items.newspotmsg) { $('#divnewspotmsg').css('background-color', color)}
	if (!items.debug) { $('#divdebug').css('background-color', color)}
	if (!items.alchemybutton) { $('#divalchemybutton').css('background-color', color)}
	if (!items.automushroom) { $('#divautomushroom').css('background-color', color)}
	
	document.getElementById("sampletext").value = (formatmessage(items, {"pd": items.samplepd}, [items.samplecritter1, items.samplecritter2, items.samplecritter3, items.samplecritter4], {"pd": false}));
  });
}

function clear_settings(evt) {
	if (evt.currentTarget.id == "clearcheckconfirm") {
	chrome.storage.sync.clear(function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
	restore_options();
	$('#clearcheckconfirm').html('Resetting...');
    setTimeout(function() {
	  save_options();
	  $('#clearcheckconfirm').attr('id', 'clearcheck');
	  $('#clearcheck').html('Reset');
	  document.getElementById('clearcheck').addEventListener('click', function() {
		clear_settingscheck(event);
	});
    }, 550);
	});
}
}

function clear_settingscheck(evt) {
	if (evt.currentTarget.id == "clearcheck") {
	$('#clearcheck').html('Confirm?');
	evt.currentTarget.id += "confirm";
	document.getElementById('clearcheckconfirm').addEventListener('click', function() {
		clear_settings(event);
	});
	}

}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clearcheck').addEventListener('click', function() {
	clear_settingscheck(event);
	});