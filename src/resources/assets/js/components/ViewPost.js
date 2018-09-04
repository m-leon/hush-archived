import axios from 'axios';
import React from 'react';
import SimpleEncryptor from 'simple-encryptor';

export default class ViewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id, // TODO: Add check if not passed
      key: (window.location.hash).substring(1),
      cipher: '',
      clear: 'Loading...',
      error: ''
    };

    this.retrieveCipher();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.key !== this.state.key
     || prevState.cipher !== this.state.cipher) {
      this.attemptDecrypt();
    }
  }

  retrieveCipher() {
    axios.get(`/api/post/${this.state.id}`).then(
      (res) => {
        if (res.data.id === this.state.id) {
          this.setState({ cipher: res.data.ciphertext });
        } else {
          this.setState({ error: 'Failed to retrieve cipher.' });
        }
      }
    ).catch(
      (e) => {
        this.setState({ error: 'Failed to retrieve cipher text from server.' })
      }
    );
  }

  attemptDecrypt() {
    let encryptor;
    try {
      encryptor = SimpleEncryptor(this.state.key);
    } catch (e) {
      this.setState({ error: 'Failed to decrypt. Malformed key.' });
      return;
    }
    const clear = encryptor.decrypt(this.state.cipher);
    if (clear) {
      this.setState({ clear, error: '' });
    } else {
      this.setState({ error: 'Failed to decrypt. Incorrect key.' });
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
