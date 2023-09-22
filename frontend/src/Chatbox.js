import React, { Component } from "react";
import axios from 'axios';
import './Chatbox.css';
// import { capitalizeFirstLetter } from "./components/utils";

class Chat extends Component {
    constructor(props) {
      super(props);
      this.state = {
        messages: [], // Array of chat messages
        userInput: "", // User input for custom rolls
        commandHistory: [],
        currentCommandIndex: -1,
      };
    }
  
    async componentDidUpdate(prevProps) {
        // Check if the rollString prop has changed
        if (this.props.rollString !== prevProps.rollString || this.props.rollButtonClicked) {
            this.props.resetRollButtonClicked();
            // Handle the rollString as needed
            const rollString = this.props.rollString;
            const {commandHistory} = this.state;
            const updatedHistory = [...commandHistory, rollString];
            this.setState({
                commandHistory: updatedHistory,
                currentCommandIndex: -1,
            });
            try {
                const response = await axios.get(`http://localhost:8000/roll-dice/${rollString}/`);
                const result = response.data.total;
                const result_str = response.data.result_str;
                // Update rollResult state with the dice roll result
                this.addMessage(result, this.props.rollName.replace(/_/g," "));
                console.log(result_str);
              } catch (error) {
                console.error('Error rolling dice:', error);
              }
        };
    }
 

    handleArrowDown() {
        const { currentCommandIndex, commandHistory } = this.state;
        if (currentCommandIndex < commandHistory.length - 1) {
          const nextIndex = currentCommandIndex + 1;
          this.setState({ userInput: commandHistory[nextIndex], currentCommandIndex: nextIndex });
        }
    }
      
    handleArrowUp() {
        const { currentCommandIndex, commandHistory } = this.state;
        if (currentCommandIndex === -1 && commandHistory.length > 0) {
            // If currentCommandIndex is -1 and there are commands in history, start from the most recent
            const nextIndex = commandHistory.length - 1;
            this.setState({ userInput: commandHistory[nextIndex], currentCommandIndex: nextIndex });
        } else if (currentCommandIndex > 0) {
            const prevIndex = currentCommandIndex - 1;
            this.setState({ userInput: commandHistory[prevIndex], currentCommandIndex: prevIndex });
        }
    }
      

    handleCustomRoll = async () => {
        const { userInput, commandHistory } = this.state;
        const updatedHistory = [...commandHistory, userInput];
        this.setState({
            commandHistory: updatedHistory,
            currentCommandIndex: -1,
        });

        try {
            const response = await axios.get(`http://localhost:8000/roll-dice/${userInput}/`);
            const result = response.data.total;
            const result_str = response.data.result_str;
            // Update rollResult state with the dice roll result
            this.addMessage(result, userInput);
            console.log(result_str);
          } catch (error) {
            console.error('Error rolling dice:', error);
          }
        };

    // Add a new chat message
    addMessage = (rollResult, name) => {
        const messageContent = `Roll ${name}:`;
        const message = {
            content: messageContent,
            result: rollResult,
            timestamp: new Date(),
        };
        this.setState((prevState) => ({
        messages: [...prevState.messages, message],
        }));
    };
  
    render() {
      const { messages } = this.state;
  
      return (
        <div>
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
               <div key={index} className="chat-message">
                <div className="left-justified"><b>{message.content}</b></div>
                <div className="right-justified">{message.result}</div>
                <div className="timestamp">{message.timestamp.toLocaleTimeString()}</div>
             </div>
            ))}
          </div>
        </div>
        <div className="chat-input">
        <input
          type="text"
          placeholder="Type a custom roll..."
          value={this.state.userInput}
          onChange={(e) => this.setState({ userInput: e.target.value })}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              this.handleCustomRoll();
              e.preventDefault(); // Prevent form submission or newline character
              this.setState({userInput: '' });
            } else if (e.key === "ArrowUp") {
                this.handleArrowUp();
            } else if (e.key === "ArrowDown") {
                this.handleArrowDown();
            } else if (e.key === "Backspace") {
                this.setState({currentCommandIndex: -1});
            }
          }}
        />
        <button onClick={() => {
            this.handleCustomRoll();
            this.setState({userInput: '' });
        }}>Roll</button>
      </div>
      </div>
      );
    }
  }

  export default Chat;