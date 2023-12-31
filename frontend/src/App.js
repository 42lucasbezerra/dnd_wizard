import React, { Component } from "react";
import CharacterInfoModal from "./components/CharacterModal";
import WeaponModal from "./components/WeaponModal";
import SpellModal from "./components/SpellModal";
import RollModal from "./components/RollModal";
import AttributeModal from "./components/AttributeModal";
import axios from "axios";
import './App.css';
import Chat from "./Chatbox";

import { capitalizeFirstLetter, formatSavingThrow } from "./components/utils";

const apiUrl = 'http://localhost:8000'
//process.env.REACT_APP_API_URL;

/* Option for d20 button, potentially!
<a href={process.env.PUBLIC_URL + '/dice-d20.svg'} target="_blank" rel="noopener noreferrer" className="d20-button">
  <span role="img" aria-label="d20">🎲</span>
</a> 
*/

// -------------- Arrays to help segment information -------------- //
const info = [
  'character_class',
  'background',
  'player_name',
  'race',
  'alignment',
  'level',
]

const stats_2 = [
  'armor_class',
  'initiative',
  'speed',
  'proficiency',
  'inspiration',
  'experience_points',
  'total_hit_points',
  'current_hit_points',
  'temporary_hit_points',
  'spellcasting_ability',
  'spell_save_dc',
  'spell_attack_bonus',
]

const saving_throws = [
  'saving_throw_strength',
  'saving_throw_dexterity',
  'saving_throw_constitution',
  'saving_throw_intelligence',
  'saving_throw_wisdom',
  'saving_throw_charisma',
]

const skills = [
  'acrobatics',
  'animal_handling',
  'arcana',
  'athletics',
  'deception',
  'history',
  'insight',
  'intimidation',
  'investigation',
  'medicine',
  'nature',
  'perception',
  'performance',
  'persuasion',
  'religion',
  'sleight_of_hand',
  'stealth',
  'survival',
]

