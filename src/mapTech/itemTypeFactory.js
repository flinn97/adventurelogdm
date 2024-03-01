import TextItem from "./textItem";
import AttributeItem from "./attributeItem";
import CustomComponentItem from "./customComponentItem";
import ImgItem from "./imgItem";
import FormItem from "./formItem";
import DelItem from "./del/deleteItem";
import EditItem from "./edit/editItem";
import MapComponentItem from "./mapComponent";
import React from "react";
import DelIconItem from "./del/delCustomItem";
import DelTextItem from "./del/delTextItem";
import DelCustomItem from "./del/delCustomItem";
import EditIconItem from "./edit/editIconItem";
import EditCustomItem from "./edit/editCustomItem";
import UseTheirImgItem from "./useTheirImgItem";
import InteractiveMap from "./interactiveMap/interactiveMapComponent";
import AddComponentButton from "./interactiveMap/addButtonComponent";
import PlainDisplay from "./plainDisplay";
import QuillItem from "./attributeItem";
/**
 * factory for getting different items for the map component
 */
export default class MapFactory {
    factory = {
        text: TextItem,
        attribute: AttributeItem,
        custom: CustomComponentItem,
        img: ImgItem,
        exactImg: UseTheirImgItem,
        form: FormItem,
        del: DelItem,
        delIcon: DelIconItem,
        delCustom:DelCustomItem,
        delText:DelTextItem,
        edit: EditItem,
        editIcon: EditIconItem,
        editCustom: EditCustomItem,
        map: MapComponentItem,
        interactiveMap: InteractiveMap,
        addComponentButton: AddComponentButton,
        plain: PlainDisplay,
        quill: QuillItem,



    }



    /**
     * get a map item
     * @param {*} type 
     * @param {*} obj 
     * @returns a react item for the map
     */
    getComponent(type, props) {
        let Comp = undefined
        if (this.factory[type]) {
            Comp = this.factory[type]

        }
        
        return <Comp  {...props} />;

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

