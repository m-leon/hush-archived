import axios from 'axios';
import React from 'react';
import SimpleEncryptor from 'simple-encryptor';
import uuid from 'uuid/v4';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formDisabled: false,
      id: '',
      key: '',
      cipher: '',
      clear: '',
      error: ''
    };

    this.submitForm = this.submitForm.bind(this);
    this.sendCipher = this.sendCipher.bind(this);
    this.generatePostURL = this.generatePostURL.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.generatePostURL();
    }
  }

  submitForm(e) {
    e.preventDefault();
    const key = (e.target.elements.key.value) ? e.target.elements.key.value : uuid();
    const clear = e.target.elements.clear.value;
    try {
      const cipher = SimpleEncryptor(key).encrypt(clear);
    } catch (e) {
      // Failed to encrypt text. Maybe bad key
      this.setState({ 'error': 'Failed to encrypt. Ensure key is 16 characters.' });
      return;
    }

    // Update state values to be submitted
    this.setState({
      formDisabled: true,
      cipher,
      key,
      clear
    });

    // Update form with generated key
    e.target.elements.key.value = key;

    // Send cipher to server, no other data needs to be sent
    this.sendCipher(cipher);
  }

  sendCipher(cipher) {
    const data = { cipher };
    axios.put(`/api/post/`, data).then(
      (res) => {
        // Successfully posted
        if (typeof(res.data.status) !== 'undefined' && res.data.status === '1') {
          this.setState({ id: res.data.id, error: '' });
        // Server didn't return with a status == 1, unknown error
        } else {
          this.setState({ error: 'Failed to post. Try again later.', formDisabled: false });
        }
      }
    ).catch(
      // Catch network errors
      (e) => {
        this.setState({ error: 'Failed to post. Check your connection.', formDisabled: false })
      }
    );
  }

  generatePostURL(id) {
    // TODO: Find better way to output
    // For now use error to display post's URL
    this.setState({ error: `${window.location.hostname}/view/${this.state.id}/#${this.state.key}` })
  }

  render() {
    return (
      <div>
        { this.state.error && <p>{this.state.error}</p> }
        <form onSubmit={this.submitForm}>
          <textarea placeholder="" name="clear" disabled={this.state.formDisabled}></textarea>
          <input type="text" placeholder="Optional key (min 16 chars)" name="key" disabled={this.state.formDisabled} />
          <button disabled={this.state.formDisabled}>Post</button>
        </form>
      </div>
    );
  }
}
