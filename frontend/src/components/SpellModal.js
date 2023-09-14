import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default class SpellInfoModal extends Component {
  render() {
    const { isOpen, toggle, spellInfo } = this.props;

    return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Spell Information</ModalHeader>
        <ModalBody>
          <p>Name: {spellInfo.name}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
