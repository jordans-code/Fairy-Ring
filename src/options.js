// Saves options to chrome.storage

function hexToRgb(hex) {
	console.log(hex);
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  console.log(result);
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
  var waterbutton = document.getElementById('waterbutton').checked;
  var autosnail = document.getElementById('autosnail').checked;
  var snailchoice = document.getElementById('snailchoice').value;
  var automsg = document.getElementById('automsg').checked;
  var msg = document.getElementById('msg').value;
  var newspotmsg = document.getElementById('newspotmsg').checked;
  var newmsgtext = document.getElementById('newmsgtext').value;
  var debug = document.getElementById('debug').checked;
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
  chrome.storage.sync.set({
	hidenofood: hidenofood,
    colorgardentext: colorgardentext,
	foodoverlay: foodoverlay,
	toprightchance: toprightchance,
	colorborder: colorborder,
	waterbutton: waterbutton,
	autosnail: autosnail,
	snailchoice: snailchoice,
	automsg: automsg,
	msg: msg,
	newspotmsg: newspotmsg,
	newmsgtext: newmsgtext,
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
	threshold6c: threshold6c
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
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
	document.getElementById('waterbutton').checked = items.waterbutton;
	document.getElementById('autosnail').checked = items.autosnail;
	document.getElementById('snailchoice').value = items.snailchoice;
	document.getElementById('automsg').checked = items.automsg;
	document.getElementById('msg').value = items.msg;
	document.getElementById('newspotmsg').checked = items.newspotmsg;
	document.getElementById('newmsgtext').value = items.newmsgtext;
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
	$('#threshold1c').css('background-color', getrgb(items.threshold1c));
	$('#threshold2c').css('background-color', getrgb(items.threshold2c));
	$('#threshold3c').css('background-color', getrgb(items.threshold3c));
	$('#threshold4c').css('background-color', getrgb(items.threshold4c));
	$('#threshold5c').css('background-color', getrgb(items.threshold5c));
	$('#threshold6c').css('background-color', getrgb(items.threshold6c));
	var color = "#FFBFB3";
	if (!items.hidenofood) { $('#divhidenofood').css('background-color', color)}
	if (!items.colorgardentext) { $('#divcolorgardentext').css('background-color', color)}
	if (!items.foodoverlay) { $('#divfoodoverlay').css('background-color', color)}
	if (!items.toprightchance) { $('#divtoprightchance').css('background-color', color)}
	if (!items.colorborder) { $('#divcolorborder').css('background-color', color)}
	if (!items.waterbutton) { $('#divwaterbutton').css('background-color', color)}
	if (!items.autosnail) { $('#divautosnail').css('background-color', color)}
	if (!items.automsg) { $('#divautomsg').css('background-color', color)}
	if (!items.newspotmsg) { $('#divnewspotmsg').css('background-color', color)}
	if (!items.debug) { $('#divdebug').css('background-color', color)}
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