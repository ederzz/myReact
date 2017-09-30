import React,{Component} from 'react';
import PropTypes from 'prop-types';
import connect from './react-redux';

class Header extends Component {
  static contextTypes = {
    themeColor: PropTypes.string
  }

  render () {
    return (
      <h1 style={{ color: this.props.themeColor }}>JZX。。。</h1>
    )
  }
}
const mapStateToProps = (state,props) => {
	return {
		themeColor:state.themeColor
	};
}
export default connect(mapStateToProps)(Header);
