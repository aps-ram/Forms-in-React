import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      inputProvided: false,
      subscribe: true,
      textArea: "",
      typeOfFeedback: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    let checked = target.checked;
    let type = target.type;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
    this.state.firstName === "" && this.state.lastName === ""
      ? this.setState({ inputProvided: false })
      : this.setState({ inputProvided: true });
  }

  handleKeyDown(event) {
    let flag = false;
    if (
      event.keyCode === 8 &&
      (this.state.firstName === "" && this.state.lastName === "")
    ) {
      flag = false;
      console.log("false flag");
    } else {
      flag = true;
    }
    this.setState({
      inputProvided: flag
    });
  }

  render() {
    return (
      <form className="form-app">
        <label htmlFor="firstName">
          First Name
          <input
            type="text"
            id="firstName"
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </label>

        <label htmlFor="lastName">
          Last Name
          <input
            type="text"
            id="lastName"
            value={this.state.lastName}
            name="lastName"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </label>

        <label htmlFor="textArea">Enter your comments/Feedback:</label>
        <br />
        <textarea
          value={this.state.textArea}
          name="textArea"
          onChange={this.handleChange}
        />

        <label>
          <input
            type="radio"
            name="typeOfFeedback"
            value="suggestion"
            checked={this.state.typeOfFeedback === "suggestion"}
            onChange={this.handleChange}
          />{" "}
          Is the comment a suggestion?
        </label>
        <br />

        <label>
          <input
            type="radio"
            name="typeOfFeedback"
            value="feedback"
            checked={this.state.typeOfFeedback === "feedback"}
            onChange={this.handleChange}
          />{" "}
          Is the comment a feedback?
        </label>

        <div className="checkbox-container">
          <label htmlFor="subscribeId" className="subscribe-text">
            <input
              type="checkbox"
              id="subscribeId"
              checked={this.state.subscribe}
              name="subscribe"
              onChange={this.handleChange}
            />
            Subscribe to our newsletters and promotions emails
          </label>
        </div>
        <br />

        {this.state.inputProvided ? (
          <p className="para">
            {this.state.firstName} {this.state.lastName}
          </p>
        ) : null}
      </form>
    );
  }
}

export default App;
