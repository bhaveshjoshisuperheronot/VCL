import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import Firebase from '../config/Firebase'

var data_listA = [];
var data_listB = [];
var data_listFinal = [];
var player_index= [];
var playerCount = 0;
var team1Count = 0;
var team2Count = 0;
var teamPrice = 100;
var playersSelected = [];
var user = Firebase.auth().currentUser;



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
    
    constructor(props) {
      super(props)
      this.state = {
        loading: false,
        data: [],
        dataA: [],
        dataB: [],
        dataFinal: [],
        touchDisable: false,
        buttonDisable: true,
        teamprice: 100,
        playersselected: 0,
        playerID: [],
       };
    }
    
    componentDidMount(){
      data_listA = []; data_listB = []; data_listFinal= []; teamPrice = 100; playersSelected = 0; team1Count = 0; team2Count = 0;
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
          //console.log(data_listFinal, data_listFinal.length); 
        });
      this.setState({ dataFinal : data_listFinal });

      data_listFinal => data_listFinal.json();
      data_listFinal = data_listFinal.map(item => {
        item.isSelect = false;
        item.selectedClass = styles.playerRow;
        return item;
      });
      this.setState({ dataFinal : data_listFinal });
    }
    selectItem = data => {
      data.item.isSelect = !data.item.isSelect;
      data.item.selectedClass = data.item.isSelect ? styles.selected : styles.playerRow;
      if(data.item.isSelect){
        player_index.push(data.item.key);
        if(data.item.team == this.props.navigation.state.params.teamA){
           team1Count++;
        }
        else{team2Count++;}
        teamPrice = teamPrice - Number(data.item.price);
        playersSelected = playersSelected + 1;
        this.setState({ teamprice : teamPrice, playersselected : playersSelected });
        if(playersSelected == 11 && teamPrice >= 0){
          if(team1Count < 8 && team2Count < 8){this.setState({ buttonDisable: false })}
          else{}
        }
        else{
          this.setState({ buttonDisable: true })
        }
      }
      else{
        teamPrice = teamPrice + Number(data.item.price);
        playersSelected = playersSelected - 1;
        if(data.item.team == this.props.navigation.state.params.teamA){
          team1Count--;
        }
        else{team2Count--;}
        const index = player_index.indexOf(data.item.key)
        if (index !== -1) {
          player_index.splice(index, 1);
          
        }
        
        this.setState({ teamprice : teamPrice, playersselected : playersSelected });  
        if(playersSelected == 11 && teamPrice >= 0){
          if(team1Count < 8 && team2Count < 8){}
          else{this.setState({ buttonDisable: false })}
        }
        else{
          this.setState({ buttonDisable: true })
        }      
      }

      const fg = this.state.dataFinal.findIndex(
        item => data.item.team === item.team
      );


      const index = this.state.dataFinal.findIndex(
        item => data.item.key === item.key
      );
    
      this.state.dataFinal[index] = data.item;
      
      this.setState({
        dataFinal: this.state.dataFinal,
        playerID: player_index,
      });
      
    };
    renderItem = data =>       
        <View>
          <TouchableOpacity 
            style={[styles.playerRow, data.item.selectedClass]}
            onPress={() => this.selectItem(data)}
            disabled={this.state.touchDisable}
          >
            
            <View><Text>{data.item.team}</Text></View>
            <View><Text>{data.item.team}</Text></View>
            <View><Text>{data.item.name}</Text></View>
            <View><Text>{data.item.price}</Text></View>
            
          </TouchableOpacity>
        </View>
    submitTeam = playerID => {
      Firebase.database().ref('/users/'+user.uid).set({"team1" : playerID})
    }
  render(){
    return (
        <View style={styles.container}>
          
          <View>
            <Text>Price Remaining: {this.state.teamprice} credits</Text>
            <Text>Players Selected : {this.state.playersselected} player(s) selected</Text>
            <Text>Players {this.props.navigation.state.params.teamA}: {team1Count} (max 7 players allowed)</Text>
            <Text>Players {this.props.navigation.state.params.teamB}: {team2Count} (max 7 players allowed)</Text>
          </View>
          <View><Button 
            title="Save Team"
            disabled={this.state.buttonDisable}
            onPress={() => this.submitTeam(this.state.playerID)}
          /></View>
          <View></View>
            <FlatList
              data={data_listFinal}
              renderItem={item => this.renderItem(item)}
              keyExtractor={item => item.key.toString()}
              extraData={this.state}
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
  },
  selected: {backgroundColor: "#3DDC84", borderColor: "#3DDC84",},
});
