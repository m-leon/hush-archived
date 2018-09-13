import axios    from 'axios';
import CryptoJS from 'crypto-js';
import React    from 'react';

export default class ViewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      key: (window.location.hash).substring(1),
      cipher: '',
      clear: '',
      error: 'Loading...'
    };
    this.onKeyChange = this.onKeyChange.bind(this);
  }

  onKeyChange(e) {
    const key = e.target.value;
    this.setState(() => ({ key }));
  }

  componentDidMount() {
    // Check if invalid ID passed
    if (this.state.id) {
      // Use ID given in URL to retrieve ciphertext from server
      this.retrieveCipher();
    }

    // Update state if location's hash changes
    window.onhashchange = () => {
      this.setState({ key: (window.location.hash).substring(1) });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Once ciphertext is retrieved from the server or the key in the URL hash is updated,
    // Attempt to decrypt
    if (prevState.key !== this.state.key || prevState.cipher !== this.state.cipher) {
      // Set window hash equal to key
      // Should only change anything if the user updates the key in the textbox
      window.location.hash = this.state.key;
      this.attemptDecrypt();
    }
  }

  retrieveCipher() {
    // Make asynchronous request to backend for ciphertext of given ID
    axios.get(`/api/post/${this.state.id}`).then(
      (res) => {
        // Successfully retrieved ciphertext
        if (typeof(res.data.status) !== 'undefined' && res.data.status === '0') {
          this.setState({ cipher: res.data.ciphertext });
        // Server didn't return with a status == 0, ignore data
        } else {
          this.setState({ error: 'Failed to retrieve cipher.' });
        }
      }
    ).catch(
      // Catch network errors
      (e) => {
        this.setState({ error: 'Failed to retrieve cipher. Check your connection.' })
      }
    );
  }

  attemptDecrypt() {
    try {
      // Use cipher provided by the server and the key provided in the URL
      const decryptedBytes = CryptoJS.AES.decrypt(this.state.cipher, this.state.key);
      const clear = decryptedBytes.toString(CryptoJS.enc.Utf8);

      if (clear) {
        // Successful decryption
        this.setState({ clear, error: '' });
      } else {
        // Incorrect cipher or key
        this.setState({ error: 'Failed to decrypt.', clear: '' });
      }
    } catch (e) {
      // Error thrown if decrypted bytes can't be converted
      this.setState({ error: 'Failed to decrypt.', clear: '' });
    }
  }

  render() {
    return (
      <div className="viewPost">
        <h3>Post {this.state.id}</h3>
        { this.state.error && <p>{this.state.error}</p> }
        { this.state.clear && <p className="viewPost__message">{this.state.clear}</p> }
        <span className="viewPost__options">
          <label htmlFor="key">Key:</label>
          <input
            disabled={this.state.clear} /* Field disabled if decryption was successful */
            name="key"
            onChange={this.onKeyChange}
            type="text"
            value={this.state.key}
          />
        </span>
      </div>
    );
  }
}
