import React  from 'react';

import NewPostURL from './NewPostURL';
import SendForm   from '../utils/SendForm';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',            // Outputs errors to user
      formDisabled: false,  // Prevents user from double posting, disables the submit button once you initiate the process
      id: '',               // Holds the returned from the server once the ciphertext is submitted
      key: ''               // Holds the key from the form
    };
  }

  render() {
    return (
      <div className="newPost">
        <h3 className="newPost__title">Post Your Message</h3>
        { this.state.error && <p>{this.state.error}</p> }
        <NewPostURL id={this.state.id} encKey={this.state.key} />
        <form onSubmit={
          async (e) => {
            this.setState({ formDisabled: true });
            const newState = await SendForm(e);
            this.setState({ ...newState });
          }
        }>
          <textarea
            className="newPost__message"
            disabled={this.state.formDisabled}
            name="clear"
            placeholder="Enter your message here"
            rows="10"
          >
          </textarea>
          <span className="newPost__options">
            <input
              className="newPost__key"
              disabled={this.state.formDisabled}
              name="key"
              placeholder="Key (recommended 16 chars)"
              type="text"
            />
            <label htmlFor="expiration">Expires in</label>
            <select name="expiration" disabled={this.state.formDisabled}>
              <option value="0">After 1 view</option>
              <option value="days">1 day</option>
              <option value="months">1 month</option>
            </select>
          </span>
          <button disabled={this.state.formDisabled}>Post</button>
        </form>
      </div>
    );
  }
}
