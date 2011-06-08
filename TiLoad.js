var TiLoad = {
	visible: false,
	animOpen: Ti.UI.createAnimation({
		duration: 250,
		opacity: 1
	}),
	animClose: Ti.UI.createAnimation({
		duration: 250,
		opacity: 0
	}),
	init: function(_properties) {
		var options = {
			opacity: 0
		};
		
		if(_properties && _properties.rotate) {
			options.orientationModes = [
				Titanium.UI.LANDSCAPE_LEFT,
				Titanium.UI.LANDSCAPE_RIGHT,
				Titanium.UI.PORTRAIT,
				Titanium.UI.UPSIDE_PORTRAIT
			];
		}
		
		if(_properties && _properties.rotate) {
			Ti.Gesture.addEventListener("orientationchange", TiLoad.size, false);
		}
		
		TiLoad.animClose.addEventListener("complete", function(_event) {
			TiLoad.window.close();
			TiLoad.visible = false;
		});
		
		TiLoad.window	= Ti.UI.createWindow(options);
		TiLoad.view		= Ti.UI.createView({ width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "transparent" });
		TiLoad.overlay	= Ti.UI.createView({ width: "100%", height: "100%", top: 0, left: 0, backgroundColor: "#000", opacity: 0.3 });
		TiLoad.modal	= Ti.UI.createView({ width: 100, height: 100, backgroundColor: "#000", borderRadius: 10 });
		TiLoad.label	= Ti.UI.createLabel({ text: "Loading", top: 60, left: 0, height: 20, width: 100, color: "#FFF", textAlign: "center", font: { fontSize: 13, fontWeight: "bold" } });
		
		if(Ti.Platform.osname == "iphone" || Ti.Platform.osname == "ipad") {
			TiLoad.spinner = Ti.UI.createActivityIndicator({ width: 100, height: 40, top: 20, left: 0, style: Titanium.UI.iPhone.ActivityIndicatorStyle.SMALL });
			TiLoad.spinner.show();
		} else if(Ti.Platform.osname == "android") {
			TiLoad.spinner = Ti.UI.createImageView({ images: [ Ti.Filesystem.resourcesDirectory + "TiLoad/Images/00.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/01.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/02.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/03.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/04.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/05.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/06.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/08.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/09.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/10.png", Ti.Filesystem.resourcesDirectory + "TiLoad/Images/11.png" ], width: 20, height: 20, top: 30, left: 40 });
			TiLoad.spinner.start();
		}
		
		TiLoad.view.add(TiLoad.overlay);
		TiLoad.modal.add(TiLoad.spinner);
		TiLoad.modal.add(TiLoad.label);
		TiLoad.view.add(TiLoad.modal);
		TiLoad.window.add(TiLoad.view);
	},
	show: function() {
		if(!TiLoad.visible) {
			TiLoad.size();
			TiLoad.visible = true;
			TiLoad.window.open(TiLoad.animOpen);
		}
	},
	hide: function() {
		if(TiLoad.visible) {
			TiLoad.window.animate(TiLoad.animClose);
		}
	},
	size: function(_event) {
		TiLoad.window.width = Titanium.Platform.displayCaps.platformWidth;
		TiLoad.window.height = Titanium.Platform.displayCaps.platformHeight;
		
		TiLoad.modal.top = ((TiLoad.window.height - 100) / 2);
		TiLoad.modal.left = ((TiLoad.window.width - 100) / 2);
	}
};