import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import DeckCard from '../components/DeckCard';
import { data } from '../utils/data';

class Decks extends Component {
  state = {};

  renderItem = ({ item }) => {
    const { title, questions } = data[item];
    return (
      <DeckCard
        key={item}
        title={title}
        questions={questions}
        onPress={() => {}}
      />
    );
  };

  render() {
    return <FlatList data={Object.keys(data)} renderItem={this.renderItem} />;
  }
}

export default Decks;
