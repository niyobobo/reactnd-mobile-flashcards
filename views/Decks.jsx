import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import DeckCard from '../components/DeckCard';
import { getAllDecks } from '../redux/actions/deck';

class Decks extends Component {
  componentDidMount() {
    this.props.getDecks();
  }

  handleClick = (key, title) => {
    const { navigation } = this.props;
    navigation.navigate('DeckDetails', { key, title });
  };

  renderItem = ({ item }) => {
    const { decks } = this.props;
    const { title, questions } = decks[item];
    return (
      <DeckCard
        title={title}
        questions={questions}
        onPress={() => this.handleClick(item, title)}
      />
    );
  };

  render() {
    const { decks } = this.props;
    if (!Object.keys(decks).length) {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' ? (
            <Ionicons name="ios-add" size={100} />
          ) : (
            <FontAwesome name="edit" size={80} />
          )}
          <Text>Go ahead and create your first deck!</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={Object.keys(decks)}
        renderItem={this.renderItem}
        keyExtractor={item => item}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = decks => ({
  decks: JSON.parse(JSON.stringify(decks))
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(getAllDecks())
});

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
