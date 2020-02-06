import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Firebase from '../config/Firebase'

var data_listA = [];
var data_listB = [];
var data_listFinal = [];

function onPressHandler( id ){
  Alert.alert(id);
}

function Item({ name, price, team, id }) {
  return (
    <View>
      <TouchableOpacity style={styles.playerRow} onPress={() => onPressHandler(id)}>
        <View><Text>{team}</Text></View>
        <View><Text>{name}</Text></View>
        <View><Text>{price}</Text></View>
      </TouchableOpacity>
    </View>
  );
}

export default class Team extends React.Component {
    static navigationOptions = {
        title: 'Team',
        headerStyle: {
          backgroundColor: '#ff7858',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    };
    state = {
      data: [],
      dataA: [],
      dataB: [],
      dataFinal: [],
    };
    
    componentDidMount(){
      data_listA = []; data_listB = []; data_listFinal= [];
        Firebase.database().ref('/players/').orderByChild('team').equalTo(this.props.navigation.state.params.teamA).on("value", function(snapshot) {
          snapshot.forEach(function(data) {            
            data_listFinal.push( data.val() );
          });
          //data_listFinal.push( data_listA );
          //console.log(data_listA, data_listA.length); 
        });
        Firebase.database().ref('/players/').orderByChild('team').equalTo(this.props.navigation.state.params.teamB).on("value", function(snapshot) {
          snapshot.forEach(function(data) {            
            data_listFinal.push( data.val() );
          });
          //data_listFinal.push( data_listB );
          console.log(data_listFinal, data_listFinal.length); 
        });
      this.setState({ dataFinal : data_listFinal });  
    }
  render(){
    return (
        <View style={styles.container}>
          <View></View>
            <FlatList
              data={data_listFinal}
              renderItem={({ item }) => <Item name={item.name} price={item.price} team={item.team} id={item.key}/>}
              keyExtractor={item => item.key}
            />
      </View>
      
    );
  };
}
const styles = StyleSheet.create({
    maincontainer: {
    backgroundColor: '#fff',
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    height: 60,
    justifyContent: "center",
    marginBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 10
  },
  playerRow: {
    backgroundColor: '#fff',
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    marginBottom: 10,
    flexDirection:"row",
    shadowColor: '#888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  }
});
