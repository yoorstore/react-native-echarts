import React, { Component } from 'react';
import { WebView, View } from 'react-native';
import { Container, Echarts } from './components'

export default class App extends Component {

  reload(option) {
    this._echarts.reload(option)
  }

  render() {
    return (
      <Container width={this.props.width}>
        <Echarts  {...this.props} ref={r=>this._echarts=r}/>
      </Container>
    );
  }
}
