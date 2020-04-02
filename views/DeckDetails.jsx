import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomBtn from '../components/CustomBtn';
import { primaryDark } from '../utils/colors';
import { connect } from 'react-redux';

const DeckDetails = ({ deck }) => {
  const { title, questions } = deck;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.size}>
        {questions.length > 1
          ? `${questions.length} Cards`
          : `${questions.length} Card`}
      </Text>
      <View>
        <CustomBtn backgroundColor={primaryDark} onPress={() => {}}>
          Add Card
        </CustomBtn>
        <CustomBtn backgroundColor={primaryDark} onPress={() => {}} outline>
          Start Quiz
        </CustomBtn>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 50,
    marginTop: 10,
    fontWeight: '500'
  },
  size: {
    fontSize: 20,
    marginBottom: 100
  }
});

const mapStateToProps = (decks, { route }) => {
  const { key } = route.params;
  const deck = decks[key];
  return {
    deck
  };
};

export default connect(mapStateToProps)(DeckDetails);
