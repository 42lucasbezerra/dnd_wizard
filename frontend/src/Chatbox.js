import React, { Component } from "react";
import axios from 'axios';
import './Chatbox.css';
// import { capitalizeFirstLetter } from "./components/utils";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.chatMessagesRef = React.createRef();
    this.state = {
      messages: [], // Array of chat messages
      userInput: "", // User input for custom rolls
      commandHistory: [],
      currentCommandIndex: -1,
    };
  }

  scrollToBottom = () => {
    if (this.chatMessagesRef.current) {
      // Currently broken - need to fix
      this.chatMessagesRef.current.scrollTop = this.chatMessagesRef.current.scrollHeight;
    }
  }

  async componentDidUpdate(prevProps) {
    // Check if the rollString prop has changed
    if (this.props.rollString !== prevProps.rollString || this.props.rollButtonClicked) {
      this.props.resetRollButtonClicked();
      // Handle the rollString as needed
      const rollString = this.props.rollString;
      const { commandHistory } = this.state;
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
        this.addMessage(result_str, this.props.rollName.replace(/_/g, " "), result);
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
      this.addMessage(result_str, userInput, result);
      this.scrollToBottom();
    } catch (error) {
      console.error('Error rolling dice:', error);
    }
  };

  // Add a new chat message
  addMessage = (rollResult, name, rollTotal) => {
    // Helper function to format the rollResult
    const formatRollResult = (rollResult) => {
      // Replace **number** with colored span
      const critRegex = /~~\*\*(\d+)\*\*~~|\*\*(\d+)\*\*/g;
      rollResult = rollResult.replace(critRegex, (match, critFail, number) => {
        if (critFail !== undefined) {
          // For crit fail (~~**1**~~), apply green color and transparency
          return `<span style="color: red; opacity: 0.3;">${critFail}</span>`;
        } else if (number === '1') {
          // For other 1s, apply red color
          return '<span style="color: red;">1</span>';
        } else {
          // For other numbers, apply green color
          return `<span style="color: green;">${number}</span>`;
        }
      });

      // Replace ~~number~~ with grayed-out span
      const grayRegex = /~~(\d+)~~/g;
      rollResult = rollResult.replace(grayRegex, '<span style="color: gray;">$1</span>');
      rollResult = rollResult.replace(/`/g, '').replace(/= (\d+)/, (_, result) => {
        // Make result bold
        return `= <b>${result}</b>`;
      })

      return rollResult;
    };

    const formattedRollResult = formatRollResult(rollResult);
    const messageContent = `Roll ${name}:`;
    const message = {
      content: messageContent,
      result: formattedRollResult,
      timestamp: new Date(),
    };

    this.setState((prevState) => ({
      messages: [...prevState.messages, message],
    }));
  };


  render() {
    const { messages } = this.state;

    return (
      <div className="outer-container">
        <div className="chat-container">
          <div className="chat-messages" ref={this.chatMessagesRef}>
            {messages.map((message, index) => (
              <div key={index} className="chat-message">
                <div className="left-justified"><b>{message.content}</b></div>
                <div className="right-justified">
                  <div dangerouslySetInnerHTML={{ __html: message.result }} />
                </div>
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
                this.setState({ userInput: '' });
              } else if (e.key === "ArrowUp") {
                this.handleArrowUp();
              } else if (e.key === "ArrowDown") {
                this.handleArrowDown();
              } else if (e.key === "Backspace") {
                this.setState({ currentCommandIndex: -1 });
              }
            }}
          />
          <button onClick={() => {
            this.handleCustomRoll();
            this.setState({ userInput: '' });
          }}>Roll</button>
        </div>
      </div>
    );
  }
}

export default Chat;