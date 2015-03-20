
const St = imports.gi.St;
const Config = imports.misc.config;
const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const PopupMenu = imports.ui.popupMenu;

let age, battMenu;

function init() {
    let current_version = Config.PACKAGE_VERSION.split('.');
    if (current_version.length > 4 || current_version[0] != 3) throw new Error("Strange version number (extension.js:39).");
    
    switch (current_version[1]) {
        case"2": global.log("Warning of extension [" + metadata.uuid + "]:\n              Old development release detected (" + Config.PACKAGE_VERSION + "). You should upgrade!\n");   //eak
        case"3":  ;
        case"4": age = "old";
            break;
        case"5": global.log("Warning of extension [" + metadata.uuid + "]:\n              Development release detected (" + Config.PACKAGE_VERSION + "). Loading as a 3.6 release.\n"); //eak
        case"6": age = "new";
        case"8":  ;
            break;
        case"10": age = "new2";
        case"12":  ;
        case"14":  ;
        case"15":  ;
        case"16":  ;
            break;
        default: throw new Error("Strange version number (extension.js:50).");
    }

    if (age=="old") battMenu = Main.panel._statusArea.battery;
    else if (age=="new") battMenu = Main.panel.statusArea.battery;
    else            battMenu = Main.panel.statusArea.aggregateMenu;

// if function burrowed from https://github.com/Mystro256/gnome-shell-extension-inhibit-applet/commit/58c06b7ab2f608167f4ede4b847681bd7586d016

}

let item;

function _onPowerStatsActivate() {
    Main.overview.hide();
    let batt = Shell.AppSystem.get_default().lookup_app('gnome-power-statistics.desktop');
    batt.activate();
}

function enable() {
    item = new PopupMenu.PopupMenuItem(_("Power Statistics"));
    item.connect('activate', Lang.bind(item, _onPowerStatsActivate));
    let nItems = battMenu.menu.numMenuItems;

    battMenu.menu.addMenuItem(item, 9);

}

function disable() {
    if (item) {
        item.destroy();
    }
}

