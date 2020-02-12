import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import Firebase from '../config/Firebase'

var team_list = [];
var roundMain;
var user;
var matchState;

export default class Leaderboard extends React.Component{
    static navigationOptions = {
        title: 'Leaderboard',
        headerStyle: {
          backgroundColor: '#ff7858',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    };
    constructor(props) {
        super(props)
        this.state = {
          teamList : [],
        }
    }
    
    componentDidMount(){
        team_list = []; roundMain = "";
        user= Firebase.auth().currentUser;
        matchState = this.props.navigation.state.params.match;
        Firebase.database().ref('/users/').orderByChild('name').on("value", function(snapshot) {
            snapshot.forEach(function(data) {            
                team_list.push( data.val() );
            });
        });
        roundMain = this.props.navigation.state.params.round;
        if(roundMain == 'round1'){console.log(team_list.email);}
        
    }

    render(){
        return (
        <View style={styles.container}>
            <View><Text>Match: {this.props.navigation.state.params.match} Round: {this.props.navigation.state.params.round}  Total: {this.props.navigation.state.params.total}</Text></View>        
            {/* <FlatList
              data={player_list}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.key.toString()}
            /> */}
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