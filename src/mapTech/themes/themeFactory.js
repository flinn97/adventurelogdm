import { mapping } from "./defaultColumn";
import { rowMapping } from "./defaultRow";
import { rowWrapMapping } from "./defaultRowWrap";
import { interactiveMapTheme } from "./interactiveMapTheme";
import { encMapping } from "./encRow";
import { compendiumRow } from "./compendiumRow";
import "./css/defaultColumn.css";
import "./css/defaultRow.css";
import "./css/defaultRowWrap.css";
import "./css/compendiumRow.css";
import "./css/interactiveMapTheme.css";
import "./css/encManager.css";
import adventureLogStyles from "../../componentListNPM/themes/adventureLogStyles";

/**
 * factory for getting different themes for the map component
 */
export default class ThemeFactory {
    factory = {
        defaultRow: rowMapping,
        defaultColumn: mapping,
        defaultRowWrap:rowWrapMapping,
        defaultColumnWrap:"",
        profile: "",
        backgroundImg: "",
        interactiveMap:interactiveMapTheme,
        fileSystem: "",
        dragChangeOrder: "",
        adventure: adventureLogStyles.getStylesByScreenSize(),
        arrowChangeOrder: "",
        encounterRow: encMapping,
        compendiumRow: compendiumRow,
        formChoiceRow: encMapping,





    }



    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
    getComponent(type) {
        let comp = undefined
        if (this.factory[type]) {
            comp = this.factory[type]

        }
        return comp;

    }

    /**
     * register a new map component.
     * @param {*} type 
     * @param {*} comp 
     */
    registerComponent(type, comp){
        this.factory[type] = comp
    }


}

