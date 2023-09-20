import React, { Component } from "react";
import axios from 'axios';

class Chat extends Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: [], // Array of chat messages
        userInput: "", // User input for custom rolls
      };
    }
  
    async componentDidUpdate(prevProps) {
        // Check if the rollString prop has changed
        if (this.props.rollString !== prevProps.rollString) {
            // Handle the rollString as needed
            const rollString = this.props.rollString;
            try {
                const response = await axios.get(`http://localhost:8000/roll-dice/${rollString}/`);
                const result = response.data.total;
                const result_str = response.data.result_str;
                // Update rollResult state with the dice roll result
                this.addMessage(`Dice roll result: ${result}`);
                console.log(result_str);
              } catch (error) {
                console.error('Error rolling dice:', error);
              }
            };
    }

    handleCustomRoll = async () => {
        const { userInput } = this.state;

        try {
            const response = await axios.get(`http://localhost:8000/roll-dice/${userInput}/`);
            const result = response.data.total;
            const result_str = response.data.result_str;
            // Update rollResult state with the dice roll result
            this.addMessage(`Dice roll result: ${result}`);
            console.log(result_str);
          } catch (error) {
            console.error('Error rolling dice:', error);
          }
        };

    // Add a new chat message
    addMessage = (content) => {
      const message = { content, timestamp: new Date() };
      this.setState((prevState) => ({
        messages: [...prevState.messages, message],
      }));
    };
  
    render() {
      const { messages } = this.state;
  
      return (
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className="chat-message">
                {message.timestamp.toLocaleTimeString()}: {message.content}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type a custom roll..."
              value={this.state.userInput}
              onChange={(e) => this.setState({ userInput: e.target.value })}
            />
            <button onClick={this.handleCustomRoll}>Roll</button>
          </div>
        </div>
      );
    }
  }

  export default Chat;