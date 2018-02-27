import React, { Component } from 'react';
import { WebView, View, StyleSheet,Platform} from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

export default class App extends Component {
  componentWillReceiveProps(nextProps) {
//     if(nextProps.option !== this.props.option) {
//       this.refs.chart.reload();
//     }
    if (JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.refs.chart.reload();
    }
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
          }}
          source={source}
        />
      </View>
    );
  }
}
