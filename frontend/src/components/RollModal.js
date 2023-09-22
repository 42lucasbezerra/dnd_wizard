import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import './custom-styles.css';
// import { capitalizeFirstLetter } from "./utils";

export default class RollModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modifiersExpanded: false,
            selectorsExpanded: false,
            tableExpanded: false,
        };
    }

    toggleSection = (sectionName) => {
        this.setState((prevState) => ({
            [sectionName]: !prevState[sectionName],
        }));
    };
    
    render() {
        const { isOpen, toggle } = this.props;
        const { modifiersExpanded, selectorsExpanded, tableExpanded } = this.state;

        return (
        <div>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader className="roll-header">On dice rolling</ModalHeader>
            <ModalBody className="roll-modal">
                <p>The Roll Log will display any rolls made by clicking the "Roll!" button next to
                     an attribute or weapon.

                    Additionally, it allows the user to input custom rolls of the variety:
                    "<b>n</b>d<b>k</b>", where <i>n</i> is the number of dice and <i>k</i> is the
                     type of dice to be rolled.<br /><br />
                    For example, if you wish to roll three six-sided dice, 
                    you can simply type in <b>3d6</b>.<br /></p>
                    <h5 
                        onClick={() => this.toggleSection('modifiersExpanded')}
                        style={{ cursor: 'pointer' }}
                    >
                        {modifiersExpanded ? 'Modifiers' : 'Modifiers+'}
                    </h5>
                    {modifiersExpanded && (
                        <div>
                            To add a numeric modifier to a roll, simply type "+" or "-" after the roll and add
                    the respective value. Dice can be added as well; for example, typing <b>2d20+1d4+5</b> will
                    roll two <i>d20</i> and one <i>d4</i>, and add 5 to the final result.<br /><br />
                        </div>
                    )}
                    
                    <h5
                        onClick={() => this.toggleSection('selectorsExpanded')}
                        style={{ cursor: 'pointer' }}
                    >
                        {selectorsExpanded ? 'Operations': 'Operations+'}
                    </h5>
                    {selectorsExpanded && (
                        <div>
                            <p>The dice roller also allows the user to roll multiple dice and select some of them to keep,
                            drop, or re-roll. For example, in order to roll a <i>d20</i> with advantage (roll twice and keep the
                            highest number) you can
                            type <b>2d20kh1</b>. The <i>kh1</i> means "keep highest 1".<br /><br />
                            Similarly, to roll with disadvantage you can type <b>2d20kl1</b> (<i>l</i> stands for "lowest").<br/><br/>
                            Another option might be to roll two <i>d8</i> but reroll 1s and 2s once. For this, you would type:<br/></p>
                            <center><p><b>2d8ro&lt;3</b></p></center>
                            <p>or "2d8 reroll once if the die is less than 3"<br/></p>
                        </div>
                    )}
                    <h5
                        onClick={() => this.toggleSection('tableExpanded')}
                        style={{ cursor: 'pointer' }}
                    >
                        {tableExpanded ? 'Table' : 'Table+'}
                    </h5>
                    {tableExpanded && (
                        <div>
                            <p>The table below contains information about all the possible dice operations:</p>
                        <table className="table roll-options-table">
                            <thead>
                            <tr>
                                <th>Syntax</th>
                                <th>Name</th>
                                <th>Description</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>k</td>
                                    <td>keep</td>
                                    <td>Keeps all matched values.</td>
                                </tr>
                                <tr>
                                    <td>p</td>
                                    <td>drop</td>
                                    <td>Drops all matched values.</td>
                                </tr>
                                <tr>
                                    <td>rr</td>
                                    <td>reroll</td>
                                    <td>Rerolls all matched values until none match.</td>
                                </tr>
                                <tr>
                                    <td>ro</td>
                                    <td>reroll once</td>
                                    <td>Rerolls all matched values once.</td>
                                </tr>
                                <tr>
                                    <td>ra</td>
                                    <td>reroll and add</td>
                                    <td>Rerolls up to one matched value once, keeping the original roll.</td>
                                </tr>
                                <tr>
                                    <td>e</td>
                                    <td>explode on</td>
                                    <td>Rolls another die for each matched value.</td>
                                </tr>
                                <tr>
                                    <td>mi</td>
                                    <td>minimum</td>
                                    <td>Sets the minimum value of each die.</td>
                                </tr>
                                <tr>
                                    <td>ma</td>
                                    <td>maximum</td>
                                    <td>Sets the maximum value of each die.</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    )}
            </ModalBody>
            <ModalFooter className="roll-header">
            <Button color="secondary" onClick={toggle}>
                Close
            </Button>
            </ModalFooter>
        </Modal>
        </div>
        );
    }
}