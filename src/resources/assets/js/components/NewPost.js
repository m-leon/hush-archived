import React from 'react';
import SimpleEncryptor from 'simple-encryptor';
import uuid from 'uuid/v4';

export default class NewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      key: '',
      cipher: '',
      clear: '',
      error: ''
    };
  }

  submitForm(e) {
    e.preventDefault();
    const key = (e.target.elements.key.value) ? e.target.elements.key.value : uuid();
    const clear = e.target.elements.clear.value;
    const cipher = SimpleEncryptor(key).encrypt(clear);
    // TODO: Submit cipher to server. Will return id. Display URL: {CurrentURL}/view/{id}/#{key}
    this.sendCipher().then(this.generatePostURL);
  }

  async sendCipher(cipher) {
    // TODO: Send to laravel
    return "ID";
  }

  generatePostURL(id) {
    console.log(`http://localhost:8080/view/${this.state.id}/#${this.state.key}`);
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <textarea placeholder="" name="clear"></textarea>
        <input type="text" placeholder="Optional key (min 16 chars)" name="key" />
        <button>Post</button>
      </form>
    );
  }
}
