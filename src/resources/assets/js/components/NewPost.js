import AES    from 'crypto-js/aes';
import axios  from 'axios';
import moment from 'moment';
import React  from 'react';
import uuid   from 'uuid/v4';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',            // Outputs errors to user
      formDisabled: false,  // Prevents user from double posting, disables the submit button once you initiate the process
      id: '',               // Holds the returned from the server once the ciphertext is submitted
      key: '',              // Holds the key from the form
      postURL: ''           // Holds the URL of the post INCLUDING the key generated from generatePostURL
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
        key
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
      this.sendCipher({ cipher, expiration });
    } catch (e) {
      // Failed to encrypt text. Maybe bad key
      this.setState({ 'error': 'Failed to encrypt.' });
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
    // For now use error to display post's URL
    let hostname = window.location.hostname;
    if (window.location.port && (window.location.port !== '80' || window.location.port != '443')) {
      hostname += ':' + window.location.port;
    }
    const postURL = `${hostname}/view/${this.state.id}/#${this.state.key}`;
    this.setState({ postURL, error: '' })
  }

  render() {
    return (
      <div className="newPost">
        <h3 className="newPost__title">Post Your Message</h3>
        { this.state.error && <p>{this.state.error}</p> }
        { this.state.postURL &&
          <div>
            <p className="newPost__url">This post is available at:</p>
            <p className="newPost__url"><a href={`//${this.state.postURL}`}>{this.state.postURL}</a></p>
          </div>
        }
        <form onSubmit={this.submitForm}>
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
