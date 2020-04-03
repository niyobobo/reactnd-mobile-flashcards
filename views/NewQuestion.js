import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import CustomBtn from '../components/CustomBtn';
import { createCard } from '../redux/actions/card';
import { primaryDark, red } from '../utils/colors';

class NewQuestion extends Component {
  state = {
    question: '',
    answer: '',
    questionError: false,
    answerError: false
  };

  handleChange = (text, name) => {
    this.setState(() => ({
      [name]: text,
      questionError: false,
      answerError: false
    }));
  };

  handleSubmit = () => {
    const { question, answer } = this.state;
    if (!question.length && !answer.length) {
      return this.setState(() => ({ questionError: true, answerError: true }));
    }

    if (!question.length) {
      return this.setState(() => ({ questionError: true }));
    }

    if (!answer.length) {
      return this.setState(() => ({ answerError: true }));
    }

    const { route } = this.props;
    this.props.createQuestion({ question, answer }, route.params.deck);
    this.setState(() => ({
      question: '',
      answer: '',
      questionError: false,
      answerError: false
    }));
    this.props.navigation.goBack();
  };

  render() {
    const { question, answer, answerError, questionError } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.title}>Create a new question</Text>
        <TextInput
          placeholder="Question"
          style={[styles.control, questionError && { borderColor: red }]}
          value={question}
          onChangeText={text => this.handleChange(text, 'question')}
        />
        <TextInput
          placeholder="Answer"
          style={[styles.control, answerError && { borderColor: red }]}
          value={answer}
          onChangeText={text => this.handleChange(text, 'answer')}
        />
        <CustomBtn backgroundColor={primaryDark} onPress={this.handleSubmit}>
          Submit
        </CustomBtn>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
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
  createQuestion: (card, deck) => dispatch(createCard(card, deck))
});

export default connect(null, mapDispatchToProps)(NewQuestion);
