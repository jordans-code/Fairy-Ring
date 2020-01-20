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

function getcolor(settings, type, i) { // takes a percentage and matches it to the thresholds set by user
	
	switch(type) {
		case "NormalGlow":
			var colorvar = "threshold";
			break;
		case "WindowGlow":
			var colorvar = "Windowthreshold";
			break;
		case "NormalText":
			var colorvar = "TextColorthreshold";
			break;
		case "WindowText":
			var colorvar = "WindowTextColorthreshold";
			break;
	}
	return '#' + settings[`${colorvar}${i}c`];
}

function setcolor(i, color, glowcolor, type) {
	$(`#${type}${i}s`).css('textShadow',`-1px -1px 0 ${glowcolor},1px -1px 0 ${glowcolor},-1px 1px 0 ${glowcolor},1px 1px 0 ${glowcolor}`);
	$(`#${type}${i}s`).css('color',`${color}`);
}

function getallsamples(settings) {
	for (i=1; i < 7; i++) {
		var Ninnercolor = getcolor(settings, "NormalText", i);
		var Nglowcolor = getcolor(settings, "NormalGlow", i);
		var Winnercolor = getcolor(settings, "WindowText", i);
		var Wglowcolor = getcolor(settings, "WindowGlow", i);
		setcolor(i, Ninnercolor, Nglowcolor, "threshold");
		setcolor(i, Winnercolor, Wglowcolor, "Windowthreshold");
	}
}

