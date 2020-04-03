import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { primary } from '../utils/colors';
import CustomBtn from './CustomBtn';

const FinalScore = ({ correctAnswer, questions, restart, goBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Final score:</Text>
      <Text style={styles.desc}>{`${correctAnswer} correct answers from ${
        questions.length
      } questions (${Math.floor(
        (correctAnswer / questions.length) * 100
      )}%)`}</Text>
      <CustomBtn backgroundColor={primary} onPress={restart}>
        Restart Quiz
      </CustomBtn>
      <CustomBtn backgroundColor={primary} onPress={goBack}>
        Back to Deck
      </CustomBtn>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  header: {
    fontSize: 30,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  desc: {
    fontSize: 25,
    marginBottom: 50
  }
});

export default FinalScore;
