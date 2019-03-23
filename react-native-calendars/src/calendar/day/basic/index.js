import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import {shouldUpdate} from '../../../component-updater';
import styleConstructor from './style';
import invert from 'invert-color';

class Day extends Component {
  static propTypes = {
    // TODO: disabled props should be removed
    state: PropTypes.oneOf(['disabled', 'today', '']),

    // Specify theme properties to override specific styles for calendar parts. Default = {}
    theme: PropTypes.object,
    marking: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    date: PropTypes.object
  };

  constructor(props) {    
    super(props);
    this.style = styleConstructor(props.theme);
    this.onDayPress = this.onDayPress.bind(this);
    this.onDayLongPress = this.onDayLongPress.bind(this);
  }

  onDayPress() {
    this.props.onPress(this.props.date);
  }
  onDayLongPress() {
    this.props.onLongPress(this.props.date);
  }

  shouldComponentUpdate(nextProps) {
    if(!nextProps.height)    
    return shouldUpdate(this.props, nextProps, ['state', 'children', 'marking', 'onPress', 'onLongPress']);
    return true;
  }

  render() {
    const containerStyle = [this.style.base];
    const textStyle = [this.style.text];
    const dotStyle = [this.style.dot];
    //const dayTextSelectedStyle = [];

    let marking = this.props.marking || {};
    if (marking && marking.constructor === Array && marking.length) {
      marking = {
        marking: true
      };
    }
    let quantityVal = this.props.quantity;
    let qtyColor = this.props.color;
    let quantity;
    const isDisabled = typeof marking.disabled !== 'undefined' ? marking.disabled : this.props.state === 'disabled';
    let dot;
    if (marking.marked) {
      dotStyle.push(this.style.visibleDot);
      if (marking.dotColor) {
        dotStyle.push({backgroundColor: marking.dotColor});
      }
      dot = (<View style={dotStyle}/>);
    }

    if (marking.selected) {
      //containerStyle.push(this.style.selected);
      textStyle.push(this.style.selected);
      if (marking.selectedColor) {
        containerStyle.push({backgroundColor: marking.selectedColor});
      }
      dotStyle.push(this.style.selectedDot);
      textStyle.push(this.style.selectedText);
    } else if (isDisabled) {
      textStyle.push(this.style.disabledText);
    } else if (this.props.state === 'today') {
      containerStyle.push(this.style.today);
      textStyle.push(this.style.todayText);
    }
    if(quantityVal){
      let bgColorObj = this.props.color;
      let invertedColor = invert(bgColorObj, true);
      quantity = (
      <View style={[this.style.quantityView, {backgroundColor:`rgb(${bgColorObj.r},${bgColorObj.g},${bgColorObj.b})`}]}><Text style={[this.style.quantityText, {color:invertedColor}]}>
      {String(quantityVal)}
      </Text>
      </View>
      );
    }
    return (
      <TouchableOpacity
        style={[containerStyle, {height:this.props.height, borderLeftWidth: (this.props.index % 7 !== 0) ? 1 : 0}]}
        /*style={[containerStyle, {borderLeftWidth: (this.props.index % 7 !== 0) ? 1 : 0}]}*/
        onPress={this.onDayPress}
        onLongPress={this.onDayLongPress}
        activeOpacity={marking.activeOpacity}
        disabled={marking.disableTouchEvent}
      >
        <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
        {quantity}
        {dot}
      </TouchableOpacity>
    );
  }
}

export default Day;
