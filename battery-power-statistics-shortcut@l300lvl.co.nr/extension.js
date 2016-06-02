
const St = imports.gi.St;
const Config = imports.misc.config;
const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;

let age, battMenu;

function init() {
    let current_version = Config.PACKAGE_VERSION.split('.');
    if (current_version.length > 4 || current_version[0] != 3) throw new Error("Strange version number (extension.js:39).");

    switch (current_version[1]) {
        case"2": global.log("Warning of extension [battery-power-statistics-shortcut]:\n              Old development release detected (" + Config.PACKAGE_VERSION + "). You should upgrade!\n");   //eak
        case"3":  ;
        case"4": age = "old";
            break;
        case"5": global.log("Warning of extension [battery-power-statistics-shortcut]:\n              Development release detected (" + Config.PACKAGE_VERSION + "). Loading as a 3.6 release.\n"); //eak
        case"6": ;
        case"8": ;
            age = "new"
            break;
        case"10":  ;
        case"12":  ;
        case"14":  ;
        case"15":  ;
        case"16":  ;
        case"18":  ;
        case"20":  ;
            age = "10+";
            break;
        default: throw new Error("Strange version number (extension.js:50).");
    }

    if (age=="old") battMenu = Main.panel._statusArea.battery.menu;
    else if (age=="new") battMenu = Main.panel.statusArea.battery.menu;
    else if (age=="10+") battMenu = Main.panel.statusArea.aggregateMenu._power.menu.firstMenuItem.menu;
}

let item;

function _onPowerStatsActivate() {
    Main.overview.hide();
    let batt = Shell.AppSystem.get_default().lookup_app('gnome-power-statistics.desktop');
    batt.activate();
}

function enable() {
    item = battMenu.addAction(_("Power Statistics"), _onPowerStatsActivate);
}

function disable() {
    if (item) {
        item.destroy();
    }
}

