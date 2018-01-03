import React,{Component} from 'react';
import {BackAndroid,BackHandler, ToastAndroid,Text} from 'react-native';
import Toast from 'react-native-root-toast';

export default class ExitOnDoubleBack extends Component{
    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', this._handleBackPress);
      }
    timer = {
        ref: null,
        isTimerRunning: false
      }
      
      componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress);
        clearTimeout(this.timer.ref);
        this.timer = {
          ref: null,
          isTimerRunning: false
        };
      }
      _handleBackPress = () => {
        if (!this.timer.isTimerRunning) {
            this.timer.isTimerRunning = true;
            const backInterval = 3000;
            clearTimeout(this.timer.ref);
            this.timer.ref = setTimeout(() => this.timer.isTimerRunning = false, backInterval);
            let toast = Toast.show((<Text style={{fontSize: 10}}>press double clicked</Text>), {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
                
            });
            setTimeout(function () {
                Toast.hide(toast);
            }, 2000);
            return true; // don't do anything
          }
          BackHandler.exitApp();
          return true
      }
      render(){
          return null
      }
}
