import React, { Component } from 'react';
import { FlatList } from 'react-native';
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
    return (
      <FlatList
        data={Object.keys(decks)}
        renderItem={this.renderItem}
        keyExtractor={item => item}
      />
    );
  }
}

const mapStateToProps = decks => ({
  decks
});

const mapDispatchToProps = dispatch => ({
  getDecks: () => dispatch(getAllDecks())
});

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
