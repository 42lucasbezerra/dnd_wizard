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
  'background',
  'player_name',
  'race',
  'alignment'
]

const stats = [
  'armor_class',
  'initiative',
  'inspiration',
  'proficiency',
  'speed',
  'level',
  'experience_points',
  'total_hit_points',
  'current_hit_points',
  'temporary_hit_points',
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
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


function renderCharacterName(character) {
  return <h1 className="text-black text-uppercase text-center my-4">{character.name}</h1>
  // Change to renderCharacterInfo and add all the character information in order
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterID: "14",
      characterList: {},
      whichView: "skills",
      modal: false,
      activeItem: "",
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/characters/12/")
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

    if (whichView === 'stats') {
      attributesToRender = stats;
    } else if (whichView === 'saving_throws') {
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


  render() {
    return (
      <main className="container">
          {renderCharacterName(this.state.characterList)}
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
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
      </main>
    );
  }
}

export default App;