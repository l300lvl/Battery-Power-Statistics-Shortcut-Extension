
const St = imports.gi.St;
const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const PopupMenu = imports.ui.popupMenu;

let item, battery;

function _onPowerStatsActivate() {
    Main.overview.hide();
    let app = Shell.AppSystem.get_default().lookup_app('gnome-power-statistics.desktop');
    app.activate();
}

function init() {
// if function burrowed from https://github.com/Mystro256/gnome-shell-extension-inhibit-applet/commit/58c06b7ab2f608167f4ede4b847681bd7586d016
//    battery = Main.panel._statusArea.battery.menu;

//    battery = Main.panel._statusArea.battery;
//	    let temp = Main.panel._statusArea.battery._deviceItems;
//	    if(temp == "")
//	    {//check for no battery or power device, i.e. no power menu
//	        lettemp = new Main.Panel.STANDARD_STATUS_AREA_SHELL_IMPLEMENTATION["a11y"]
	        if (Main.panel._statusArea.battery != null) {
	            battery = Main.panel._statusArea.battery.menu;
	        } else {
	            battery = Main.panel._statusArea.systemMonitor.menu;
	        }
//	    }
}

function enable() {
    item = new PopupMenu.PopupMenuItem(_("Power Statistics"));
    item.connect('activate', Lang.bind(item, _onPowerStatsActivate));
    let nItems = battery.numMenuItems;
    battery.addMenuItem(item, nItems - 1);
}

function disable() {
    if (item) {
        item.destroy();
    }
}
