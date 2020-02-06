import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Firebase from '../config/Firebase'



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
        data: []
    };
    
    componentDidMount(){
        Firebase.database().ref('/players/'+this.props.navigation.state.params.teamA).on('value', (data) =>{
            data = JSON.stringify(data)
            console.log(data)
        })
        
    }
  render(){
    return (
        <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Dan'},
            {key: 'Dominic'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
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
    backgroundColor: '#fff',
    padding: 15
  }
});
