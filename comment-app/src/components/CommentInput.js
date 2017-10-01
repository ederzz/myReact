import React,{Component} from 'react';

export default class CommentInput extends Component{
	static defaultProps = {
		username:''
	}
	
	constructor(props){
		super(props);
		this.state={
			username:props.username,
			commentContent:''
		};
	}
	
	componentDidMount(){
		this.textarea.focus();
	}
	
	storeUsername(e){
		if(this.props.onUsernameInputBlur){
			this.props.onUsernameInputBlur(e.target.value)
		}
	}
	
	
	handleSubmit(){
		if(this.props.onSubmitComment){
			const {username,commentContent} = this.state;
			let createTime = +new Date();
			this.props.onSubmitComment({username,commentContent,createTime});
		}
		this.setState({
			commentContent:''
		});
	}
	
	usernameChange(e){
		this.setState({
			username:e.target.value
		});
	}
	
	contentChange(e){
		this.setState({
			commentContent:e.target.value
		});
	}
	
	
	render(){
		return (
			<div className="comment-input">
				<div className="input-field">
					<span className="input-field-name">用户名 :</span>
					<div className="input-field-text">
						<input value={this.state.username} 
							onBlur={this.storeUsername.bind(this)}
							onChange={this.usernameChange.bind(this)}
							/>
					</div>
				</div>
				<div className="input-field">
					<span className="input-field-name">评论内容 :</span>
					<div className="input-field-text">
						<textarea value={this.state.commentContent}
							ref = {(area) => {this.textarea = area}}
							onChange={this.contentChange.bind(this)}
							/>
					</div>
				</div>
				<div className="input-btn">
					<button onClick={this.handleSubmit.bind(this)}>发布</button>
				</div>
			</div>
		);
	}
}
