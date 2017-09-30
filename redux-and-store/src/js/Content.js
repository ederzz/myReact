import React,{Component} from 'react';
import ThemeSwitch from './ThemeSwitch';
import PropsTypes from 'prop-types';
import connect from './react-redux';

class Content extends Component{
	static contextTypes = {
		store : PropsTypes.object
	}
	
	render(){
		return (
			<div>
				<p style = {{ color : this.props.themeColor }}>React.js 小书内容</p>
				<ThemeSwitch />
			</div>
		);
	}
}
const mapStateToProps = (state,props) => {
	return {
		themeColor:state.themeColor
	}
}
export default connect(mapStateToProps)(Content);
