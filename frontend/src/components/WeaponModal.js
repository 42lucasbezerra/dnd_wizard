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

const properties = [
    'ammunition',
    'finesse',
    'heavy',
    'light',
    'loading',
    'reach',
    'special',
    'thrown',
    'two_handed',
    'versatile',
    'monk',
]

const property_descriptions = {
    ammunition: "You can use a weapon that has the ammunition property to make a ranged attack only if you have ammunition to fire from the weapon. Each time you attack with the weapon, you expend one piece of ammunition. Drawing the ammunition from a quiver, case, or other container is part of the attack (you need a free hand to load a one-handed weapon). At the end of the battle, you can recover half your expended ammunition by taking a minute to search the battlefield. If you use a weapon that has the ammunition property to make a melee attack, you treat the weapon as an improvised weapon.",
    finesse: "When making an attack with a finesse weapon, you use your choice of your Strength or Dexterity modifier for the attack and damage rolls. You must use the same modifier for both rolls.",
    heavy: "Small creatures have disadvantage on attack rolls with heavy weapons. A heavy weapon's size and bulk make it too large for a Small creature to use effectively.",
    light: "A light weapon is small and easy to handle, making it ideal for use when fighting with two weapons.",
    loading: "Because of the time required to load this weapon, you can fire only one piece of ammunition from it when you use an action, bonus action, or reaction to fire it, regardless of the number of attacks you can normally make.",
    reach: "This weapon adds 5 feet to your reach when you attack with it, as well as when determining your reach for opportunity attacks with it.",
    special: "A weapon with the special property has unusual rules governing its use, explained in the weapons description.",
    thrown: "If a weapon has the thrown property, you can throw the weapon to make a ranged attack. If the weapon is a melee weapon, you use the same ability modifier for that attack roll and damage roll that you would use for a melee attack with the weapon. For example, if you throw a handaxe, you use your Strength, but if you throw a dagger, you can use either your Strength or your Dexterity, since the dagger has the finesse property.",
    two_handed: "This weapon requires two hands when you attack with it.",
    versatile: "This weapon can be used with one or two hands. The damage when the weapon is wielded with one hand is shown as the first value in the damage attribute; the two-handed damage is included in parentheses. For example, 1d6 (1d8) means a one-handed attack deals 1d6 damage if it hits, while a two-handed attack deals 1d8 damage if it hits.",
    monk: "Monk weapon.",
    range: "A weapon that can be used to make a ranged attack has two values displayed with a slash in between them. The first is the weapon’s normal range in feet, and the second indicates the weapon’s long range. When attacking a target beyond normal range, you have disadvantage on the attack roll. You can’t attack a target beyond the weapon’s long range.",
}

export default class WeaponInfoModal extends Component {
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
      
        // Render your popup/modal here, using `description` for content
        return (
          <div className="property-popup">
            <h6>{capitalizeFirstLetter(activeProperty.replace('_', '-'))}</h6>
            <p>{description}</p>
          </div>
        );
      }
    
    render() {
        const { isOpen, toggle, weaponInfo } = this.props;
        if (weaponInfo) {
        return (
        <div>
        <Modal isOpen={isOpen} toggle={toggle} onClosed={this.handleClosed}>
            <ModalHeader className="weapon-header"><h4>{weaponInfo.name}</h4></ModalHeader>
            <ModalBody className="weapon-modal">
            <p><i>{weaponInfo.weapon_type} weapon</i><br />
            <b>Range: </b>
            {weaponInfo.range === "0" ? (
                "Melee"
                ) : weaponInfo.range.includes("/") ? (
                <span
                    className="property-link"
                    onClick={() => this.handlePropertyClick("range")}
                >
                    {weaponInfo.range}
                </span>
                ) : (
                    weaponInfo.range
                )}{" "}
                <br />
            <b>Damage:</b> {weaponInfo.damage_dice}<br />
            <b>Damage Type:</b> {weaponInfo.damage_type}<br />
            <b>Properties:</b>&nbsp;
            {properties
                    .filter(property => weaponInfo[property])
                    .map((property, index, array) => (
                        <span
                            key={property}
                            onClick={() => this.handlePropertyClick(property)}
                            className="property-link"
                        >
                            {property.replace('_', '-')}
                            {index < array.length - 1 && ", "}
                        </span>
                    ))} <br />
            <b>Weight:</b> {weaponInfo.weight} lbs<br />
            <b>Cost:</b> {weaponInfo.cost}</p>
            {this.renderPropertyPopup()}
            </ModalBody>
            <ModalFooter className="weapon-header">
            <Button color="secondary" onClick={toggle}>
                Close
            </Button>
            </ModalFooter>
        </Modal>
        </div>
        );
    }
    }
}