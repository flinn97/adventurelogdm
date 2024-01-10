import React, { Component } from 'react';
import DOMPurify from 'dompurify';
import moment from 'moment';
import FormsThemeFactory from '../formThemes/formThemeFactory';
import adventureLogStyles from "../../themes/adventureLogStyles";
import { Link } from 'react-router-dom';
import toolService from '../../../services/toolService';


class RichTextComponent extends Component {
    constructor(props) {
        let styles = adventureLogStyles.getStylesByScreenSize();
        super(props);
        // this.addTag=this.addTag.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkHold = this.checkHold.bind(this);
        this.wrapperRef = React.createRef();
        this.handlePaste = this.handlePaste.bind(this);
        this.setEnterCaret = this.setEnterCaret.bind(this);
        this.replaceHTML = this.replaceHTML.bind(this);
        this.getCurrentCursorPosition = this.getCurrentCursorPosition.bind(this);
        this.ref = React.createRef();
        this.setWrapperRef = this.setWrapperRef;
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            value: this.props.value,
            min: this.props.min,
            max: this.props.max,
            html: <div></div>,
            textHtml: "<div></div>",
            index: 1,
            n: 0,
            m: false,
            l: false,
            d: false,
            e: false,
            f: false,
            pressCTRL: false,
            doubleSpace: false,
            backSlash: false,
            change: false,
            lastChar: "",
            colors: {
                m: 'orange',
                l: 'yellow',
                f: 'green',
                e: 'maroon',
                d: '#FFD700'
            },
            config: {
                ADD_TAGS: ['a'], // Allow link tags
                ADD_ATTR: ['href'], // Allow to attributes

            },
        };
    }

    sanitizedData = (data) => (
        {

            __html: DOMPurify.sanitize(data, this.state.config)
        });


    replaceHTML(htmlString, enter) {
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        // Find all elements with a 'style' attribute
        let styledElements = doc.querySelectorAll('[style]');
        if(enter){
            let enterEl = doc.querySelectorAll('div');
            styledElements = [...styledElements, ...enterEl]

        }

        // Loop through each element and modify the style
        styledElements.forEach(element => {
            const style = element.getAttribute('style');
            const modifiedStyle = 'color: white; background:none; font-family: "Inria" ; text-align:left; mix-blend-mode: luminosity;';
            element.setAttribute('style', modifiedStyle);
            // element.setAttribute('class', "");
        });

        // Serialize the document back to a string and return it
        return doc.body.innerHTML;
    }

    //    async addTag(innerText, value, c){
    //     if(value===" " && this.state.backSlash){
    //         if(this.state.m || this.state.d ||this.state.l||this.state.e||this.state.f){
    //     for(let i=0; i<innerText.length; i++){
    //         let n = innerText[i];
    //         if(innerText[i]==="/" && innerText[i+1]===c){
    //             let text= "";
    //             let j = i+2;
    //             let bool = true;

    //             while(bool ){
    //                 let bool1 = false;
    //                 if(innerText[j]==="&"){
    //                     bool1=true;
    //                 }
    //                 if(bool1 && (innerText[j+6]==="&"||innerText[j+6]===" ") ){
    //                     bool=false;
    //                     break;
    //                 }
    //                 text+=innerText[j];
    //                 j++;
    //             }

    //             let preText = innerText.substring(0, i);
    //             let newText = this.state.d? `<b n3z=${this.state.n} style=" color:#FFD700">${moment().format("MMM Do YY")}</b>` :`<b  n3z=${this.state.n} style=" color:${this.state.colors[c]}">${text} </b>`

    //             let postText = innerText.substring(j);
    //             innerText = preText+newText+postText;
    //             break;
    //         }
    //     }
    // }

    //     let offset = await Cursor.getCurrentCursorPosition(this.ref.current)-3;
    //    this.ref.current.innerHTML=innerText;

    //     this.setCaret(offset);
    //         let n = this.state.n+1;
    //         this.setState({
    //             backSlash:false,
    //             m:false,
    //             d:false,
    //             e:false,
    //             f:false,
    //             l:false,
    //             doubleSpace:false,
    //             change:true,
    //             n:n


    //         })
    //     }
    //    }

    getCurrentCursorPosition() {
        const richText = this.ref.current;
        const selection = window.getSelection();
        if (selection.rangeCount === 0 || !richText.contains(selection.anchorNode)) {
            return 0; // No valid selection
        }

        const range = document.createRange();
        range.selectNodeContents(richText);
        range.setEnd(selection.anchorNode, selection.anchorOffset);
        return range.toString().length;
    }


    async handleChange(e) {

        const config = {
            ADD_TAGS: ['a'], // Allow link tags
            ADD_ATTR: ['href'], // Allow to attributes
        };

        if (!this.ref.current) {
            return
        }

        let value = e.key;
        let innerText = DOMPurify.sanitize(this.ref.current.innerHTML, config);

        const cursorPosition = this.getCurrentCursorPosition();
        this.setState({ yourCurrentCursorPosition: cursorPosition });
        if (value === " " && this.state.lastChar === " " && this.state.backSlash) {
            await this.setState({ doubleSpace: true })
        }

        if (this.state.doubleSpace) {

            let c = 'm'
            let obj = {
                m: this.state.m,
                l: this.state.l,
                d: this.state.d,
                e: this.state.e,
                f: this.state.f,
            }
            for (const key in obj) {
                if (obj[key]) {
                    c = key
                    break;
                }
            }


            this.addTag(innerText, value, c)
        }

        if (value === "/" && !this.state.backSlash) {
            this.setState({ backSlash: true });
        }
        if (this.state.backSlash && value === 'm' && this.state.lastChar === "/") {
            this.setState({ m: true, d: false, e: false, f: false, l: false })
        }
        if (this.state.backSlash && value === 'd' && this.state.lastChar === "/") {
            this.setState({ m: false, d: true, e: false, f: false, l: false })
        }
        if (this.state.backSlash && value === 'e' && this.state.lastChar === "/") {
            this.setState({ m: false, d: false, e: true, f: false, l: false })
        }
        if (this.state.backSlash && value === 'f' && this.state.lastChar === "/") {
            this.setState({ m: false, d: false, e: false, f: true, l: false })
        }
        if (this.state.backSlash && value === 'l' && this.state.lastChar === "/") {
            this.setState({ m: false, d: false, e: false, f: false, l: true })
        }

        if (innerText.includes('---')) {
            const originalLength = innerText.length;
            innerText = innerText.replace(/---/g, '<span style="width: 100%; display: block; mix-blend-mode: luminosity;"><hr></hr></span><span style="width: 100%;></span>');

            await this.setState({ theHtml: innerText, textHtml: innerText });

            // Calculate the new cursor position
            const newLength = innerText.length;
            const cursorPosition = newLength - (originalLength - this.state.yourCurrentCursorPosition);


            this.setCaret(cursorPosition + originalLength);
        }





        await this.setState({ save: innerText, lastChar: value });

        let save = DOMPurify.sanitize(this.ref.current.innerHTML, config);
        this.setState({ theHtml: save })
        if (!this.props.updateOnClickOutside && this.state.active) {
            this.props.handleChange(save);

            if (this.state.pressCTRL && value === 'v') {
                
                const originalLength = innerText.length;
                
                let save = DOMPurify.sanitize(this.ref.current.innerHTML, config);
                let html = this.replaceHTML(save);
                this.setState({ theHtml: html, textHtml: html, pressCTRL: false });
                this.props.handleChange(html);
                this.handlePaste();
                setTimeout(async () => {
                    const newLength = innerText.length;
                    const cursorPosition = newLength - (originalLength - this.state.yourCurrentCursorPosition);
                    this.setCaret(cursorPosition)
                }, 100)
            }
            if (value === 'enter' ||value === 'Enter') {
                debugger
                // let tryhtml = this.ref.current.innerHTML;
                // const originalLength = innerText.length;
                
                // let save = DOMPurify.sanitize(this.ref.current.innerHTML, config);
                // let html = this.replaceHTML(save, true);
                // this.setState({ theHtml: html, textHtml: html, pressCTRL: false });
                // this.props.handleChange(html);
                // this.handlePaste();
                // setTimeout(async () => {
                //     const newLength = innerText.length;
                //     const cursorPosition = newLength - (originalLength - this.state.yourCurrentCursorPosition);
                //     this.setCaret(cursorPosition)
                // }, 100)

                // const originalCursorPosition = this.ref.current.innerHTML.length;
                
                // let save = DOMPurify.sanitize(this.ref.current.innerHTML, config);
                // let html = this.replaceHTML(save);
                // this.setState({ theHtml: html, textHtml: html, pressCTRL: false });
                // this.props.handleChange(html);
                // setTimeout(async () => {
                //     const newLength = innerText.length;
                //     const cursorPosition = newLength - (originalLength- originalCursorPosition);
                //     this.setCaret(cursorPosition)
                // }, 100)
            }

            // Someday help me figure this out Taylor. Change text in richtext to a link to the lore object of the given name
            //     if ((innerText.includes(']]') && innerText.includes('[[')) && this.props.linkLore){
            //                 const originalLength = innerText.length;
            //                 // Check for text within double brackets and replace it with a <Link> element
            //                 innerText = innerText.replace(/\[\[([^\]]+)\]\]/g, (match, p1) => {
            //                     const hrefLore = toolService.getIDFromLoreName(p1);
            //                     const hrefCamp = toolService.getIdFromURL(true, 1);
            //                     const href = `/campaign/${hrefCamp}-${hrefLore}`;
            //                     return `<b>{ </b><a href="${href}" style="color: #CDE8E7; cursor: pointer; text-decoration: underline; text-decoration-thickness: 1px; margin-left: 2px; margin-right: 2px;">${p1}</a><b> }</b>`;
            //                 });

            //             await this.setState({ theHtml: innerText, textHtml: innerText });
            //             const newLength = innerText.length;
            //             const cursorPosition = newLength - (originalLength - this.state.yourCurrentCursorPosition);
            //             this.setCaret(cursorPosition + originalLength);
            //     }
        }

    }

    getCaretPosition() {
        let caretOffset = 0;
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            const preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(this.ref.current); 
            preCaretRange.setEnd(range.startContainer, range.startOffset);
            caretOffset = preCaretRange.toString().length;
        }
        return caretOffset;
    }

    async checkHold(event) {
        if (event.key === "Control" && !this.state.pressCTRL) {
            await this.setState({ pressCTRL: true })
        }
    }

    setEnterCaret() {
        // debugger
        const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(this.ref.current);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
  
    }

    setCaret(offset) {
        const richText = this.ref.current;
        const range = document.createRange();
        const selection = window.getSelection();

        // Ensure the offset is within the bounds
        offset = Math.min(offset, richText.textContent.length);
        offset = Math.max(offset, 0);

        // Create a walker to step through the content
        const walker = document.createTreeWalker(richText, NodeFilter.SHOW_TEXT, null, false);
        let current = walker.nextNode();
        let length = 0;

        while (current) {
            const nextLength = length + current.textContent.length;
            if (offset <= nextLength) {
                range.setStart(current, offset - length);
                range.collapse(true);
                selection.removeAllRanges();
                selection.addRange(range);
                break;
            }
            length = nextLength;
            current = walker.nextNode();
        }

        richText.focus();
    }


    setCaretToEnd() {
        const richText = this.ref.current;
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(richText);
        range.collapse(false); // false to collapse the range to the end
        selection.removeAllRanges();
        selection.addRange(range);
    }

    handlePaste = (event) => {
        setTimeout(async () => {
            event.preventDefault();

            const clipboardData = event.clipboardData || window.clipboardData;
            const pastedData = clipboardData.getData('text');

            const selection = window.getSelection();
            if (!selection.rangeCount) return false;

            const range = selection.getRangeAt(0);
            range.deleteContents();
            const textNode = document.createTextNode(pastedData);
            range.insertNode(textNode);

            // Update the internal state
            this.updateContent(this.ref.current.innerHTML);

            // Set the cursor at the end of the content
            this.setCaretToEnd();
        }, 150)
    };

    updateContent = (newHtmlContent) => {
        // Perform any additional processing if needed, then update the state
        this.setState({ htmlContent: newHtmlContent });
    };


    async componentDidMount() {
        const config = {
            ADD_TAGS: ['a'], // Allow link tags
            ADD_ATTR: ['href'], // Allow to attributes

        };
        let html;
        if (this.props.html !== undefined) {
            html = await DOMPurify.sanitize(this.props.html, config)

        }
        else {
            html = await DOMPurify.sanitize(this.props.value, config)
        }

        this.setState({ textHtml: html })

        document.addEventListener('keydown', this.checkHold)
        this.ref.current.addEventListener('keyup', this.handleChange);
        this.ref.current.addEventListener('keydown', (e=>{
            if(e.keyCode==13) {
                // e.preventDefault();
                // this.setEnterCaret(e);
            }
        }));

        document.addEventListener('mousedown', this.handleClickOutside);
    }



    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        this.ref.current.removeEventListener('paste', this.handlePaste);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (this.props.emitClickedOutside !== undefined) {
                this.props.emitClickedOutside(this.state);
            }
            if (this.props.updateOnClickOutside) {
                this.props.handleHTMLChange(this.state.theHtml);

            }
        }
    }


    render() {
        let theme = undefined;
        if (this.props.theme) {
            theme = FormsThemeFactory.getFormsThemeFactory()[this.props.theme]
        }
        let inputType = {
            normal: <div
                ref={this.ref}

                dangerouslySetInnerHTML={{ __html: this.state.textHtml }}
                contentEditable={true} className={this.props.class ? this.props.class : "form-control"}
                style={this.props.inputStyle ? this.props.inputStyle : theme !== undefined ? theme.richEditorStyle : { height: "fit-content" }}
                id="richText"
                onClick={() => {
                    this.setState({ active: true })
                    this.props.onClick();
                }}
                onBlur={() => { this.setState({ active: false }) }}></div>

        }




        return (
            <div ref={this.wrapperRef} title='Use --- to create a line break. Ctrl+B to bold Selections. Ctrl+I for Italics. Ctrl+U for Underline.'
                style={this.props.wrapperStyle ? this.props.wrapperStyle : theme !== undefined ? theme.richEditorWrapperStyle : undefined}
                className={this.props.wrapperClass}>
                {this.props.label && (<label style={this.props.labelStyle ? this.props.labelStyle : theme !== undefined ? theme.richEditorLabelStyle : undefined} className={this.props.labelClass}>{this.props.label}</label>)}
                {inputType[this.props.input]}
                <div className="componentErrorMessage" >{this.props.errorMessage}</div>
            </div>
        );
    }
}

