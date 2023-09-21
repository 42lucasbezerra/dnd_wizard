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

export default class RollModal extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { isOpen, toggle } = this.props;
        return (
        <div>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader className="weapon-header"><h4>On dice rolling</h4></ModalHeader>
            <ModalBody className="weapon-modal">
                <p>Hello</p>
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