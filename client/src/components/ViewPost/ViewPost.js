import React from 'react';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import Layout from '../Layout';
import retrieveCipher from '../../helpers/retrieveCipher';
import styles from './styles';
import { decrypt } from '../../helpers/encryption';

const useStyles = makeStyles(styles);

const ViewPost = (props) => {
  const classes = useStyles();

  // Ciphertext requested from server by ID
  const [cipher, setCipher] = React.useState('');
  // Uses cipher text and provided key to calculate original cleartext
  const [clear, setClear] = React.useState('');
  // Disables the key field when decrypted
  const [disabled, setDisabled] = React.useState(true);
  // User-friendly error message
  const [error, setError] = React.useState('Loading...');
  // ID to request cipher from server
  const [id] = React.useState(() => {
    // Value is based on the paramater provided by react-router
    return props.match.params.id;
  });
  // Key to attempt to decrypt cipher
  const [key, setKey] = React.useState(() => {
    // Default value is the URL Fragment Identifier
    return window.location.hash.substring(1);
  });

  // Request ciphertext based on ID from server
  React.useEffect(() => {
    const getCipher = async (id) => {
      try {
        const cipher = await retrieveCipher(id);
        setCipher(cipher);
        setError('');
      } catch {
        setCipher('');
        setError('Failed to retrieve cipher.');
      }
    };
    getCipher(id);
  }, [id]);

  // If the cleartext has been set, the correct ciphertext/key combination is assigned...
  // therefore the key should no longer be changed
  React.useEffect(() => {
    setDisabled(!!clear);
  }, [clear]);

  // Attempt decrytion when ciphertext or key updates
  React.useEffect(() => {
    // Don't overwrite error message
    if (!cipher) {
      return;
    }

    // Attempt to decrypt with provided information
    const clear = decrypt(cipher, key);

    // Incorrect key for provided ciphertext
    if (!clear) {
      setError('Failed to decrypt.');
      setClear('');
      return;
    }

    // Successfully decrypted
    setError('');
    setClear(clear);
  }, [cipher, key]);

  // Control key value from input field
  const handleKeyChange = (e) => {
    const { value } = e.target;
    setKey(value);
  };

  return (
    <Layout>
      <Grid container>
        <Typography variant="h4" gutterBottom>
          Post: <em>{id}</em>
        </Typography>
        <Grid item xs={12}>
          <Paper className={classes.content}>
            <Collapse in={!!error}>
              <Typography variant="body1">
                <em>{error}</em>
              </Typography>
            </Collapse>
            <Collapse in={!!clear}>
              <Typography variant="body1">{clear}</Typography>
            </Collapse>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <TextField
            className={classes.options}
            disabled={disabled}
            fullWidth={true}
            label="Key"
            name="key"
            onChange={handleKeyChange}
            value={key}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ViewPost;
