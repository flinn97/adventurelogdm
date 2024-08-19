
import { Component } from 'react';

import sound from '../pics/speaker.png';

export default class DetailsDisplay extends Component {
  constructor(props) {
    super(props);


  }

  convertStringToLink = (string) => {
    if (!string) return '';

    const trimmedString = string.trim();
    const hasProtocol = /^https?:\/\//i.test(trimmedString);

    return hasProtocol ? trimmedString : 'https://' + trimmedString;
  }



  render() {
    let app = this.props.app
    let state = app.state
    let encounter = state.currentEncounter

    let audioLink = this.convertStringToLink(encounter?.getJson().audio ? encounter.getJson().audio : encounter.getJson().audioLink);
    let audioPrev = encounter?.getJson().audio ? encounter.getJson().audio : encounter.getJson().audioLink;
    audioPrev = audioPrev.length > 30 ? audioPrev.substring(0, 30) + "..." : audioPrev;


    return (<div>
      <div className='info'>
        {encounter.getJson().description}
      </div>

      {audioPrev &&
        (<div className='Audio-Container' title={audioLink}>
          <img className="tiny-ico" src={sound} alt="Sound Icon"/>
        <a className='info Audio-Link' target="_blank" href={audioLink} style={{ marginTop: "-18px" }}>
          {audioPrev}
        </a>
        </div>
        )
        ||
        (
          <div style={{ height:"11px" }}></div>
        )
        }

    </div>)
  }
}
