import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import CustomBtn from '../components/CustomBtn';
import { deleteDeck } from '../redux/actions/deck';
import { primaryDark, red } from '../utils/colors';

class DeckDetails extends Component {
  handleRemoveDeck = () => {
    const { id, navigation, removeDeck } = this.props;
    removeDeck(id);
    navigation.goBack();
  };

  render() {
    const { deck } = this.props;
    if (!deck) {
      return (
        <View>
          <Text>No data available</Text>
        </View>
      );
    }

    const { title, questions } = deck;
    const { navigation, id } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.size}>
          {questions.length > 1
            ? `${questions.length} Cards`
            : `${questions.length} Card`}
        </Text>
        <View>
          <CustomBtn
            backgroundColor={primaryDark}
            onPress={() => navigation.navigate('Add Card', { deck: id })}
          >
            Add Card
          </CustomBtn>
          <CustomBtn
            backgroundColor={primaryDark}
            onPress={() => navigation.navigate('Quiz', { deck: id })}
            outline
          >
            Start a Quiz
          </CustomBtn>
          <CustomBtn
            backgroundColor={red}
            onPress={this.handleRemoveDeck}
            outline
          >
            Delete Deck
          </CustomBtn>
        </View>
      </View>
    );
  }
}

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

const mapDispatchToProps = dispatch => ({
  removeDeck: key => dispatch(deleteDeck(key))
});

const mapStateToProps = (decks, { route }) => {
  const { key } = route.params;
  const deck = decks[key];
  return {
    deck,
    id: key
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
