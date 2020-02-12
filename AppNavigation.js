import { createStackNavigator } from 'react-navigation-stack'
import Matches from '../screens/Matches'
import Team from '../screens/Team'
import Points from "../screens/Scores"
import Leaderboard from "../screens/Leaderboard"


const AppNavigation = createStackNavigator(
  {
    Matches: { screen: Matches },
    Team: { screen: Team},
    Points: { screen: Points},
    Leaderboard: { screen: Leaderboard},
  },
  {
    initialRouteName: 'Matches'
  }
)

export default AppNavigation