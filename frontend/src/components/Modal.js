import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      Character: this.props.Character,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    const updatedCharacter = { ...this.state.Character, [name]: value };

    this.setState({ Character: updatedCharacter });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit attribute</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="attribute">{ this.state.activeItem.replace('_', ' ') }</Label>
              <Input
                type="text"
                id="attribute"
                name={this.state.activeItem}
                value={this.state.Character[this.state.activeItem]}
                onChange={this.handleChange}
                placeholder="Enter new value"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.Character)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}