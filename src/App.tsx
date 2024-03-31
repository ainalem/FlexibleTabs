import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import TabMenu from './TabMenu';

const App = () => {
  return (
    <SafeAreaView style={styles.bg}>
      <View style={[styles.container]}>
        <TabMenu tabs={['Tab 1', 'Longer Tab 2', 'Tab 3']} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'black',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default App;
