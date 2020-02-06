import { createStackNavigator } from 'react-navigation-stack'
import Matches from '../screens/Matches'
import Team from '../screens/Team'

const AppNavigation = createStackNavigator(
  {
    Matches: { screen: Matches },
    Team: { screen: Team}
  },
  {
    initialRouteName: 'Matches'
  }
)

export default AppNavigation
