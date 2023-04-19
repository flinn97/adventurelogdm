import flinnApps from "./flinnAppsNav";
import LegatoNav from "./legatoNav";
import LegatoNavDark from "./legatoNavDark";
import MinimalNav from "./minimalNav";
import DefaultNav from "./defaultNav.js";
import minimalNav from "./minimalNav";

class NavThemeFactory {
    operationsFactory;

    factory = {

        legato: LegatoNav.getNavTheme(),
        legatoDark: LegatoNavDark.getNavTheme(),
        flinnApps: flinnApps.getNavTheme(),
        minimal: minimalNav.getNavTheme(),
        default: DefaultNav.getNavTheme(),
        flinnDoc: LegatoNavDark.getNavTheme()
    }

    registerComponents(register) {
        this.factory[register.name] = register.component;
    }
    getNavThemeFactory() {
        return this.factory;
    }
    reloadComponents() {
        this.factory = {
            legato: LegatoNav.getNavTheme(),
            legatoDark: LegatoNavDark.getNavTheme(),
            flinnApps: flinnApps.getNavTheme(),
            minimal: minimalNav.getNavTheme(),
            default: DefaultNav.getNavTheme(),
        }
    }


}
export default new NavThemeFactory();