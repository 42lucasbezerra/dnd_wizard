import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import './custom-styles.css';

export default class AttributeModal extends Component {
    
    render() {
        const { isOpen, toggle, attribute } = this.props;
        const descriptionLines = attribute.description.split('\n');
        return (
        <div>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader className="attribute-header"><h4>{attribute.name}</h4></ModalHeader>
            <ModalBody className="attribute-modal">
                {descriptionLines.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
            </ModalBody>
            <ModalFooter className="attribute-header">
            <Button color="secondary" onClick={toggle}>
                Close
            </Button>
            </ModalFooter>
        </Modal>
        </div>
        );
    }
}