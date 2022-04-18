import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  SafeAreaView,
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

const TextInANest = () => {
  const bodyText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis urna justo, laoreet volutpat sem tempor at. Aliquam fermentum urna id nisi luctus, consectetur congue sem euismod. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut eros mi, blandit id urna iaculis, cursus aliquam neque. Sed bibendum augue tristique, auctor enim nec, facilisis tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean sagittis dui sed ligula feugiat, ac sagittis dui accumsan. Aliquam ut aliquet nulla. Suspendisse a massa elementum, pretium leo convallis, consectetur purus. Nam eget justo at enim sagittis fermentum. Pellentesque iaculis porta neque ac eleifend.';
  const [titleText, setTitleText] = useState("Bird's Nest");
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text
          onPress={() => setTitleText('Title pressed')}
          style={styles.titleText}>
          {titleText}
        </Text>
        <Text style={styles.bigText}>{bodyText}</Text>
      </ScrollView>
      <View style={styles.fitToText}>
        <Button onPress={() => setCount(count + 1)} title="Click me" />
        <Button disabled title="too poor" />
        <Button onPress={() => setCount(0)} title="reset count" />
      </View>
      <Text>You clicked {count} times</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  fitToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigText: {
    fontSize: 40,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 10,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontWeight: 'bold',
  },
});

export default TextInANest;
