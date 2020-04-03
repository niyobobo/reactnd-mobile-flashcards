import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { red, primary, white } from '../utils/colors';

const AnswerView = ({
  questions,
  handleWrongAnswer,
  handleCorrectAnswer,
  currentQuestion
}) => {
  return (
    <View>
      <Text style={styles.title}>Answer</Text>
      <Text style={styles.qtnLabel}>{questions[currentQuestion].answer}</Text>
      <Text style={[styles.qtnLabel, { fontWeight: 'bold' }]}>
        How did you do.....?
      </Text>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[styles.btn, styles.btnDanger]}
          onPress={handleWrongAnswer}
        >
          <Text style={styles.label}>Incorrect</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnCorrect]}
          onPress={handleCorrectAnswer}
        >
          <Text style={styles.label}>Correct</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: '300'
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    color: white,
    marginBottom: 5
  },
  qtnLabel: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30
  },
  btnGroup: {
    flexDirection: 'row'
  },
  btn: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnDanger: {
    backgroundColor: red
  },
  btnCorrect: {
    backgroundColor: primary
  }
});

export default AnswerView;
