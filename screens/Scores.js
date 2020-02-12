import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import Firebase from '../config/Firebase'

var team_list = [];
var user;
var player_list = [];
var round ;
var teamTotal = 0;
var matchState;
var totalScore = [];


export default class Points extends React.Component{
  
  static navigationOptions = {
    title: 'Score',
    headerStyle: {
      backgroundColor: '#ff7858',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  constructor(props) {
    super(props)
    this.state = {
      teamList : [],
      playerList : [],
      teamtotal : [],
    }
  }
  
  componentDidMount(){
    team_list = []; player_list = []; teamTotal = 0; matchState = "";
    user= Firebase.auth().currentUser;
    matchState = this.props.navigation.state.params.match;
    Firebase.database().ref('/users/'+user.uid+'/'+this.props.navigation.state.params.match+'/team').on("value", function(snapshot) {
      snapshot.forEach(function(data) {            
        team_list.push( data.val() );
      });
    });
    
    this.setState({ teamList : team_list }); 
    for(var count = 0; count < team_list.length; count++){
      Firebase.database().ref('/players/').orderByChild('key').equalTo(team_list[count]).on("value", function(snapshot) { 
        snapshot.forEach(function(datacheck) {    
          player_list.push( datacheck.val() );
          if(matchState == "team1" || matchState == "team2"){teamTotal = teamTotal + Number(datacheck.val().round1)}          
          else if(matchState == "team3" || matchState == "team4"){teamTotal = teamTotal + Number(datacheck.val().round2)}  
          else if(matchState == "team5" || matchState == "team6"){teamTotal = teamTotal + Number(datacheck.val().round3)}
          else{teamTotal = teamTotal + Number(datacheck.val().roundfinal)}  
        });
      });   

      this.setState({ playerList : player_list, teamtotal : teamTotal }); 
      Firebase.database().ref('/users/'+user.uid+'/'+this.props.navigation.state.params.round).set({total: teamTotal})   
    }
  }
  renderItem = data =>       
        <View>
          <View>            
            <View><Text>{data.item.name}</Text></View>         
            <View><Text>{this.props.navigation.state.params.match == "team1" || this.props.navigation.state.params.match == "team2"? data.item.round1 : this.props.navigation.state.params.match == "team3" || this.props.navigation.state.params.match == "team4"? data.item.round2: this.props.navigation.state.params.match == "team5" || this.props.navigation.state.params.match == "team6"? data.item.round3: data.item.finals}</Text></View>   
          </View>
        </View>
  _onpresshandler = () => {
    this.props.navigation.navigate('Leaderboard', {match: this.props.navigation.state.params.match, round: this.props.navigation.state.params.round, total: teamTotal});
  }
  render(){
    return (
      <View style={styles.container}>
        <View><Text>Total: {this.state.teamtotal}</Text></View>
        <TouchableOpacity 
          onPress={() => this._onpresshandler()}>
            <Text>View Leaderboard</Text>
          </TouchableOpacity>
            <FlatList
              data={player_list}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.key.toString()}
            />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 10
  },
})