function save_options() {
  var hidenofood = document.getElementById('hidenofood').checked;
  var homepageExtraBtns = document.getElementById('homepageExtraBtns').checked;
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
  var flid = document.getElementById('flid').value;
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
  var msglowercase = document.getElementById('msglowercase').checked;
  var customcritterdata = document.getElementById('customcritterdata').value;
  var customcritternames = document.getElementById('customcritternames').checked;
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
  var TextColorthreshold1c = document.getElementById('TextColorthreshold1c').value;
  var TextColorthreshold2c = document.getElementById('TextColorthreshold2c').value;
  var TextColorthreshold3c = document.getElementById('TextColorthreshold3c').value;
  var TextColorthreshold4c = document.getElementById('TextColorthreshold4c').value;
  var TextColorthreshold5c = document.getElementById('TextColorthreshold5c').value;
  var TextColorthreshold6c = document.getElementById('TextColorthreshold6c').value;
  var threshold1border = document.getElementById('threshold1border').value;
  var threshold2border = document.getElementById('threshold2border').value;
  var threshold3border = document.getElementById('threshold3border').value;
  var threshold4border = document.getElementById('threshold4border').value;
  var threshold5border = document.getElementById('threshold5border').value;
  var threshold6border = document.getElementById('threshold6border').value;
  
  var Windowthreshold1 = document.getElementById('Windowthreshold1').value; 
  var Windowthreshold2 = document.getElementById('Windowthreshold2').value;
  var Windowthreshold3 = document.getElementById('Windowthreshold3').value;
  var Windowthreshold4 = document.getElementById('Windowthreshold4').value;
  var Windowthreshold5 = document.getElementById('Windowthreshold5').value;
  var Windowthreshold1c = document.getElementById('Windowthreshold1c').value;
  var Windowthreshold2c = document.getElementById('Windowthreshold2c').value;
  var Windowthreshold3c = document.getElementById('Windowthreshold3c').value;
  var Windowthreshold4c = document.getElementById('Windowthreshold4c').value;
  var Windowthreshold5c = document.getElementById('Windowthreshold5c').value;
  var Windowthreshold6c = document.getElementById('Windowthreshold6c').value;
  var WindowTextColorthreshold1c = document.getElementById('WindowTextColorthreshold1c').value;
  var WindowTextColorthreshold2c = document.getElementById('WindowTextColorthreshold2c').value;
  var WindowTextColorthreshold3c = document.getElementById('WindowTextColorthreshold3c').value;
  var WindowTextColorthreshold4c = document.getElementById('WindowTextColorthreshold4c').value;
  var WindowTextColorthreshold5c = document.getElementById('WindowTextColorthreshold5c').value;
  var WindowTextColorthreshold6c = document.getElementById('WindowTextColorthreshold6c').value;
  // alchemy
  var alchemybutton = document.getElementById('alchemybutton').checked;
  var step1choice = document.getElementById('step1choice').value; 
  var step2choice = document.getElementById('step2choice').value; 
  var step3choice = document.getElementById('step3choice').value; 
  var step4choice = document.getElementById('step4choice').value; 
  // Games
  var automushroom = document.getElementById('automushroom').checked;
  var mushroomgameamount = document.getElementById('mushroomgameamount').value; 
  //darkmode
  var darkmode = document.getElementById('darkmode').checked;
  chrome.storage.sync.set({
	hidenofood: hidenofood,
	homepageExtraBtns: homepageExtraBtns,
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
	flid: flid,
	
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
	msglowercase: msglowercase,
	customcritternames: customcritternames,
	customcritterdata: customcritterdata,
	
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
	TextColorthreshold1c: TextColorthreshold1c,
	TextColorthreshold2c: TextColorthreshold2c,
	TextColorthreshold3c: TextColorthreshold3c,
	TextColorthreshold4c: TextColorthreshold4c,
	TextColorthreshold5c: TextColorthreshold5c,
	TextColorthreshold6c: TextColorthreshold6c,
	threshold1border: threshold1border,
	threshold2border: threshold2border,
	threshold3border: threshold3border,
	threshold4border: threshold4border,
	threshold5border: threshold5border,
	threshold6border: threshold6border,
	
	Windowthreshold1: Windowthreshold1,
	Windowthreshold2: Windowthreshold2,
	Windowthreshold3: Windowthreshold3,
	Windowthreshold4: Windowthreshold4,
	Windowthreshold5: Windowthreshold5,
	Windowthreshold1c: Windowthreshold1c,
	Windowthreshold2c: Windowthreshold2c,
	Windowthreshold3c: Windowthreshold3c,
	Windowthreshold4c: Windowthreshold4c,
	Windowthreshold5c: Windowthreshold5c,
	Windowthreshold6c: Windowthreshold6c,
	WindowTextColorthreshold1c: WindowTextColorthreshold1c,
	WindowTextColorthreshold2c: WindowTextColorthreshold2c,
	WindowTextColorthreshold3c: WindowTextColorthreshold3c,
	WindowTextColorthreshold4c: WindowTextColorthreshold4c,
	WindowTextColorthreshold5c: WindowTextColorthreshold5c,
	WindowTextColorthreshold6c: WindowTextColorthreshold6c,
	
	alchemybutton: alchemybutton,
	step1choice: step1choice,
	step2choice: step2choice,
	step3choice: step3choice,
	step4choice: step4choice,
	
	automushroom: automushroom,
	mushroomgameamount: mushroomgameamount,
	// dark mode
	darkmode: darkmode
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
	document.getElementById("sampletext").value = (formatmessage({"customcritternames": customcritternames, "customcritterdata": customcritterdata, "msglowercase": msglowercase, "pdtext": pdtext, "msg": msg, "newspotmsg": newspotmsg, "newmsgtext": newmsgtext, "debug": debug, "automsg": automsg}, {"pd": samplepd}, [samplecritter1, samplecritter2, samplecritter3, samplecritter4], {"pd": false}));
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
	document.getElementById('homepageExtraBtns').checked = items.homepageExtraBtns;
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
	document.getElementById('flid').value = items.flid;
	
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
	document.getElementById('msglowercase').checked = items.msglowercase;
	document.getElementById('customcritterdata').value = items.customcritterdata;
	document.getElementById('customcritternames').checked = items.customcritternames;
	
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
	document.getElementById("TextColorthreshold1c").value = items.TextColorthreshold1c;
	document.getElementById("TextColorthreshold2c").value = items.TextColorthreshold2c;
	document.getElementById("TextColorthreshold3c").value = items.TextColorthreshold3c;
	document.getElementById("TextColorthreshold4c").value = items.TextColorthreshold4c;
	document.getElementById("TextColorthreshold5c").value = items.TextColorthreshold5c;
	document.getElementById("TextColorthreshold6c").value = items.TextColorthreshold6c;
	document.getElementById("threshold1border").value = items.threshold1border;
	document.getElementById("threshold2border").value = items.threshold2border;
	document.getElementById("threshold3border").value = items.threshold3border;
	document.getElementById("threshold4border").value = items.threshold4border;
	document.getElementById("threshold5border").value = items.threshold5border;
	document.getElementById("threshold6border").value = items.threshold6border;
	
	
	document.getElementById("Windowthreshold1").value = items.Windowthreshold1;
	document.getElementById("Windowthreshold2").value = items.Windowthreshold2;
	document.getElementById("Windowthreshold3").value = items.Windowthreshold3;
	document.getElementById("Windowthreshold4").value = items.Windowthreshold4;
	document.getElementById("Windowthreshold5").value = items.Windowthreshold5;
	document.getElementById("Windowthreshold1c").value = items.Windowthreshold1c;
	document.getElementById("Windowthreshold2c").value = items.Windowthreshold2c;
	document.getElementById("Windowthreshold3c").value = items.Windowthreshold3c;
	document.getElementById("Windowthreshold4c").value = items.Windowthreshold4c;
	document.getElementById("Windowthreshold5c").value = items.Windowthreshold5c;
	document.getElementById("Windowthreshold6c").value = items.Windowthreshold6c;
	document.getElementById("WindowTextColorthreshold1c").value = items.WindowTextColorthreshold1c;
	document.getElementById("WindowTextColorthreshold2c").value = items.WindowTextColorthreshold2c;
	document.getElementById("WindowTextColorthreshold3c").value = items.WindowTextColorthreshold3c;
	document.getElementById("WindowTextColorthreshold4c").value = items.WindowTextColorthreshold4c;
	document.getElementById("WindowTextColorthreshold5c").value = items.WindowTextColorthreshold5c;
	document.getElementById("WindowTextColorthreshold6c").value = items.WindowTextColorthreshold6c;
	
	document.getElementById('alchemybutton').checked = items.alchemybutton;
	document.getElementById("step1choice").value = items.step1choice;
	document.getElementById("step2choice").value = items.step2choice;
	document.getElementById("step3choice").value = items.step3choice;
	document.getElementById("step4choice").value = items.step4choice;
	
	document.getElementById("blocktotal").value = items.blocktotal;
	document.getElementById("blockid").value = items.blockid;
	document.getElementById("automushroom").checked = items.automushroom;
	document.getElementById("mushroomgameamount").value = items.mushroomgameamount;
	
	document.getElementById("darkmode").checked = items.darkmode;
	
	$('#threshold1c').css('background-color', getrgb(items.threshold1c));
	$('#threshold2c').css('background-color', getrgb(items.threshold2c));
	$('#threshold3c').css('background-color', getrgb(items.threshold3c));
	$('#threshold4c').css('background-color', getrgb(items.threshold4c));
	$('#threshold5c').css('background-color', getrgb(items.threshold5c));
	$('#threshold6c').css('background-color', getrgb(items.threshold6c));
	$('#TextColorthreshold1c').css('background-color', getrgb(items.TextColorthreshold1c));
	$('#TextColorthreshold2c').css('background-color', getrgb(items.TextColorthreshold2c));
	$('#TextColorthreshold3c').css('background-color', getrgb(items.TextColorthreshold3c));
	$('#TextColorthreshold4c').css('background-color', getrgb(items.TextColorthreshold4c));
	$('#TextColorthreshold5c').css('background-color', getrgb(items.TextColorthreshold5c));
	$('#TextColorthreshold6c').css('background-color', getrgb(items.TextColorthreshold6c));
	$('#Windowthreshold1c').css('background-color', getrgb(items.Windowthreshold1c));
	$('#Windowthreshold2c').css('background-color', getrgb(items.Windowthreshold2c));
	$('#Windowthreshold3c').css('background-color', getrgb(items.Windowthreshold3c));
	$('#Windowthreshold4c').css('background-color', getrgb(items.Windowthreshold4c));
	$('#Windowthreshold5c').css('background-color', getrgb(items.Windowthreshold5c));
	$('#Windowthreshold6c').css('background-color', getrgb(items.Windowthreshold6c));
	$('#WindowTextColorthreshold1c').css('background-color', getrgb(items.WindowTextColorthreshold1c));
	$('#WindowTextColorthreshold2c').css('background-color', getrgb(items.WindowTextColorthreshold2c));
	$('#WindowTextColorthreshold3c').css('background-color', getrgb(items.WindowTextColorthreshold3c));
	$('#WindowTextColorthreshold4c').css('background-color', getrgb(items.WindowTextColorthreshold4c));
	$('#WindowTextColorthreshold5c').css('background-color', getrgb(items.WindowTextColorthreshold5c));
	$('#WindowTextColorthreshold6c').css('background-color', getrgb(items.WindowTextColorthreshold6c));
	var color = "#FFBFB3";
	if (items.flid.length == 0) { $('#divflid').css('background-color', color)}
	if (!items.hidenofood) { $('#divhidenofood').css('background-color', color)}
	if (!items.homepageExtraBtns) { $('#divhomepageExtraBtns').css('background-color', color)}
	if (!items.colorgardentext) { $('#divcolorgardentext').css('background-color', color)}
	if (!items.foodoverlay) { $('#divfoodoverlay').css('background-color', color)}
	if (!items.toprightchance) { $('#divtoprightchance').css('background-color', color)}
	if (!items.colorborder) { $('#divcolorborder').css('background-color', color)}
	if (!items.colorwindow) { $('#divcolorwindow').css('background-color', color)}
	if (!items.waterbutton) { $('#divwaterbutton').css('background-color', color)}
	if (!items.gardenExtraBtns) { $('#divextraBtns').css('background-color', color)}
	if (!items.biggerBtns) { $('#divbiggerBtns').css('background-color', color)}
	if (!items.autosnail) { $('#divautosnail').css('background-color', color)}
	if (!items.automsg) { $('#divautomsg').css('background-color', color)
	} else if (!items.msglowercase) { $('#divmsglowercase').css('background-color', color)}
	if (!items.customcritternames) { $('#divcustomcritternames').css('background-color', color)}
	if (!items.newspotmsg) { $('#divnewspotmsg').css('background-color', color)}
	if (!items.debug) { $('#divdebug').css('background-color', color)}
	if (!items.alchemybutton) { $('#divalchemybutton').css('background-color', color)}
	if (!items.automushroom) { $('#divautomushroom').css('background-color', color)}
	if (!items.darkmode) { $('#divdarkmode').css('background-color', color)}
	getallsamples(items);
	document.getElementById("sampletext").value = (formatmessage(items, {"msglowercase": items.msglowercase, "pd": items.samplepd}, [items.samplecritter1, items.samplecritter2, items.samplecritter3, items.samplecritter4], {"pd": false}));
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

var coll = document.getElementsByClassName("collapsible");

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('clearcheck').addEventListener('click', function() {
	clear_settingscheck(event);
	});