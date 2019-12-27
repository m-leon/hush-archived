import React from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/Lock';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import Layout from '../Layout';
import PostLink from './PostLink';
import sendForm from '../../helpers/sendForm';
import styles from './styles';
import validateForm from '../../helpers/validateForm';

const useStyles = makeStyles(styles);

const NewPost = () => {
  const classes = useStyles();

  // Prevents duplicate sends
  const [disabled, setDisabled] = React.useState(false);
  // Contains generic user-friendly errors
  const [error, setError] = React.useState('');
  // Provided by the server
  const [id, setId] = React.useState('');
  // Inputs controlled by form
  const [values, setValues] = React.useState({
    key: '',
    message: '',
    expiration: 'view' // Default is to expire after a single view
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSend = async (values) => {
    try {
      const id = await sendForm(values);
      setId(id);
    } catch {
      setError('Failed to save cipher.');
    }
  };

  const handleValidate = async (values) => {
    try {
      return validateForm(values);
    } catch {
      setError('Failed to validate input.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const validValues = await handleValidate(values);
      // The key can be overwritten in this step if the input is not specified
      setValues(validValues);
      handleSend(validValues);
    } catch (error) {
      console.log(error);
    }

    setDisabled(false);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Post Your Message
      </Typography>
      {error && <p>{error}</p>}
      <PostLink id={id} values={values} />
      <FormGroup onSubmit={handleSubmit}>
        <TextField
          autoFocus={true}
          disabled={disabled}
          multiline={true}
          name="message"
          onChange={handleChange}
          placeholder="Enter your message here"
          rows="10"
          value={values.message}
          variant="filled"
        />
        <Grid className={classes.options} container justify="space-between">
          <Grid item xs={12} md={6}>
            <TextField
              disabled={disabled}
              fullWidth={true}
              name="key"
              onChange={handleChange}
              placeholder="Optional Key (recommended 16 chars)"
              type="text"
              value={values.key}
              variant="filled"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth={true} variant="filled">
              <InputLabel id="expiration-label">Expires</InputLabel>
              <Select
                displayEmpty={true}
                labelId="expiration-label"
                name="expiration"
                onChange={handleChange}
                value={values.expiration}
              >
                <MenuItem value="view">After 1 View</MenuItem>
                <MenuItem value="hours">In 1 Hour</MenuItem>
                <MenuItem value="days">In 1 Day</MenuItem>
                <MenuItem value="weeks">In 1 Week</MenuItem>
                <MenuItem value="months">In 1 Month</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          className={classes.submitButton}
          color="primary"
          endIcon={<LockIcon />}
          onClick={handleSubmit}
          variant="contained"
        >
          Encrypt + Upload
        </Button>
      </FormGroup>
    </Layout>
  );
};

export default NewPost;
