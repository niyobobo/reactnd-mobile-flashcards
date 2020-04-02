import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomBtn from '../components/CustomBtn';
import { primaryDark } from '../utils/colors';

class NewDeck extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <CustomBtn backgroundColor={primaryDark} onPress={() => {}}>
            Create
          </CustomBtn>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default NewDeck;
