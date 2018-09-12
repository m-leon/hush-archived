import AES    from 'crypto-js/aes';
import axios  from 'axios';
import moment from 'moment';
import React  from 'react';
import uuid   from 'uuid/v4';

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
    // Use key if provided by user, if no key provided generate with UUIDV4
    const key = (e.target.elements.key.value) ? e.target.elements.key.value : uuid();
    const clear = e.target.elements.clear.value;
    try {
      const cipher = AES.encrypt(clear, key).toString();

      // Update state values to be submitted
      this.setState({
        formDisabled: true,
        cipher,
        key,
        clear
      });

      // If we generated a key, update the form so the user can see it
      e.target.elements.key.value = key;

      // Calculate expiration date
      const formExpiration = e.target.elements.expiration.value;
       // Default to expire after 1 view
      let expiration = 0;
      // Calculate the requested expiration time
      if (formExpiration !== '0') {
        expiration = moment().add(1, formExpiration);
        expiration = expiration.unix();
      }

      // Send cipher to server, no other data needs to be sent
      this.sendCipher({cipher, expiration});
    } catch (e) {
      // Failed to encrypt text. Maybe bad key
      this.setState({ 'error': 'Failed to encrypt. Ensure key is 16 characters.' });
    }
  }

  sendCipher(data) {
    axios.put(`/api/post/`, data).then(
      (res) => {
        // Successfully posted
        if (typeof(res.data.status) !== 'undefined' && res.data.status === '0') {
          this.setState({ id: res.data.id, error: '' });
        // Server didn't return with a status == 0, unknown error
        } else {
          this.setState({ error: 'Failed to post. Try again later.', formDisabled: false });
        }
      }
    ).catch(
      // Catch network errors
      (e) => {
        this.setState({ error: 'Failed to post. Try again later.', formDisabled: false })
      }
    );
  }

  generatePostURL(id) {
    // TODO: Find better way to output
    // For now use error to display post's URL
    let hostname = window.location.hostname;
    if (window.location.port && (window.location.port !== '80' || window.location.port != '443')) {
      hostname += ':' + window.location.port;
    }
    const postURL = `${hostname}/view/${this.state.id}/#${this.state.key}`;
    this.setState({ error: `View the post at ${postURL}` })
  }

  render() {
    return (
      <div>
        { this.state.error && <p>{this.state.error}</p> }
        <form onSubmit={this.submitForm}>
          <textarea placeholder="" name="clear" disabled={this.state.formDisabled}></textarea>
          <input type="text" placeholder="Optional key (recommended 16 chars)" name="key" disabled={this.state.formDisabled} />
          <label htmlFor="expiration">Expires in</label>
          <select name="expiration" disabled={this.state.formDisabled}>
            <option value="0">After 1 view</option>
            <option value="days">1 day</option>
            <option value="months">1 month</option>
          </select>
          <button disabled={this.state.formDisabled}>Post</button>
        </form>
      </div>
    );
  }
}
