addLoadListener()
function setupAjaxEventHandlers() {
    $(document).on("ajaxSend", function() {
        // Remove existing 'scriptvalue' elements when an Ajax request is sent
		// This resets the checkpoint when a garden is watered so that we can wait for ajaxComplete again to indicate it's ready to proceed with the rest of fairyring.
        $("LoadCompleteCheckbox").remove();
    });

    $(document).on("ajaxComplete", function() {
        // Create a new 'scriptvalue' element and set its content when an Ajax request completes
		// This tells the main script that the ajax functions in the garden section are completed and ready for processing. We have to wait for this to return before proceeding or else we can't read things like plants/tables. 
        var scriptvalue = document.createElement('LoadCompleteCheckbox');
        document.head.appendChild(scriptvalue);
    });
}

function addLoadListener() {
	// This runs once on the first time the garden page is loaded. The dom/plants are reliably already loaded upon initial page load, so this just adds the checkbox.
	// It's only what updates on the page itself after loading, such as if you water a plant, that we need to watch for which is why the listeners are added.
	var scriptvalue = document.createElement('LoadCompleteCheckbox');
	document.head.appendChild(scriptvalue);  // Ensure the element is added once the DOM is fully loaded
	setupAjaxEventHandlers();
}