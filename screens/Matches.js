import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Firebase from '../config/Firebase'

var team = [
  {name: 'CS'},
  {name: 'CG'},
  {name: 'JS'},
  {name: 'FF'},
]
var user;
var teamUp;

 user= Firebase.auth().currentUser;
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

  componentDidMount(){
    user=[];
    user= Firebase.auth().currentUser;
    Firebase.database().ref('/users/'+user.uid).on("value", function(snapshot) {
        teamUp = snapshot.val();
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <SafeAreaView>
        <ScrollView style="width: 100%">        
          <View style={styles.touchables} >
            <View style={{flexDirection:"row"}}>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/cs.png')} style={{width: 80, height: 60}} /></View>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/cg.png')} style={{width: 50, height: 60}} /></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Team', {teamA: team[0].name, teamB: team[1].name, match: 'team1', round: "round1"})}><Text>Edit Team</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => (teamUp.team1!=0) ? this.props.navigation.navigate('Points', {teamA: team[0].name, teamB: team[1].name, match: 'team1', round: "round1"}) : this.props.navigation.navigate('Team', {teamA: team[0].name, teamB: team[1].name, match: 'team1', round: "round1"})}><Text>View Team</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.touchables} >
            <View style={{flexDirection:"row"}}>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/js.png')} style={{width: 70, height: 60}} /></View>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/ff.png')} style={{width: 75, height: 60}} /></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Team', {teamA: team[2].name, teamB: team[3].name, match: 'team2', round: "round1"})}><Text>Edit Team</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => (teamUp.team2!=0) ? this.props.navigation.navigate('Points', {teamA: team[2].name, teamB: team[3].name, match: 'team2', round: "round1"}) : this.props.navigation.navigate('Team', {teamA: team[2].name, teamB: team[3].name, match: 'team2', round: "round1"})}><Text>View Team</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.touchables} >
            <View style={{flexDirection:"row"}}>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/cs.png')} style={{width: 80, height: 60}} /></View>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/ff.png')} style={{width: 75, height: 60}} /></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Team', {teamA: team[0].name, teamB: team[3].name, match: 'team3', round: "round2"})}><Text>Edit Team</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => (teamUp.team3!=0) ? this.props.navigation.navigate('Points', {teamA: team[0].name, teamB: team[3].name, match: 'team3', round: "round2"}) : this.props.navigation.navigate('Team', {teamA: team[0].name, teamB: team[3].name, match: 'team3', round: "round2"})}><Text>View Team</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.touchables} >
            <View style={{flexDirection:"row"}}>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/js.png')} style={{width: 70, height: 60}} /></View>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/cg.png')} style={{width: 50, height: 60}} /></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Team', {teamA: team[2].name, teamB: team[1].name, match: 'team4', round: "round2"})}><Text>Edit Team</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => (teamUp.team4!=0) ? this.props.navigation.navigate('Points', {teamA: team[2].name, teamB: team[1].name, match: 'team4', round: "round2"}) : this.props.navigation.navigate('Team', {teamA: team[2].name, teamB: team[1].name, match: 'team4', round: "round2"})}><Text>View Team</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.touchables} >
            <View style={{flexDirection:"row"}}>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/cs.png')} style={{width: 80, height: 60}} /></View>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/js.png')} style={{width: 70, height: 60}} /></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Team', {teamA: team[0].name, teamB: team[2].name, match: 'team5', round: "round3"})}><Text>Edit Team</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => (teamUp.team5!=0) ? this.props.navigation.navigate('Points', {teamA: team[0].name, teamB: team[2].name, match: 'team5', round: "round3"}) : this.props.navigation.navigate('Team', {teamA: team[0].name, teamB: team[2].name, match: 'team5', round: "round3"})}><Text>View Team</Text></TouchableOpacity>
            </View>
          </View>
          <View style={styles.touchables} >
            <View style={{flexDirection:"row"}}>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/ff.png')} style={{width: 75, height: 60}} /></View>
              <View  style={styles.teamHalves}><Image source={require('../asset-img/cg.png')} style={{width: 50, height: 60}} /></View>
            </View>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Team', {teamA: team[3].name, teamB: team[1].name, match: 'team6', round: "round3"})}><Text>Edit Team</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => (teamUp.team6!=0) ? this.props.navigation.navigate('Points', {teamA: team[3].name, teamB: team[1].name, match: 'team6', round: "round3"}) : this.props.navigation.navigate('Team', {teamA: team[3].name, teamB: team[1].name, match: 'team6', round: "round3"})}><Text>View Team</Text></TouchableOpacity>
            </View>
          </View>

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
      height: 120,
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
