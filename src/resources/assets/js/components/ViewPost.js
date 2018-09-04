import axios from 'axios';
import React from 'react';
import SimpleEncryptor from 'simple-encryptor';

export default class ViewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      key: (window.location.hash).substring(1),
      cipher: '',
      clear: 'Loading...',
      error: ''
    };
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
      this.attemptDecrypt();
    }
  }

  retrieveCipher() {
    // Make asynchronous request to backend for ciphertext of given ID
    axios.get(`/api/post/${this.state.id}`).then(
      (res) => {
        // Successfully retrieved ciphertext
        if (typeof(res.data.status) !== 'undefined' && res.data.status === '1') {
          this.setState({ cipher: res.data.ciphertext });
        // Server didn't return with a status == 1, ignore data
        } else {
          this.setState({ error: 'Failed to retrieve cipher. Wrong ID?' });
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
      // Validate key with SimpleEncryptor, throws error if invalid
      const encryptor = SimpleEncryptor(this.state.key);
      // Attempt to use key to decrypt, returns empty if invalid
      const clear = encryptor.decrypt(this.state.cipher);

      if (clear) {
        // Successful decryption
        this.setState({ clear, error: '' });
      } else {
        this.setState({ error: 'Failed to decrypt. Incorrect key.', clear: '' });
      }

    } catch (e) {
      this.setState({ error: 'Failed to decrypt. Malformed key.', clear: '' });
    }
  }

  render() {
    return (
      <div>
        <p>Error: {this.state.error}</p>
        <p>ID: {this.state.id}</p>
        <p>Cipher: {this.state.cipher}</p>
        <p>Clear: {this.state.clear}</p>
      </div>
    );
  }
}
