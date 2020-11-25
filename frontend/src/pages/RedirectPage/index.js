import React from 'react'
import Header from '../../components/Header'
import { Container, Spinner} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Loading, StatsContainer } from './style'

import Shortener from '../../services/shortnerService'

class RedirectPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      url: '',
      errorMessage: ''
    }
  }

  async componentDidMount() {
    const { code } = this.props.match.params

    try{
      const service = new Shortener()
      const { url } = await service.getLink(code)

      window.location = url
    }catch(error){
      this.setState({ isLoading: false, errorMessage: 'Ops, a url solicitada não existe'})
    }
  }

  render(){
    const { errorMessage } = this.state
    return (
      <Container>
          {errorMessage ? (
              <>
              <Header>Ser novo encurtador de URL. :</Header>
              <StatsContainer className="text-center">
              <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
              <p className="m-3">{errorMessage}</p>
              <a className="btn btn-primary" href="/">Encurtar uma nova url</a>
              </StatsContainer>
              </>
            ): (
              <>
                <Header>Redirecionando...</Header>
                <Loading>
                  <Spinner color="success" animation="grow" style={{height: '5rem', width: '5rem'}}/>
                </Loading>
              </>
            )
          }
      </Container> 
    )
  }
}

export default RedirectPage