// ---------------------------------------------------------------------- //

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterID: 0,
      characterList: {},
      spellList: [],
      abilityList: [],
      whichView: "skills",
      characterInfoModalOpen: false,
      weaponModalOpen: false,
      spellModalOpen: false,
      rollModalOpen: false,
      attributeModalOpen: false,
      activeItem: "",
      selectedFile: null,
      uploaded: false,
      weapon: [],
      spell: [],
      spellLevel: 'Cantrips',
      rollString: "",
      rollButtonClicked: true,
      rollName: "",
      attribute: {},
    };
  }

  getWeaponByName = (weaponName) => {
    axios
      .get("http://localhost:8000/api/weapons/" + String(weaponName) + "/")
      .then((res) => this.setState({ weapon: res.data }))
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // Fetch spell list from the backend API
    fetch('http://localhost:8000/api/get_spell_list/')
      .then(response => response.json())
      .then(data => {
        this.setState({ spellList: data.spells, spell: data.spells[0] });
      })
      .catch(error => {
        console.error('Error fetching spell list:', error);
      });

    // Get the ability list as well
    axios
      .get("http://localhost:8000/api/abilities/")
      .then((res) => {
        this.setState({ abilityList: res.data, attribute: res.data[0] })
      })
      .catch((err) => console.log(err));

    // Initializes this.state.weapon to avoid WeaponModal issues
    this.getWeaponByName("Club");
  }

  // --------------Download the character sheet template-------------- //
  downloadFile = () => {
    // using Java Script method to get PDF file
    fetch('dnd-character-sheet.xlsx').then(response => {
      response.blob().then(blob => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = 'dnd-character-sheet.xlsx';
        alink.click();
      })
    })
  }
  // -------------------------------------------------------- //

  // -------------- Render Character General Info at the Top -------------- //
  renderCharacterInfo = (character) => {
    return (
      <div>
        <h2 className="text-black text-uppercase text-center my-4">{character.name}</h2>
        <div className="row">
          {info.slice(0, 3).map((field) => (
            <div key={field} className="col">
              <h5 key={field} className="text-center">
                {capitalizeFirstLetter(field.replace('_', ' '))}: {character[field]}
              </h5>
            </div>
          ))}
        </div>
        <div className="row">
          {info.slice(3).map((field) => (
            <div key={field} className="col">
              <h5 className="text-center">
                {capitalizeFirstLetter(field.replace('_', ' '))}: {character[field]}
              </h5>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // ---------------------------------------------------------------------- //

  // -------------- Functions to operate character Modal -------------- //
  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0], uploaded: false });
  }

  // On file upload (click the upload button)
  onFileUpload = async (event) => {

    if (this.state.selectedFile) {

      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append(
        "myFile",
        this.state.selectedFile,
      );

      // Request made to the backend api
      // Send formData object
      try {
        const response = await axios.post("http://localhost:8000/api/uploadfile/", formData, {
          headers: {
            'content-type': 'multipart/form-data',
          }
        });

        const charID = response.data.id;
        this.setState({ uploaded: true, characterID: charID }, () => {
          // After setting the state, call refreshList with the updated characterID
          this.refreshList(charID);

          // Scroll to the element with id "scrollTarget"
          const elementToScrollTo = document.getElementById("first_scroll");
          if (elementToScrollTo) {
            elementToScrollTo.scrollIntoView({ behavior: "smooth" });
          }

        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/characters/" + String(this.state.characterID) + "/")
      .then((res) => this.setState({ characterList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ characterInfoModalOpen: !this.state.characterInfoModalOpen });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/characters/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/characters/", item)
      .then((res) => this.refreshList());
  };

  editItem = (activeItem) => {
    this.setState({ activeItem: activeItem, characterInfoModalOpen: true });
  };
  // ---------------------------------------------------------------------- //

  // ---------------------------- Functions to switch tabs ---------------------------- //

  displayView = (status) => {
    return this.setState({ whichView: status });
  };

  spellView = (status) => {
    return this.setState({ spellLevel: status });
  };
  // ---------------------------------------------------------------------- //

  // ---------------------------- Weapon Information Functions ---------------------------- //
  renderWeaponInfo = (weaponName) => {
    this.getWeaponByName(weaponName);
    this.setState({ weaponModalOpen: true });
  };

  toggleWeapon = () => {
    this.setState({ weaponModalOpen: !this.state.weaponModalOpen });
  };
  // ---------------------------------------------------------------------- //


  // ---------------------------- Spell Information Functions ---------------------------- //
  getSpellById = (spellId) => {
    const { spellList } = this.state;
    return spellList.find(spell => spell.spell_id === spellId);
  }

  renderSpellInfo = (spell) => {
    this.setState({ spellModalOpen: true, spell: spell });
  }

  toggleSpell = () => {
    this.setState({ spellModalOpen: !this.state.spellModalOpen });
  }
  // ---------------------------------------------------------------------- //

  renderStats2 = () => {
    const columnGroups = [];
    for (let i = 0; i < stats_2.length; i += 3) {
      columnGroups.push(stats_2.slice(i, i + 3));
    }

    return (
      <div className="row">
        {columnGroups.map((column, columnIndex) => (
          <div key={column} className="col-3 mx-auto p-0">
            {column.map((attribute, attributeIndex) => (
              <div key={attribute}>
                {capitalizeFirstLetter(attribute).replace(/_/g, ' ').replace('dc', 'DC')}: {this.state.characterList[attribute]}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  // ---------------------------- Dice Rolling ---------------------------- //
  handleRoll = (attribute, name) => {
    const rollString = `1d20+${attribute}`;

    // Pass the rollString to Chat
    this.setState({ rollString, rollButtonClicked: true, rollName: name });
  };

  resetRollButtonClicked = () => {
    this.setState({ rollButtonClicked: false });
  };

  renderRollInfo = () => {
    this.setState({ rollModalOpen: true });
  };

  toggleRoll = () => {
    this.setState({ rollModalOpen: !this.state.rollModalOpen });
  };
  // ---------------------------------------------------------------------- //
  // ---------------------------- Render Ability/Saving Throw Information ---------------------------- //
  renderAttributeInfo = (attribute) => {
    const attr = this.state.abilityList.find((element) => element["name"] === attribute);
    this.setState({ attributeModalOpen: true, attribute: attr });
  }

  toggleAttribute = () => {
    this.setState({ attributeModalOpen: !this.state.attributeModalOpen });
  }

  // ---------------------------- Display Character Ability Scores ---------------------------- //
  renderAbility = () => {
    const mapping = {
      strength: 'STR',
      dexterity: 'DEX',
      constitution: 'CON',
      intelligence: 'INT',
      wisdom: 'WIS',
      charisma: 'CHA',
    };

    const stats = [
      'strength',
      'dexterity',
      'constitution',
      'intelligence',
      'wisdom',
      'charisma',
    ];

    return (
      <div className="col-3 mx-auto p-0">
        <h3><center>Ability Scores</center></h3>
        {stats.map(stat => (
          <div className="card border rounded mb-4" style={{ width: '7rem', height: '7.1rem' }}>
            <div className="card-body">
              <h5 className="card-title">{mapping[stat]}</h5>
              <h2 className="card-subtitle mb-2 text-muted">
                {((modifier) => (modifier >= 0 ? `+${modifier}` : modifier))(
                  Math.floor((this.state.characterList[stat] - 10) / 2)
                )}&nbsp;
              </h2>
              <div className="card border rounded-circle" style={{ width: '2.5rem', height: '2.3rem' }} key={stat}>
                <div className="card-round d-flex flex-column justify-content-center align-items-center text-center">
                  <p>{this.state.characterList[stat]}</p>
                </div>
              </div>
            </div>
          </div>))}
      </div>
    );
  };
  // ------------------------------------------------------------------------------------ //


  // ---------------------------- Create tabs for different information ---------------------------- //
  renderTabList = () => {
    const tabs = ['skills', 'saving_throws', 'spells', 'weapons', 'actions'];

    return (
      <div className="nav nav-tabs">
        {tabs.map(tab => (
          <span
            key={tab}
            className={this.state.whichView === tab ? "nav-link active" : "nav-link"}
            onClick={() => this.displayView(tab)}
          >
            {tab.replace('_', ' ').toUpperCase()}
          </span>
        ))}
      </div>
    );
  };
  // ------------------------------------------------------------------------------------ //

  // ---------------------------- Render Spell Information ---------------------------- //
  renderSpellTabs = () => {
    const spell_tabs = [
      'Cantrips',
      'Level 1',
      'Level 2',
      'Level 3',
      'Level 4',
      'Level 5',
      'Level 6',
      'Level 7',
      'Level 8',
      'Level 9',
    ];

    return (
      <div className="nav nav-tabs">
        {spell_tabs.map(tab => (
          <span
            key={tab}
            className={this.state.spellLevel === tab ? "nav-link spell" : "nav-link"}
            onClick={() => this.spellView(tab)}
          >
            {tab}
          </span>
        ))}
      </div>
    );
  };

  renderSpellItems = () => {
    const { spellLevel, spellList } = this.state;

    // Filter the spell list by the selected spell level
    const spellLevelMap = {
      'Cantrips': 0,
      'Level 1': 1,
      'Level 2': 2,
      'Level 3': 3,
      'Level 4': 4,
      'Level 5': 5,
      'Level 6': 6,
      'Level 7': 7,
      'Level 8': 8,
      'Level 9': 9,
    };

    const spellsToRender = spellList.filter(spell => {
      return spellLevelMap[spellLevel] === spell.spell_level && this.state.characterList['spells'].includes(spell.spell_id);
    });

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Casting Time</th>
              <th>Range</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {spellsToRender.map(spell => (
              <tr key={spell.spell_id}>
                <td>
                  <span>{spell.spell_name}</span>
                  <span
                    style={{ marginLeft: '5px', cursor: 'pointer' }}
                    onClick={() => this.renderSpellInfo(spell)}
                  >
                    ℹ️
                  </span>
                </td>
                <td>{spell.casting_time}</td>
                <td>{spell.spell_range}</td>
                <td>{spell.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ---------------------------- Render Items in each specific tab ---------------------------- //
  renderItems = () => {
    const { whichView } = this.state;

    let attributesToRender = [];

    if (whichView === 'saving_throws') {
      attributesToRender = saving_throws;
    } else if (whichView === 'skills') {
      attributesToRender = skills;
    } else if (whichView === 'weapons') {
      attributesToRender = this.state.characterList['weapons'];
    }

    if (whichView === 'saving_throws' || whichView === 'skills') {
      return (
        <table className="table">
          <thead><tr><th>Name</th><th>Modifier</th></tr></thead>
          <tbody>
            {attributesToRender.map((attributeTitle) => {
              const attribute = this.state.characterList[attributeTitle];
              return (
                <tr key={attributeTitle}>
                  <td>
                    <span>
                      {(attributeTitle.replace('saving_throw_', '').charAt(0).toUpperCase() + attributeTitle.replace('saving_throw_', '').slice(1)).replaceAll('_', ' ')}
                    </span>
                    <span
                      style={{ marginLeft: '5px', cursor: 'pointer' }}
                      onClick={() => this.renderAttributeInfo(capitalizeFirstLetter(attributeTitle.replace(/_/g, ' ')))}
                    >
                      ℹ️
                    </span>
                  </td>
                  <td className="d-flex flex-column">
                    <span>
                      {attribute >= 0 ? "+" : ""}{attribute}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary mr-2"
                      onClick={() => this.editItem(attributeTitle)}>Edit</button>
                    <button className="btn btn-primary" onClick={() => this.handleRoll(attribute, formatSavingThrow(attributeTitle))}>
                      Roll
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else if (whichView === 'weapons') {
      return (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Atk Bonus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {attributesToRender.map((weapon_object) => {
              return (
                <tr key={weapon_object['name']}>
                  <td>
                    <span>
                      <span
                        className={weapon_object['proficiency'] ? 'proficient-weapon' : 'non-proficient-weapon'}
                        title={weapon_object['proficiency'] ? 'Proficient' : 'Not Proficient'}
                      >
                        {capitalizeFirstLetter(weapon_object['name'])}
                      </span>
                      <span
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                        onClick={() => this.renderWeaponInfo(weapon_object['name'])}
                      >
                        ℹ️
                      </span>
                    </span>
                  </td>
                  <td className="d-flex flex-column">
                    <span>
                      <center>{weapon_object['atk_bonus'] !== null ? (weapon_object['atk_bonus'] > 0 ? "+" : "") : "?"}{weapon_object['atk_bonus']}</center>
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-secondary mr-2"
                      onClick={() => this.editItem(weapon_object)}>Edit</button>
                    <button className="btn btn-primary" onClick={() => this.handleRoll(weapon_object['atk_bonus'], weapon_object['name'])}>
                      Roll
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else if (whichView === 'spells') {
      return (
        <div>
          {this.renderSpellTabs()}
          {this.renderSpellItems()}
        </div>
      );
    }
  };
  // ------------------------------------------------------------------------------------ //


  // -------------- Display character Information if file is uploaded -------------- //
  charData = () => {
    if (this.state.uploaded && this.state.selectedFile) {
      return (
        <div className="container-fluid">
          <div className="p-2 mb-3 bg-info text-white mt-3">
            <div className="container" id="first_scroll">
              {this.renderCharacterInfo(this.state.characterList)}
            </div>
          </div>
          <div className="container">
            {this.renderStats2()}
            <div className="row">
              {this.renderAbility()}
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="card p-3">
                  {this.renderTabList()}
                  {this.renderItems()}
                </div>
              </div>
              <div className="col mx-auto p-0">
                <div className="header-container">
                  <h4 className="header-text">Roll log</h4>
                  <div className="circle-button" onClick={() => this.renderRollInfo()}>
                    <span className="question-mark">?</span>
                  </div>
                </div>
                <Chat rollString={this.state.rollString} rollName={this.state.rollName} rollButtonClicked={this.state.rollButtonClicked} resetRollButtonClicked={this.resetRollButtonClicked} />
              </div>
            </div>
          </div>
          {this.state.characterInfoModalOpen ? (
            <CharacterInfoModal
              activeItem={this.state.activeItem}
              Character={this.state.characterList}
              toggle={this.toggle}
              onSave={this.handleSubmit}
            />
          ) : null}
          <WeaponModal
            isOpen={this.state.weaponModalOpen}
            toggle={this.toggleWeapon}
            weaponInfo={this.state.weapon}
          />
          <SpellModal
            isOpen={this.state.spellModalOpen}
            toggle={this.toggleSpell}
            spellInfo={this.state.spell}
          />
          <RollModal
            isOpen={this.state.rollModalOpen}
            toggle={this.toggleRoll}
          />
          <AttributeModal
            isOpen={this.state.attributeModalOpen}
            toggle={this.toggleAttribute}
            attribute={this.state.attribute}
          />
        </div>
      );
    }
  };
  // ---------------------------------------------------------------------- //


  // ---------------------------- Render ---------------------------- //
  render() {
    return (
      <main><center>
        <div className="container">
          <h3>
            Upload your character sheet below!
          </h3>

          <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>
              Upload!
            </button>
          </div> <br />
          <div>
            <h5>Or download the character sheet template:</h5>
            <button type="button" class="btn btn-success" onClick={this.downloadFile}><svg xmlns="http://www.w3.org/2000/svg" width="16"
              height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
              ::before
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 
                  0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"></path>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 
                  0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"></path>
            </svg>
              &nbsp;Lightweight character sheet 5e
            </button>
          </div>
        </div>
        {this.charData()}
      </center>
      </main>
    );
  };
}
// ---------------------------------------------------------------------- //


export default App;

/* // If a character is needed for testing:
const Character = 
  {
    name: 'Sing Medaru',
    character_class: 'Barbarian',
    background: 'Criminal',
    player_name: 'Lucas',
    race: 'Human',
    alignment: 'Good',
    hit_dice_total: '9d8',
    hit_dice: '9d8',
    armor_class: 17,
    initiative: 5,
    inspiration: 1,
    proficiency: 4,
    speed: 30,
    level: 9,
    experience_points: 899,
    total_hit_points: 80,
    current_hit_points: 80,
    temporary_hit_points: 0,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 12,
    saving_throw_strength: 2,
    saving_throw_dexterity: 3,
    saving_throw_constitution: 4,
    saving_throw_intelligence: 5,
    saving_throw_wisdom: 3,
    saving_throw_charisma: 2,
    acrobatics: 1,
    animal_handling: 2,
    arcana: 3,
    athletics: 4,
    deception: 5,
    history: 4,
    insight: 3,
    intimidation: 6,
    investigation: 7,
    medicine: 9,
    nature: 1,
    perception: 1,
    performance: 2,
    persuasion: 6,
    religion: 4,
    sleight_of_hand: 4,
    stealth: 4,
    survival: 0,
  }*/