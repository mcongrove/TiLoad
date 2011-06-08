Usage
=====

Simply dump the TiLoad directory into your /Resources folder, include, init, and use!

Example
=======

	// Include TiLoad library
	Ti.include("TiLoad/TiLoad.js");
	
	// Initialize TiLoad (param specifies if window rotates with device)
	TiLoad.init({ rotate: false });
	
	// Create a quick test application
	var window = Ti.UI.createWindow({  
		title: "Loading Screen",
		layout: "vertical",
		backgroundColor: "#FFF"
	});
	
	var tab = Ti.UI.createTab({  
		title: "Loading Screen",
		window: window
	});
	
	var button = Ti.UI.createButton({
		width: 280,
		height: 44,
		title: "Show Loading Screen",
		top: 20,
		left: 20
	});
	
	button.addEventListener("click", function(e) {
		// Show the TiLoad screen
		TiLoad.show();
	});
	
	window.add(button);
	var tabGroup = Ti.UI.createTabGroup();
	tabGroup.addTab(tab);  
	tabGroup.open();