import * as React from "react";
import { connect } from "react-redux";
import axios from "axios";
const styles = require("./joinForm.scss");

interface IJoinFormState {
  name: string;
}

class JoinForm extends React.PureComponent<{}, IJoinFormState> {
  public state = {
    name: "",
  };

  private handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    this.setState({
      name: value,
    });
  };

  private handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production/sendSheet", {
      name: this.state.name,
    });
  };

  public render() {
    const { name } = this.state;

    return (
      <div className={styles.joinFormWrapper}>
        Hello Join Form
        <form onSubmit={this.handleSubmitForm}>
          <input type="text" onChange={this.handleInputChange} value={name} placeholder="Your name" />
        </form>
      </div>
    );
  }
}

export default connect()(JoinForm);
