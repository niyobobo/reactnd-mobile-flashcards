import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import CustomBtn from '../components/CustomBtn';
import { createADeck } from '../redux/actions/deck';
import { primaryDark, red } from '../utils/colors';

class NewDeck extends Component {
  state = {
    input: '',
    error: false
  };

  handleChange = input => {
    this.setState(() => ({
      input,
      error: false
    }));
  };

  handleSubmit = () => {
    const { input } = this.state;
    if (!input.length) {
      return this.setState(() => ({ error: true }));
    }
    this.props.createDeck(input);
    this.setState(() => ({
      input: ''
    }));
    this.props.navigation.goBack();
  };

  render() {
    const { input, error } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.title}>What's the title of your new deck?</Text>
        <TextInput
          placeholder="Deck title"
          style={[styles.control, error && { borderColor: red }]}
          value={input}
          onChangeText={this.handleChange}
        />
        <CustomBtn backgroundColor={primaryDark} onPress={this.handleSubmit}>
          Create
        </CustomBtn>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center'
  },
  control: {
    borderRadius: 5,
    width: 250,
    padding: 10,
    fontSize: 20,
    borderColor: primaryDark,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 20
  }
});

const mapDispatchToProps = dispatch => ({
  createDeck: title => dispatch(createADeck(title))
});

export default connect(null, mapDispatchToProps)(NewDeck);
