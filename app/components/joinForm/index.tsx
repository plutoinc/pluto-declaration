import * as React from "react";
import { connect } from "react-redux";
import axios from "axios";
const styles = require("./joinForm.scss");

interface IJoinFormState {
  [key: string]: string;
}

class JoinForm extends React.PureComponent<{}, IJoinFormState> {
  public state = {
    name: "",
    affiliation: "",
    email: "",
    organization: "",
    comment: "",
  };

  private handleInputChange = (type: string, value: string) => {
    this.setState({
      [`${type}`]: value,
    });
  };

  private handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, affiliation, email, organization, comment } = this.state;
    axios.post("https://uunwh2xzgg.execute-api.us-east-1.amazonaws.com/production/sendSheet", {
      name,
      affiliation,
      email,
      organization,
      comment,
    });
  };

  public render() {
    const { name, affiliation, email, organization, comment } = this.state;

    return (
      <div className={styles.joinFormWrapper}>
        Hello Join Form
        <form onSubmit={this.handleSubmitForm}>
          <div>
            <input
              type="text"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                this.handleInputChange("name", e.currentTarget.value);
              }}
              value={name}
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                this.handleInputChange("affiliation", e.currentTarget.value);
              }}
              value={affiliation}
              placeholder="Affiliation"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                this.handleInputChange("email", e.currentTarget.value);
              }}
              value={email}
              placeholder="E-mail"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                this.handleInputChange("organization", e.currentTarget.value);
              }}
              value={organization}
              placeholder="Organization"
            />
          </div>
          <div>
            <input
              type="text"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                this.handleInputChange("comment", e.currentTarget.value);
              }}
              value={comment}
              placeholder="Comment to say(Optional)"
            />
          </div>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    );
  }
}

export default connect()(JoinForm);
