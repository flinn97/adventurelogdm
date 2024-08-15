import { Component } from 'react';
import DetailsDisplay from "./detailsDisplay";
import EncounterForm from "./encounterForm";

import placeholder from '../pics/placeholderEncounter1.JPG';
import placeholder2 from '../pics/placeholderEncounter2.jpg';
import placeholder3 from '../pics/placeholderEncounter3.JPG';
import placeholder4 from '../pics/placeholderEncounter4.JPG';
import PostLogButton from '../../../componentListNPM/componentForms/buttons/postLogButton';

export default class GeneralInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      placeholderImage: this.getRandomPlaceholder(),
    }

  }

  getRandomPlaceholder() {
    const placeholders = [placeholder, placeholder2, placeholder3, placeholder4];
    const randomIndex = Math.floor(Math.random() * placeholders.length);
    return placeholders[randomIndex];
  }

  render() {
    let app = this.props.app;
    let dispatch = app.dispatch;
    let currentEncounter = app.state.currentEncounter;
    let obj = currentEncounter;
    let state = app.state;
    let styles = state.styles;
    let placeholderImage = this.state.placeholderImage;

    return (
      <div
        className='Background-Content'
        style={{
          backgroundImage: 'url(' + (currentEncounter?.getJson().picURL || placeholderImage) + ')',
        }}
      >
        <div className='Header-Enc'>

          <div className='Header-Row'>
            {this.state.edit === false && <div className='Header-Title'>{currentEncounter.getJson().name}</div>}
            <div className='Header-Buttons'>
              {this.state.edit === false && (
                <div
                  className='button Edit-Encounter-Button'
                  onClick={() => this.setState({ edit: true })}
                >
                  Edit Encounter
                </div>
              )}

            </div>

          </div>
          {this.state.edit === false && <DetailsDisplay app={app} />}

          {this.state.edit === true && (
            <div className='Header-Edit'>
              <div
                title='Close and Save'
                className='button Close-Button'
                onClick={() => this.setState({ edit: false })}
              >
                X
              </div>
              <div className='Encounter-Form-Container'>
                <EncounterForm app={app} />
              </div>
            </div>
          )}

          <div className='Footer-Row'>
          <PostLogButton app={app} obj={state.currentEncounter} altText={"initiative"} text={"Log Initiative"}
              //ENCOUNTER MUST HAVE CAMPAIGN ID 
              campaignId={state.currentEncounter?.getJson().campaignId}
              
            />
            <div className='Footer-Buttons'>
              <div
                className='button Add-All-Players-Button'
                onClick={async () => {
                  
                  let list = await app.state.componentList.getList('participant', 'player', 'role');
                  
                  await currentEncounter.addCampaignPlayers([...list,])
                  this.props.app.dispatch({});
                }
                }
              >
                Add Players
              </div>
              <div
                className='button Add-New-Creature-Button'
                onClick={async() =>{
                  
                  
                  await state.opps.cleanJsonPrepare({addparticipant: { encounterId: currentEncounter.getJson()._id, type: 'participant' }})
                  let obj = await state.opps.getUpdater("add");
                  obj = obj[0]
                  dispatch({
                    popUpSwitch: 'addMonster', currentComponent:obj

                  })
                }
                  
                }
              >
                Add a Creature
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}