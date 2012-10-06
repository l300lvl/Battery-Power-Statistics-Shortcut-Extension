
const St = imports.gi.St;
const Config = imports.misc.config;
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


let age, battMenu;

function init() {
    let current_version = Config.PACKAGE_VERSION.split('.');
    if (current_version.length != 3 || current_version[0] != 3) throw new Error("Strange version number (extension.js:35).");
    
    switch (current_version[1]) {
        case"2": global.log("Warning of extension [" + metadata.uuid + "]:\n              Old development release detected (" + Config.PACKAGE_VERSION + "). You should upgrade!\n");   //eak
        case"3":  ;
        case"4": age = "old";
            break;
        case"5": global.log("Warning of extension [" + metadata.uuid + "]:\n              Development release detected (" + Config.PACKAGE_VERSION + "). Loading as a 3.6 release.\n"); //eak
        case"6": age = "new";
            break;
        default: throw new Error("Strange version number (extension.js:45).");
    }

    if (age=="old") battMenu = Main.panel._statusArea;
    else            battMenu = Main.panel.statusArea;

// if function burrowed from https://github.com/Mystro256/gnome-shell-extension-inhibit-applet/commit/58c06b7ab2f608167f4ede4b847681bd7586d016
    if (battMenu.battery != null) {
        battery = battMenu.battery.menu;
	} else if (battMenu.systemMonitor != null) {
	battery = battMenu.systemMonitor.menu;
	} else if (battMenu.system-monitor != null) {
	battery = battMenu.system-monitor.menu;
	} else {
	battery = battMenu.userMenu.menu;
    }
}
