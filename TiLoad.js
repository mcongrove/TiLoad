var TiLoad = {
	visible: false,
	init: function(_properties) {
		var options;
		
		if(_properties && _properties.rotate) {
			options = {
				orientationModes: [
					Titanium.UI.LANDSCAPE_LEFT,
					Titanium.UI.LANDSCAPE_RIGHT,
					Titanium.UI.PORTRAIT,
					Titanium.UI.UPSIDE_PORTRAIT
				]
			};
		} else {
			options = {};
		}
		
		TiLoad.window = Ti.UI.createWindow(options);
		
		TiLoad.view = Ti.UI.createView({
			width: "100%",
			height: "100%",
			top: 0,
			left: 0,
			backgroundColor: "transparent"
		});
		
		TiLoad.background = Ti.UI.createView({
			width: "100%",
			height: "100%",
			top: 0,
			left: 0,
			backgroundColor: "#000",
			opacity: 0.8
		});
		
		TiLoad.spinner = Ti.UI.createActivityIndicator({
			width: "100%",
			height: "100%",
			top: 0,
			left: 0
		});
		
		if(Ti.Platform.osname == "iphone") {
			TiLoad.spinner.style = Titanium.UI.iPhone.ActivityIndicatorStyle.BIG;
		}
		
		TiLoad.view.addEventListener("click", TiLoad.hide, false);
		TiLoad.background.addEventListener("click", TiLoad.hide, false);
		TiLoad.spinner.addEventListener("click", TiLoad.hide, false);
		Ti.Gesture.addEventListener("orientationchange", TiLoad.size, false);
		
		TiLoad.spinner.show();
		TiLoad.view.add(TiLoad.background);
		TiLoad.view.add(TiLoad.spinner);
		TiLoad.window.add(TiLoad.view);
	},
	show: function() {
		TiLoad.size();
		
		if(!TiLoad.visible) {
			TiLoad.window.open();
		}
		
		TiLoad.visible = true;
	},
	hide: function() {
		if(TiLoad.visible) {
			TiLoad.window.close();
		}
		
		TiLoad.visible = false;
	},
	size: function(_event) {
		TiLoad.window.width = Titanium.Platform.displayCaps.platformWidth;
		TiLoad.window.height = Titanium.Platform.displayCaps.platformHeight;
	}
};