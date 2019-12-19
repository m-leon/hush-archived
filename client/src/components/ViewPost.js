import React from 'react';
import { Link } from 'react-router-dom';

import { decrypt } from '../utils/Encryption';
import RetrieveCipher from '../utils/RetrieveCipher';

export default class ViewPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.match.params.id,
      key: window.location.hash.substring(1),
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
      RetrieveCipher(this.state.id).then((res) => {
        this.setState(() => ({ ...res }));
      });
    }

    // Update state if location's hash changes
    window.onhashchange = () => {
      this.setState({ key: window.location.hash.substring(1) });
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Once ciphertext is retrieved from the server or the key in the URL hash is updated,
    // Attempt to decrypt
    if (
      prevState.key !== this.state.key ||
      prevState.cipher !== this.state.cipher
    ) {
      // Set window hash equal to key
      // Should only change anything if the user updates the key in the textbox
      window.location.hash = this.state.key;

      // Use cipher provided by the server and the key provided in the URL
      const clear = decrypt(this.state.cipher, this.state.key);

      if (clear) {
        // Successful decryption
        this.setState({ clear, error: '' });
      } else {
        // Incorrect cipher or key
        this.setState({ error: 'Failed to decrypt.', clear: '' });
      }
    }
  }

  render() {
    return (
      <div className="viewPost">
        <h3 className="viewPost__title">Post {this.state.id}</h3>
        <div className="viewPost__container">
          {this.state.error && (
            <p className="viewPost__error">{this.state.error}</p>
          )}
          {this.state.clear && (
            <p className="viewPost__message">{this.state.clear}</p>
          )}
          <span className="viewPost__options">
            <label htmlFor="key">Key:</label>
            <input
              disabled={
                this.state.clear
              } /* Field disabled if decryption was successful */
              name="key"
              onChange={this.onKeyChange}
              type="text"
              value={this.state.key}
            />
          </span>
          <Link to="/" className="viewPost__newPost-btn">
            New Post
          </Link>
        </div>
      </div>
    );
  }
}
