
const St = imports.gi.St;
const Config = imports.misc.config;
const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const PopupMenu = imports.ui.popupMenu;

const Gettext = imports.gettext.domain('battery-power-statistics-shortcut');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;

let item, battery, battMenu;

function _onPowerStatsActivate() {
    Main.overview.hide();
    let batt = Shell.AppSystem.get_default().lookup_app('gnome-power-statistics.desktop');
    batt.activate();
}

function enable() {
    item = new PopupMenu.PopupMenuItem(_("Power Statistics"));
    item.connect('activate', Lang.bind(item, _onPowerStatsActivate));
    let nItems = battery.numMenuItems;
    if (battMenu.battery != null) {
    battery.addMenuItem(item, nItems - 1);
	} else {
    battery.addMenuItem(item);
    }
}

function disable() {
    if (item) {
        item.destroy();
    }
}


let age;

function init() {
    initTranslations("battery-power-statistics-shortcut");

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
        default: throw new Error("Strange version number (extension.js:50).");
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

/**
 * initTranslations:
 * @domain: (optional): the gettext domain to use
 *
 * Initialize Gettext to load translations from extensionsdir/locale.
 * If @domain is not provided, it will be taken from metadata['gettext-domain']
 */
function initTranslations(domain) {
    let extension = ExtensionUtils.getCurrentExtension();

    domain = domain || extension.metadata['gettext-domain'];

    // check if this extension was built with "make zip-file", and thus
    // has the locale files in a subfolder
    // otherwise assume that extension has been installed in the
    // same prefix as gnome-shell
    let localeDir = extension.dir.get_child('locale');
    if (localeDir.query_exists(null))
        imports.gettext.bindtextdomain(domain, localeDir.get_path());
    else
        imports.gettext.bindtextdomain(domain, Config.LOCALEDIR);
}
