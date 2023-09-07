import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

/* Option for d20 button, potentially!
<a href={process.env.PUBLIC_URL + '/dice-d20.svg'} target="_blank" rel="noopener noreferrer" className="d20-button">
  <span role="img" aria-label="d20">🎲</span>
</a> 

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

const info = [
  'character_class',
  'level',
  'background',
  'player_name',
  'race',
  'alignment',
]

const stats_2 = [
  'armor_class',
  'initiative',
  'inspiration',
  'proficiency',
  'speed',
  'experience_points',
  'total_hit_points',
  'current_hit_points',
  'temporary_hit_points',
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

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  const words = string.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ");
}

function renderCharacterInfo(character) {
  return (
    <div>
      <h2 className="text-black text-uppercase text-center my-4">{character.name}</h2>
      <div className="row">
        {info.slice(0, 3).map((field) => (
          <div className="col">
            <h5 key={field} className="text-center">
              {capitalizeFirstLetter(field.replace('_', ' '))}: {character[field]}
            </h5>
          </div>
        ))}
      </div>
      <div className="row">
          {info.slice(3).map((field) => (
            <div className="col">
              <h5 key={field} className="text-center">
                {capitalizeFirstLetter(field.replace('_', ' '))}: {character[field]}
              </h5>
            </div>
          ))}
      </div>
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterID: 0,
      characterList: {},
      whichView: "skills",
      modal: false,
      activeItem: "",
      selectedFile: null,
      uploaded: false,
    };
  }

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
        const response = await axios.post("http://127.0.0.1:8000/api/uploadfile/", formData, {
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
    this.setState({ modal: !this.state.modal });
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
    this.setState({ activeItem: activeItem, modal: true });
  };

  displayView = (status) => {
    return this.setState({ whichView: status });
  };


  handleRoll = (attribute) => {
    // Simulate rolling a 20-sided die (d20)
    const d20Roll = Math.floor(Math.random() * 20) + 1;
  
    // Calculate the total by adding the d20 roll and the modifier
    const total = d20Roll + attribute;
  
    // Display the result or perform any other actions you need
    alert(`You rolled a d20: ${d20Roll}\nModifier: ${attribute}\nTotal: ${total}`);
  };


  renderStats = () => {
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
        <div class="card border rounded mb-4" style={{width: '7rem', height: '7.3rem'}}>
          <div class="card-body">
            <h5 class="card-title">{mapping[stat]}</h5>
            <h2 class="card-subtitle mb-2 text-muted">
              {((modifier) => (modifier >= 0 ? `+${modifier}` : modifier))(
                Math.floor((this.state.characterList[stat] - 10) / 2)
              )}&nbsp;
            </h2>
            <div className="card border rounded-circle" style={{ width: '2.5rem', height: '2.3rem' }} key={stat}>
              <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
                <h6>{this.state.characterList[stat]}</h6>
              </div>
            </div>
          </div>
        </div>))}
      </div>
    );
  };


  renderTabList = () => {
    const tabs = ['skills', 'saving_throws', 'spells', 'attacks'];
  
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

  renderItems = () => {
    const { whichView } = this.state;

    let attributesToRender = [];

    if (whichView === 'saving_throws') {
      attributesToRender = saving_throws;
    } else if (whichView === 'skills') {
      attributesToRender = skills;
    }

    return (
      <table className="table">
      <tbody>
        {attributesToRender.map((attributeTitle) => {
          const attribute = this.state.characterList[attributeTitle];
          return (
            <tr key={attributeTitle}>
              <td>
                <span
                  className={`todo-title mr-2 ${
                    this.state.whichView ? "completed-todo" : ""
                  }`}
                >
                  {(attributeTitle.replace('saving_throw_','').charAt(0).toUpperCase() + attributeTitle.replace('saving_throw_','').slice(1)).replaceAll('_', ' ')}
                </span>
              </td>
              <td className="d-flex flex-column">
                <span
                  className={`todo-title ${
                    this.state.whichView ? "completed-todo" : ""
                  }`}
                >
                  {attribute}
                </span>
              </td>
              <td>
                <button className="btn btn-secondary mr-2"
                onClick={() => this.editItem(attributeTitle)}>Edit</button>
                <button className="btn btn-primary" onClick={() => this.handleRoll(attribute)}>
                Roll
                </button>
                </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

charData = () => {
  if (this.state.uploaded && this.state.selectedFile) {
    return (
      <div className="container-fluid">
        <div class="p-2 mb-3 bg-info text-white mt-3">
          <div className="container" id="first_scroll">
          {renderCharacterInfo(this.state.characterList)}
        </div>
        </div>
        <div className="container">
        <div className="row">
          {this.renderStats()}
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
          <div className="col mx-auto p-0">
            <h4>Roll log</h4>
          </div>
        </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            Character={this.state.characterList}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
};


  render() {
    return (
      <main><center>
      <div class="container">
          <h1>
              Character Uploader
          </h1>
          <h3>
              Upload your character sheet below!
          </h3>
      
          <div>
              <input type="file" onChange={this.onFileChange} />
              <button onClick={this.onFileUpload}>
                  Upload!
              </button>
          </div>
        </div>
          {this.charData()}
      </center>
      </main>
  );
  };
}


export default App;