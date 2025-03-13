import { Component } from 'react';
import auth from '../services/auth';
import "../App.css";

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.changeHandler = this.changeHandler.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    changeHandler = async (event) => {
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const path = `images/${month}-${event.target.files[0].name}`;

        await this.setState({
            selectedFile: event.target.files[0],
            path: path,
            pic: URL.createObjectURL(event.target.files[0])
        });

        await auth.uploadPics(this.state.selectedFile, this.state.path, this.setState.bind(this), this.props.quality);
    };

    async handleSubmission() {
        let component = this.state.obj;
        await component.getPicSrc(this.state.path, this.props.app.state);

        if (typeof this.props.updateMap === 'function') {
            await this.props.updateMap(component);
        }
    };

    render() {
        const app = this.props.app;
        const state = app.state;
        const styles = state.styles;

        return (
            <div className='hover-btn hide-on-print' style={{ color: styles.colors.colorWhite + "99", maxWidth: "300px", maxHeight: "30px", cursor: "pointer", marginRight: "1rem", position: "relative", fontSize: styles.fonts.fontSmall }}>

                <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
                    {this.props.text || "Upload Image"}
                    <input
                        id="file-upload"
                        accept="image/png, image/gif, image/jpeg, image/jpg, image/webp, image/svg+xml"
                        style={{ display: "none" }}
                        type="file"
                        name="file"
                        onChange={this.changeHandler} />
                </label>
            </div>
        );
    }
}
