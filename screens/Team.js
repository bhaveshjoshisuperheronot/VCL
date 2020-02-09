import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Constants from 'expo-constants';
import Firebase from '../config/Firebase'

var data_listA = [];
var data_listB = [];
var data_listFinal = [];

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

function Item({ id, name, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
      ]}
    >
      <Text style={styles.title}>{name}</Text>
    </TouchableOpacity>
  );
}

export default function Team() {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  data_listA = []; data_listB = []; data_listFinal= [];
        console.log(newFunction());
        Firebase.database().ref('/players/').orderByChild('team').equalTo('FF').on("value", function(snapshot) {
          snapshot.forEach(function(data) {            
            data_listFinal.push( data.val() );
          });
          //data_listFinal.push( data_listA );
          //console.log(data_listA, data_listA.length); 
        });
        Firebase.database().ref('/players/').orderByChild('team').equalTo('CG').on("value", function(snapshot) {
          snapshot.forEach(function(data) {            
            data_listFinal.push( data.val() );
          });
          //data_listFinal.push( data_listB );
          //console.log(data_listFinal, data_listFinal.length);
        });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data_listFinal}
        renderItem={({ item }) => (
          <Item
            id={item.key}
            name={item.name}
            selected={!!selected.get(item.key)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.key}
        extraData={selected}
      />
    </SafeAreaView>
  );

  function newFunction() {
    return () => this.props.navigation.state.params.teamA;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
