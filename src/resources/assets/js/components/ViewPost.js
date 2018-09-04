import React from 'react';
import SimpleEncryptor from 'simple-encryptor';

export default class ViewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id, // TODO: Add check if not passed
      key: (window.location.hash).substring(1),
      cipher: '',
      clear: '',
      error: ''
    };

    this.retrieveCipher().then((cipher) => { this.setState({ cipher }) });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.key !== this.state.key || prevState.cipher !== this.state.cipher) {
      this.attemptDecrypt();
    }
  }

  async retrieveCipher() {
    // TODO: Attempt to contact laravel server and retrieve cipher by this.state.id
    const res = SimpleEncryptor("abcdefghijklmnopqrstuvwxyz").encrypt("HARDCODED!");
    return res;
  }

  attemptDecrypt() {
    let encryptor;
    try {
      encryptor = SimpleEncryptor(this.state.key);
    } catch (e) {
      this.setState({ error: "Failed to decrypt. Malformed key." });
      return;
    }
    const clear = encryptor.decrypt(this.state.cipher);
    if (clear) {
      this.setState({ clear });
    } else {
      this.setState({ error: "Failed to decrypt. Incorrect key." });
    }
  }

  render() {
    return (
      <div>
        <p>Error: {this.state.error}</p>
        <p>ID: {this.state.id}</p>
        <p>Cipher: {this.state.cipher}</p>
        <p>Clear: {this.state.clear}</p>
        <button onClick={() => { this.setState({ cipher: 'update' }); }}>Change Cipher</button>
      </div>
    );
  }
}
