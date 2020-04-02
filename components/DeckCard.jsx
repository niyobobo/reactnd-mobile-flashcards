import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { white, primaryDark } from '../utils/colors';

const DeckCard = ({ title, questions, onPress }) => {
  const size = questions.length;
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.size}>
        {size > 1 ? `${size} Cards` : `${size} Card`}
      </Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: 5,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 3,
    shadowOpacity: 1,
    shadowColor: 'rgba(0, 0, 0, .3)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  size: {
    fontSize: 20,
    fontWeight: '300'
  },
  title: {
    fontSize: 50,
    marginTop: 10,
    fontWeight: 'bold',
    color: primaryDark
  }
});

export default DeckCard;
