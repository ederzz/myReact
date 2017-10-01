import React,{Component} from 'react';
import CommentInput from '../components/CommentInput';
import {connect} from 'react-redux';
import {addComment} from '../reducers/comments';

class CommentInputContainer extends Component{
	
	constructor(){
		super();
		this.state ={
			username:''
		}
	}
	
	componentWillMount(){
		this._loadUsername();
	}
	
	_loadUsername(){
		const username = localStorage.getItem('username');
		if(username){
			this.setState({
				username
			});
		}
	}
	
	_saveUsername(username){
		localStorage.setItem('username',username)
	}
	
	handleSubmitComment(comment){
		if(!comment) return ;
		if(!comment.username) return alert("请输入用户名"); 
		if(!comment.commentContent) return alert("请输入评论内容");
		const {comments} = this.props;
		const newComments = [...comments,comment];
		localStorage.setItem('comments',JSON.stringify(newComments));
		if(this.props.addComment){
			this.props.addComment(comment)
		}
	}
	
	render(){
		return (
			<CommentInput 
				username={this.state.username}
				onUsernameInputBlur = {this._saveUsername.bind(this)}
				onSubmitComment = {this.handleSubmitComment.bind(this)}
				/>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		comments:state.comments
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addComment:(comment) => {
			dispatch(addComment(comment));
		}
	};
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CommentInputContainer);
