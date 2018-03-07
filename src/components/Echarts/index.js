import React, { Component } from 'react';
import { WebView, View, StyleSheet, Platform } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';
import toString from '../../util/toString';

export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
        this.refs.chart.reload();
    }
  }

  reload(option) {
     this.refs.chart.injectJavaScript(`myChart.setOption(${toString(option)})`);
  }

  render() {
    let source;
    if (__DEV__) {
      source = require('./tpl.html');
    } else {
      source = Platform.OS === 'ios' ? require('./tpl.html') : { uri: 'file:///android_asset/tpl.html' };
    }
    
    return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          scalesPageToFit={Platform.OS === 'android'}          
          source={source}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
