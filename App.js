import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  FlatList,
  Animated,
  Alert,
  StatusBar,
  SafeAreaView,
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

const LoremIpsum = () => {
  return (
    <View>
      <Text style={styles.bigText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis
        urna justo, laoreet volutpat sem tempor at. Aliquam fermentum urna id
        nisi luctus, consectetur congue sem euismod. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Ut eros mi, blandit id urna iaculis, cursus aliquam neque. Sed bibendum
        augue tristique, auctor enim nec, facilisis tellus. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Aenean sagittis dui sed ligula feugiat, ac sagittis dui accumsan.
        Aliquam ut aliquet nulla. Suspendisse a massa elementum, pretium leo
        convallis, consectetur purus. Nam eget justo at enim sagittis fermentum.
        Pellentesque iaculis porta neque ac eleifend.
      </Text>
    </View>
  );
};

const List = props => {
  return (
    <View>
      <Text>Hello {props.name}</Text>
    </View>
  );
};

const Cat = props => {
  const [isHungry, setIsHungry] = useState(true);
  return (
    <View>
      <Text>
        I am {props.name} and i am {isHungry ? 'hungry' : 'no longer hungry'}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            setIsHungry(false);
          }}
          disabled={!isHungry}
          title={isHungry ? 'Hungry state' : 'no longer hungry'}
        />
      </View>
    </View>
  );
};

const App = () => {
  const _onPressButton = () =>
    Alert.alert(
      'title',
      'content',
      [
        {
          text: 'Later',
        },
        {
          text: 'cancel',
          onPress: () =>
            Alert.alert('cancel clicked', 'body', [], {cancelable: true}),
        },
        {
          text: 'ok',
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert('outside tapped', '', [{text: 'ok'}], {cancelable: true}),
      },
    );

  //ANIMATION
  //value for opacity. Initial 0
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDrive: true,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 5000,
      useNativeDrive: true,
    }).start();
  };

  //STRING
  const getFullName = (familyName, middleName, lastName) => {
    return familyName + ' ' + middleName + ' ' + lastName;
  };
  const [titleText, setTitleText] = useState("Bird's Nest");
  const [count, setCount] = useState(0);
  const [translateText, setTranslateText] = useState('');

  //API
  //TODO: understand this mess
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [metaTitle, setMetaTitle] = useState([]);
  const [metaDescription, setMetaDescription] = useState([]);
  const [bulk, setBulk] = useState([]);
  const getMovies = async () => {
    try {
      //fetch in useEffect()
      const response = await fetch('https://reactnative.dev/movies.json');
      //converts to json object
      const json = await response.json();
      //saves data to setData
      setData(json.movies);
      setMetaDescription(json.description);
      setMetaTitle(json.title);
      //still works, call the outer vars like bulk.title or bulk.description
      setBulk(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  //side effect in function components
  useEffect(() => {
    getMovies();
  });

  const printConsole = () => {
    console.log('Use this to debug');
  }

  const RenderMovies = () => {
    return (
    <FlatList
      data={data}
      keyExtractor={({id}, index) => id}
      renderItem={({item}, index) => (
        <Text>
          {item.id}, {item.title}, {item.releaseYear}
        </Text>
      )}
    />
  )};

  //DISPLAY
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text
          onPress={() => setTitleText('Title pressed')}
          style={styles.title}>
          {titleText}
        </Text>
        <LoremIpsum />
        <LoremIpsum />
        <List name="one" />
        <List name="two" />
        <List name="threee" />
        <Text>{getFullName('John', 'JD', 'Doe')}</Text>
        <View style={styles.buttonContainerHorizontal}>
          <Button onPress={() => setCount(count + 1)} title="Click me" />
          <Button disabled title="too poor" />
          <Button onPress={() => setCount(0)} title="reset count" />
        </View>
        <Cat name="George" />
        <Text>You clicked {count} times</Text>
        <View>
          <TextInput
            placeholder="Type here to translate"
            onChangeText={newText => setTranslateText(newText)}
            defaultValue={translateText}
          />
          <Text>
            {translateText
              .split(' ')
              .map(word => word && 'madge')
              .join(' ')}
          </Text>
        </View>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Text>fading view!</Text>
        </Animated.View>
        <View style={styles.buttonContainerHorizontal}>
          <Button title="fade in" onPress={fadeIn}></Button>
          <Button title="fade out" onPress={fadeOut}></Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              alert('you pressed the button');
            }}
            title="press me!"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={_onPressButton} title="custom alert" />
        </View>
        <Text>metaDescription returns: {metaDescription}{"\n"}
        metaTitle returns: {metaTitle}{"\n"}
        bulk.title returns: {bulk.title}{"\n"}
        </Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          title="grab api"
          onPress={() =>
            Alert.alert(
              'API Call Requested',
              'You requested ' +
                data[0].title.toString() +
                ' from ' +
                data[0].releaseYear.toString(),
              [
                {
                  text: 'alt calls',
                  onPress: () => {
                    Alert.alert(
                      'using bulk instead of specific calls',
                      bulk.movies[0].title,
                      [],
                      {
                        cancelable: true,
                      },
                    );
                  },
                },
                {
                  text: 'Show description',
                  onPress: () => {
                    Alert.alert('Description', metaDescription, [], {
                      cancelable: true,
                    });
                  },
                },
                {
                  text: 'Show title',
                  onPress: () => {
                    Alert.alert('Title', metaTitle, [], {
                      cancelable: true,
                    });
                  },
                },
              ],
              {
                cancelable: true,
              },
            )
          }
        />
        <RenderMovies />
        <Button onPress={() => printConsole()} title="debug console"/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fadingContainer: {
    fontSize: 30,
    backgroundColor: 'red',
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: 'gray',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'pink',
  },
  buttonContainer: {
    margin: 20,
  },
  buttonContainerHorizontal: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bigText: {
    fontSize: 24,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontWeight: 'bold',
  },
});

export default App;
