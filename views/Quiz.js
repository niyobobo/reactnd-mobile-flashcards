import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import AnswerView from '../components/Answer';
import CustomBtn from '../components/CustomBtn';
import FinalScore from '../components/FinalScore';
import { primary, primaryDark, white } from '../utils/colors';
import { clearAllLocalNotification, setLocalNotification } from '../utils/helper';

class Quiz extends Component {
  state = {
    correctAnswer: 0,
    currentQuestion: 0,
    showAnswer: false
  };

  handleShowAnswer = () => {
    this.setState(() => ({
      showAnswer: true
    }));
  };

  handleWrongAnswer = () => {
    this.setState(prevState => ({
      currentQuestion: prevState.currentQuestion + 1,
      showAnswer: false
    }));
  };

  handleCorrectAnswer = () => {
    this.setState(prevState => ({
      currentQuestion: prevState.currentQuestion + 1,
      correctAnswer: prevState.correctAnswer + 1,
      showAnswer: false
    }));
  };

  handleReset = () => {
    this.setState(() => ({
      correctAnswer: 0,
      currentQuestion: 0,
      showAnswer: false
    }));
    clearAllLocalNotification().then(setLocalNotification);
  };

  render() {
    const { questions, navigation } = this.props;
    if (!questions.length) {
      return (
        <View style={styles.noContent}>
          <Text style={[styles.label, { color: primaryDark }]}>
            Sorry, You can't take this quiz. There is no card in the deck
          </Text>
        </View>
      );
    }

    const { currentQuestion, correctAnswer, showAnswer } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.label}>
            {`${
              currentQuestion !== questions.length
                ? currentQuestion + 1
                : currentQuestion
            } / ${questions.length}`}
          </Text>
        </View>
        {currentQuestion === questions.length ? (
          <FinalScore
            correctAnswer={correctAnswer}
            questions={questions}
            restart={this.handleReset}
            goBack={() => {
              navigation.goBack();
              clearAllLocalNotification().then(setLocalNotification);
            }}
          />
        ) : (
          <View>
            <View style={styles.question}>
              <Text style={styles.title}>Question</Text>
              <Text style={styles.qtnLabel}>
                {questions[currentQuestion].question}
              </Text>
            </View>
            {!showAnswer ? (
              <CustomBtn
                backgroundColor={primary}
                onPress={this.handleShowAnswer}
                outline
              >
                Show Answer
              </CustomBtn>
            ) : (
              <AnswerView
                styles={styles}
                questions={questions}
                currentQuestion={currentQuestion}
                handleCorrectAnswer={this.handleCorrectAnswer}
                handleWrongAnswer={this.handleWrongAnswer}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    color: white,
    marginBottom: 5
  },
  container: {
    padding: 20
  },
  heading: {
    backgroundColor: primary,
    borderRadius: 5,
    padding: 10
  },
  question: {
    marginTop: 50
  },
  title: {
    fontSize: 40,
    fontWeight: '300'
  },
  qtnLabel: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 30
  }
});

const mapStateToProps = (state, { route }) => {
  const { deck } = route.params;
  const data = state[deck];
  return {
    questions: data.questions
  };
};

export default connect(mapStateToProps)(Quiz);
