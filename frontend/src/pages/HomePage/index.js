import React from 'react'
import Header from '../../components/Header'
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap'
import { ContentContainer, Form} from './style'
import ShortnerService from '../../services/shortnerService'

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      url: '',
      code: '',
      errorMessage: ''
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    const { url } = this.state

    this.setState({ isLoading: true, errorMessage: '' })

    if(!url){
      this.setState({ isLoading: false, errorMessage: 'informe uma url para encurtart.'})
    }else{
      try{
        const service = new ShortnerService()
        const result = await service.generate({ url })

        this.setState({ isLoading: false, code: result.code})
      }catch(error){
        this.setState({ isLoading: false, errorMessage: 'Ops, ocorreu um erro ao encurtar a url.'})
      }
    }
  }

  copyToClipboard = () => {
    const element = this.inputURL
    element.select()
    document.execCommand('copy')
  }

  render(){
    const { isLoading, errorMessage, code} = this.state
    return (
      <Container>
        <Header>Seu novo encurtador de URL. :</Header>
        <ContentContainer>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Digite a url para encurtar"
                defaultValue=""
                onChange={e => this.setState({ url: e.target.value })}
              />
              <InputGroup.Append>
              <Button variant="primary" type="submit">Encuntar</Button>
              </InputGroup.Append>
            </InputGroup>

            {isLoading ? (
                <Spinner animation="border" />
              ): (
                code && (
                  <>
                    <InputGroup>
                      <FormControl
                        autoFocus={true}
                        defaultValue={process.env.REACT_APP_HOST + '/' + code}
                        ref={(input) => this.inputURL = input}
                      />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={() => this.copyToClipboard()}>Copiar</Button>
                    </InputGroup.Append>
                    </InputGroup>
                    <p>Para acompanhar as estastíticas, acesse {process.env.REACT_APP_HOST + '/' + code + '/stats'}</p>
                  </>
                )
              )}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </Form>
        </ContentContainer>
        {/* <ContentContainer>
          <AdsBlock>
            AdSense
          </AdsBlock>
        </ContentContainer> */}
        </Container>
    )
  }
}

export default HomePage