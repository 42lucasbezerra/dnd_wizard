import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import './custom-styles.css';
import { capitalizeFirstLetter } from "./utils";

const property_descriptions = {
  V: (
    <>
    <b>Verbal (V)</b>: Most spells require the chanting of mystic words. The words themselves aren’t the source of the spell’s power; rather, the particular combination of sounds, with specific pitch and resonance, sets the threads of magic in motion. Thus, a character who is gagged or in an area of silence, such as one created by the silence spell, can’t cast a spell with a verbal component.
    </>
  ),
  S: (
    <>
      <b>Somatic (S)</b>: Spellcasting gestures might include a forceful gesticulation or an intricate set of gestures. If a spell requires a somatic component, the caster must have free use of at least one hand to perform these gestures.
    </>
  ),
    M: (
      <>
        <b>Material (M)</b>: Casting some spells requires particular objects, specified in parentheses in the component entry. A character can use a component pouch or a spellcasting focus (found in “Equipment”) in place of the components specified for a spell. But if a cost is indicated for a component, a character must have that specific component before he or she can cast the spell.<br /><br />If a spell states that a material component is consumed by the spell, the caster must provide this component for each casting of the spell. A spellcaster must have a hand free to access a spell’s material components—or to hold a spellcasting focus—but it can be the same hand that he or she uses to perform somatic components.
      </>
    ),
    Concentration: (
      <>
        <b>Concentration</b><br /><br />
        Some spells require you to maintain concentration in order to keep their magic active. If you lose concentration, such a spell ends.<br /><br />
        If a spell must be maintained with concentration, that fact appears in its Duration entry, and the spell specifies how long you can concentrate on it. You can end concentration at any time (no action required).<br /><br />
        Normal activity, such as moving and attacking, doesn’t interfere with concentration. The following factors can break concentration:<br /><br />
        <ul>
          <li><b>Casting another spell that requires concentration.</b> You lose concentration on a spell if you cast another spell that requires concentration. You can’t concentrate on two spells at once.</li>
          <li><b>Taking damage.</b> Whenever you take damage while you are concentrating on a spell, you must make a Constitution saving throw to maintain your concentration. The DC equals 10 or half the damage you take, whichever number is higher. If you take damage from multiple sources, such as an arrow and a dragon’s breath, you make a separate saving throw for each source of damage.</li>
          <li><b>Being incapacitated or killed.</b> You lose concentration on a spell if you are incapacitated or if you die.</li>
        </ul>
        The GM might also decide that certain environmental phenomena, such as a wave crashing over you while you’re on a storm--tossed ship, require you to succeed on a DC 10 Constitution saving throw to maintain concentration on a spell.
      </>
    ),
    "(ritual)": (
      <>
        <b>Rituals</b><br /><br />
        Certain spells have a special tag: ritual. Such a spell can be cast following the normal rules for spellcasting, or the spell can be cast as a ritual. The ritual version of a spell takes 10 minutes longer to cast than normal. It also doesn’t expend a spell slot, which means the ritual version of a spell can’t be cast at a higher level.<br /><br />
        To cast a spell as a ritual, a spellcaster must have a feature that grants the ability to do so. The cleric and the druid, for example, have such a feature. The caster must also have the spell prepared or on his or her list of spells known, unless the character’s ritual feature specifies otherwise, as the wizard’s does.
      </>
    ),
    cantrip: (
      <>
        <b>Cantrips</b><br /><br />
        A cantrip is a spell that can be cast at will, without using a spell slot and without being prepared in advance. Repeated practice has fixed the spell in the caster’s mind and infused the caster with the magic needed to produce the effect over and over. A cantrip’s spell level is 0.
      </>
    ),
    abjuration: (<><b>Abjuration</b> spells are protective in nature, though some of them have aggressive uses. They create magical barriers, negate harmful effects, harm trespassers, or banish creatures to other planes of existence.</>),
    conjuration: (<><b>Conjuration</b> spells involve the transportation of objects and creatures from one location to another. Some spells summon creatures or objects to the caster's side, whereas others allow the caster to teleport to another location. Some conjurations create objects or effects out of nothing.</>),
    divination: (<><b>Divination</b> spells reveal information, whether in the form of secrets long forgotten, glimpses of the future, the locations of hidden things, the truth behind illusions, or visions of distant people or places.</>),
    enchantment: (<><b>Enchantment</b> spells affect the minds of others, influencing or controlling their behavior. Such spells can make enemies see the caster as a friend, force creatures to take a course of action, or even control another creature like a puppet.</>),
    evocation: (<><b>Evocation</b> spells manipulate magical energy to produce a desired effect. Some call up blasts of fire or lightning. Others channel positive energy to heal wounds.</>),
    illusion: (<><b>Illusion</b> spells deceive the senses or minds of others. They cause people to see things that are not there, to miss things that are there, to hear phantom noises, or to remember things that never happened. Some illusions create phantom images that any creature can see, but the most insidious illusions plant an image directly in the mind of a creature.</>),
    necromancy: (<><b>Necromancy</b> spells manipulate the energies of life and death. Such spells can grant an extra reserve of life force, drain the life energy from another creature, create the undead, or even bring the dead back to life. <br /><br />Creating the undead through the use of necromancy spells such as animate dead is not a good act, and only evil casters use such spells frequently.</>),
    transmutation: (<><b>Transmutation</b> spells change the properties of a creature, object, or environment. They might turn an enemy into a harmless creature, bolster the strength of an ally, make an object move at the caster's command, or enhance a creature's innate healing abilities to rapidly recover from injury.</>),
}

const schools_of_magic = new Set([
  "abjuration",
  "conjuration",
  "divination",
  "enchantment",
  "evocation",
  "illusion",
  "necromancy",
  "transmutation  ",
])



export default class SpellInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeProperty: null,
    };
  }

  handlePropertyClick = (property) => {
      this.setState({ activeProperty: property });
  };

  handleClosed = () => {
      this.setState({ activeProperty: null });
  };

  renderPropertyPopup() {
    const { activeProperty } = this.state;
    const description = property_descriptions[activeProperty];
  
    if (!activeProperty || !description) {
      return null;
    }

    return (
      <div className="property-popup">
        <p>{description}</p>
      </div>
    );
  }

  render() {
    const { isOpen, toggle, spellInfo } = this.props;

    if (spellInfo) {

      // Split the components into parts for rendering
      const components = spellInfo.components.split(", ").map((component) => component.trim());

      // Split the duration so that concentration can be clickable
      const durationParts = spellInfo.duration.split(',');
      const firstPart = durationParts[0].trim();
      const restParts = durationParts.slice(1).map(part => part.trim());

      // Split the spell_type to find ritual and cantrip
      const typeParts = spellInfo.spell_type.split(' ').map((part) => part.trim());

      return (
      <div>
      <Modal isOpen={isOpen} toggle={toggle} onClosed={this.handleClosed}>
          <ModalHeader className="spell-header">
            <h4>{spellInfo.spell_name}</h4>
            </ModalHeader>
          <ModalBody className="spell-modal-dark">
            <div>
            <p><i>{typeParts.map((part, index) => {
              return (
                <span key={index}>
                  {part === '(ritual)' || part === 'cantrip' || schools_of_magic.has(part) ? (
                    <span
                      className="component-link"
                      onClick={() => this.handlePropertyClick(part)}
                    >{part}</span>
                  ) : ( part )}
                  {index < typeParts.length - 1 ? ' ' : ''}
                </span>
              )})}
              </i><br />


            <b>Casting Time:</b> {spellInfo.casting_time}<br />
            <b>Range:</b> {spellInfo.spell_range}<br />
            <b>Components:</b> {components.map((component, index) => {
              const componentParts = component.split(" ");
              const clickableComponent = componentParts[0];
              const restOfComponent = componentParts.slice(1).join(" ");

              return (
                <span key={index}>
                  <span
                    onClick={() => this.handlePropertyClick(clickableComponent)}
                    className="component-link"
                  >
                    {clickableComponent}
                  </span>{" "}
                  {restOfComponent}
                  {index < components.length - 1 ? ", " : ""}
                </span>
              );
            })}
            <br />

            <b>Duration: </b> 
            {firstPart.toLowerCase() === 'concentration' ? (
              <span
                className="component-link"
                onClick={() => this.handlePropertyClick(firstPart)}
              >
                {firstPart}
              </span>
            ) : (
              firstPart
            )}
            {restParts.length > 0 && `, ${restParts.join(', ')}`}
            <br />

            {spellInfo.notes}<br />
            {spellInfo.higher_levels}<br /></p>
            {this.renderPropertyPopup()}
          </div>
          </ModalBody>
          <ModalFooter className="spell-header">
          <Button color="secondary" onClick={toggle}>
              Close
          </Button>
          </ModalFooter>
      </Modal>
      </div>
      );
    } else {
      return (<div>Loading...</div>)
    }
  }
}