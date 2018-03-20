import echarts from './echarts.min';
import toString from '../../util/toString';

export default function renderChart(props) {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  return `
    var tsX = 0;
    var tsY = 0;
    document.addEventListener('touchstart',function(event){
      tsX = event.zrX;
      tsY = event.zrY;
      window.postMessage(JSON.stringify({eventName:'touchstart',x:tsX,y:tsY}));
    },false);
    document.addEventListener('touchmove',function(event){
      var x = event.zrX;
      var y = event.zrY;
      window.postMessage(JSON.stringify({eventName:'touchmove',x:x,y:y,dx:x-tsX,dy:y-tsY}));
    },false);
    document.getElementById('main').style.height = "${height}";
    document.getElementById('main').style.width = "${width}";
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(${toString(props.option)});
    myChart.on('click', function(params) {
      var seen = [];
      var paramsString = JSON.stringify(params, function(key, val) {
        if (val != null && typeof val == "object") {
          if (seen.indexOf(val) >= 0) {
            return;
          }
          seen.push(val);
        }
        return val;
      });
      window.postMessage(paramsString);
    });
  `
}
