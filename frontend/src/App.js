import React, { Component } from "react";

const Characters = [
 {id: 0, title: 'name', description: '', view: 'stats', value: "Sing",},
 {id: 1, title: 'character_class', description: '', view: 'stats', value: "Barbarian",},
 {id: 2, title: 'background', description: '', view: 'stats', value: "Criminal",},
 {id: 3, title: 'player_name', description: '', view: 'stats', value: "Lucas",},
 {id: 4, title: 'race', description: '', view: 'stats', value: "Human",},
 {id: 5, title: 'alignment', description: '', view: 'stats', value: "Lawful Good",},
 {id: 6, title: 'hit_dice_total', description: '', view: 'stats', value: "9d8",},
 {id: 7, title: 'hit_dice', description: '', view: 'stats', value: "9d8",},
 {id: 8, title: 'armor_class', description: '', view: 'stats', value: 17,},
 {id: 9, title: 'initiative', description: '', view: 'stats', value: 5,},
 {id: 10, title: 'inspiration', description: '', view: 'stats', value: 1,},
 {id: 11, title: 'proficiency', description: '', view: 'stats', value: 4,},
 {id: 12, title: 'speed', description: '', view: 'stats', value: 30,},
 {id: 13, title: 'level', description: '', view: 'stats', value: 9,},
 {id: 14, title: 'experience_points', description: '', view: 'stats', value: 899,},
 {id: 15, title: 'total_hit_points', description: '', view: 'stats', value: 80,},
 {id: 16, title: 'current_hit_points', description: '', view: 'stats', value: 80,},
 {id: 17, title: 'temporary_hit_points', description: '', view: 'stats', value: 0,},
 {id: 18, title: 'strength', description: '', view: 'stats', value: 10,},
 {id: 19, title: 'dexterity', description: '', view: 'stats', value: 10,},
 {id: 20, title: 'constitution', description: '', view: 'stats', value: 10,},
 {id: 21, title: 'intelligence', description: '', view: 'stats', value: 10,},
 {id: 22, title: 'wisdom', description: '', view: 'stats', value: 10,},
 {id: 23, title: 'charisma', description: '', view: 'stats', value: 12,},
 {id: 24, title: 'saving_throw_strength', description: '', view: 'saving_throws', value: 2,},
 {id: 25, title: 'saving_throw_dexterity', description: '', view: 'saving_throws', value: 3,},
 {id: 26, title: 'saving_throw_constitution', description: '', view: 'saving_throws', value: 4,},
 {id: 27, title: 'saving_throw_intelligence', description: '', view: 'saving_throws', value: 5,},
 {id: 28, title: 'saving_throw_wisdom', description: '', view: 'saving_throws', value: 3,},
 {id: 29, title: 'saving_throw_charisma', description: '', view: 'saving_throws', value: 2,},
 {id: 30, title: 'acrobatics', description: '', view: 'skills', value: 1,},
 {id: 31, title: 'animal_handling', description: '', view: 'skills', value: 2,},
 {id: 32, title: 'arcana', description: '', view: 'skills', value: 3,},
 {id: 33, title: 'athletics', description: '', view: 'skills', value: 4,},
 {id: 34, title: 'deception', description: '', view: 'skills', value: 5,},
 {id: 35, title: 'history', description: '', view: 'skills', value: 4,},
 {id: 36, title: 'insight', description: '', view: 'skills', value: 3,},
 {id: 37, title: 'intimidation', description: '', view: 'skills', value: 6,},
 {id: 38, title: 'investigation', description: '', view: 'skills', value: 7,},
 {id: 39, title: 'medicine', description: '', view: 'skills', value: 9,},
 {id: 40, title: 'nature', description: '', view: 'skills', value: 1,},
 {id: 41, title: 'perception', description: '', view: 'skills', value: 1,},
 {id: 42, title: 'performance', description: '', view: 'skills', value: 2,},
 {id: 43, title: 'persuasion', description: '', view: 'skills', value: 6,},
 {id: 44, title: 'religion', description: '', view: 'skills', value: 4,},
 {id: 45, title: 'sleight_of_hand', description: '', view: 'skills', value: 4,},
 {id: 46, title: 'stealth', description: '', view: 'skills', value: 4,},
 {id: 47, title: 'survival', description: '', view: 'skills', value: 0,},
]


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characterList: Characters,
      whichView: "stats",
    };
  }

  displayView = (status) => {
    return this.setState({ whichView: status });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.whichView ? "nav-link active" : "nav-link"}
          onClick={() => this.displayView('stats')}
        >
          Stats
        </span>
        <span
          className={this.state.whichView ? "nav-link" : "nav-link active"}
          onClick={() => this.displayView('skills')}
        >
          Skills
        </span>
        <span
          className={this.state.whichView ? "nav-link" : "nav-link active"}
          onClick={() => this.displayView('savingthrows')}
        >
          Saving Throws
        </span>
        <span
          className={this.state.whichView ? "nav-link" : "nav-link active"}
          onClick={() => this.displayView('spells_attacks')}
        >
          Spells & attacks
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { whichView } = this.state;
    const newItems = this.state.characterList.filter(
      (item) => item.view === whichView
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.whichView ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };


  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                >
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;