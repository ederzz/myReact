import React,{Component} from 'react';
import PropTypes from 'prop-types';
import connect from './react-redux';

class ThemeSwitch extends Component{
	static contextTypes = {
		themeColor : PropTypes.string,
		onSwitchColor: PropTypes.func
	}
	
	handleChangeTheme(color){
		if(this.props.onSwitchColor){
			this.props.onSwitchColor(color);
		}
	}
	
	render(){
		return (
			<div>
				<button style={{ color:this.props.themeColor }}
					onClick={this.handleChangeTheme.bind(this,'red')}>Red</button>
				<button style={{ color:this.props.themeColor }}
					onClick={this.handleChangeTheme.bind(this,'blue')}>Blue</button>
			</div>
		);
	}
}


const mapStateToProps = (state,props) => {
	return {
		themeColor:state.themeColor
	};
}

const mapDispatchToProps = (dispatch,props) => {
	return {
		onSwitchColor : (color) => {
			dispatch({type:'CHANGE_COLOR',themeColor:color})
		}
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(ThemeSwitch);
