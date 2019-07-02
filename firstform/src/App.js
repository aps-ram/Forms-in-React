import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      emailAddr: "",
      inputProvided: false,
      subscribe: true,
      textArea: "",
      typeOfFeedback: "",
      buttonText: "Submit Form"
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
    this.state.name === ""
      ? this.setState({ inputProvided: false })
      : this.setState({ inputProvided: true });
  }

  handleKeyDown(event) {
    let flag = false;
    if (event.keyCode === 8 && this.state.name === "") {
      flag = false;
      console.log("false flag");
    } else {
      flag = true;
    }
    this.setState({
      inputProvided: flag
    });
  }

  formSubmit(event) {
    event.preventDefault(); //to avoid the page reloading.
    this.setState({
      buttonText: "Sending email..."
    });
    let data = {
      emailID: this.state.emailAddr,
      message: "Email from React Form"
    };

    axios
      .post("API_URI", data)
      .then(res => {
        alert("email sent!");
        this.setState({
          buttonText: "Sent email"
        });
        this.resetForm();
      })
      .catch(() => {
        alert("email not sent. Please check your details and submit again!");
        this.setState({
          buttonText: "Submit Form"
        });
      });
  }

  resetForm() {
    this.setState({
      name: "",
      emailAddr: "",
      inputProvided: false,
      subscribe: true,
      textArea: "",
      typeOfFeedback: "",
      buttonText: "Submit Form"
    });
  }
  render() {
    return (
      <form className="form-app" onSubmit={e => this.formSubmit(e)}>
        <label htmlFor="name">
          First Name
          <input
            type="text"
            id="Name"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </label>

        <label htmlFor="emailAddr">
          Email Addr
          <input
            type="text"
            id="emailAddr"
            value={this.state.emailAddr}
            name="emailAddr"
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
        <button className="submit-button" type="submit">
          {this.state.buttonText}
        </button>

        {/*this.state.inputProvided ? (
          <p className="para">
            {this.state.name}
          </p>
        ) : null*/}
      </form>
    );
  }
}

export default App;