// Credit to Liam (Stack Overflow)
// https://stackoverflow.com/a/41034697/3480193
class Cursor {
    static getCurrentCursorPosition(parentElement) {
        var selection = window.getSelection(),
            charCount = -1,
            node;

        if (selection.focusNode) {
            if (Cursor._isChildOf(selection.focusNode, parentElement)) {
                node = selection.focusNode;
                charCount = selection.focusOffset;

                while (node) {
                    if (node === parentElement) {
                        break;
                    }

                    if (node.previousSibling) {
                        node = node.previousSibling;
                        charCount += node.textContent.length;
                    } else {
                        node = node.parentNode;
                        if (node === null) {
                            break;
                        }
                    }
                }
            }
        }

        return charCount;
    }

    static setCurrentCursorPosition(chars, element) {
        if (chars >= 0) {
            var selection = window.getSelection();

            let range = Cursor._createRange(element, { count: chars });

            if (range) {
                range.collapse(false);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }

    static _createRange(node, chars, range) {
        if (!range) {
            range = document.createRange()
            range.selectNode(node);
            range.setStart(node, 0);
        }

        if (chars.count === 0) {
            range.setEnd(node, chars.count);
        } else if (node && chars.count > 0) {
            if (node.nodeType === Node.TEXT_NODE) {
                if (node.textContent.length < chars.count) {
                    chars.count -= node.textContent.length;
                } else {
                    range.setEnd(node, chars.count);
                    chars.count = 0;
                }
            } else {
                for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = Cursor._createRange(node.childNodes[lp], chars, range);

                    if (chars.count === 0) {
                        break;
                    }
                }
            }
        }

        return range;
    }

    static _isChildOf(node, parentElement) {
        while (node !== null) {
            if (node === parentElement) {
                return true;
            }
            node = node.parentNode;
        }

        return false;
    }
}

export default RichTextComponent;