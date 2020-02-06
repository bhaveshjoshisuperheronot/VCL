import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

var team = [
  {name: 'FF'},
  {name: 'CG'},
  {name: 'JS'},
  {name: 'CG'},
]

export default class Matches extends React.Component {
  static navigationOptions = {
    title: 'Matches',
    headerStyle: {
      backgroundColor: '#ff7858',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  render(){
    return (
      <View style={styles.container}>
        <SafeAreaView>
        <ScrollView style="width: 100%">        
          <TouchableOpacity style={styles.touchables} onPress={() => this.props.navigation.navigate('Team', {teamA: team[0].name, teamB: team[1].name})}>
            <View style={{flexDirection:"row"}}>
              <View  style={styles.teamHalves}><Text>{team[0].name}</Text></View>
              <View  style={styles.teamHalves}><Text>{team[1].name}</Text></View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchables} onPress={() => this.props.navigation.navigate('Team', {teamA: team[2].name, teamB: team[3].name})}>
            <View style={{flexDirection:"row"}}>
              <View  style={styles.teamHalves}><Text>{team[2].name}</Text></View>
              <View  style={styles.teamHalves}><Text>{team[3].name}</Text></View>
            </View>
          </TouchableOpacity>
        </ScrollView>
        </SafeAreaView>
        </View>
    );
  };
}

const styles = StyleSheet.create({
  teamHalves:{
    flex: 1,
    alignItems: "center"
  },
  container: {
      backgroundColor: '#fff',
      padding: 30
  },
  touchables: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
      height: 80,
      backgroundColor: "#fff",
      borderRadius: 10,
      borderWidth: 1,
      marginVertical: 10,
      shadowColor: '#888',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 1,
  }
})
