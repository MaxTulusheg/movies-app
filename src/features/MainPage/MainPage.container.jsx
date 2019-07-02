import gql from 'apollo-boost';
import { graphql } from 'react-apollo';

import MainPage from './MainPage.component';

const gqtSomth = gql`
  {
    smth {
      lel
      lol
      kek
    }
  }
`;

export default graphql(gqtSomth)(MainPage);
