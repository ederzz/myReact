import React,{Component} from 'react';

export default class Comment extends Component{
	
	constructor(){
		super();
		this.state = {
			releaseTime:''
		};
	}

	componentWillMount(){
		this._getReleaseTime();
		this.timer = setInterval(
			this._getReleaseTime.bind(this)
		,5000);
	}
	
	
	
	componentWillUnmount(){
		clearInterval(this.timer);
	}
	
	handleDeleteComment(){
		if(this.props.onDeleteComment){
			this.props.onDeleteComment(this.props.index);
			console.log(`comment ${this.props.index}`);
		}
	}
	
	_getReleaseTime(){
		let now = +new Date();
		let releaseTime = Math.round((now - this.props.comment.createTime) / 1000);
		(releaseTime > 60) ? this.setState({
			releaseTime:`${Math.floor(releaseTime/60)}分钟前`
		}) : this.setState({
			releaseTime:`${Math.max(releaseTime,1)}秒前`
		});
	}
	
	 _getProcessedContent (content) {
	    return content
	      .replace(/&/g, "&amp;")
	      .replace(/</g, "&lt;")
	      .replace(/>/g, "&gt;")
	      .replace(/"/g, "&quot;")
	      .replace(/'/g, "&#039;")
	      .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
	  }
	
	//使用dangerouslySetInnerHTML是为了把替换``的code标签插入html中，但是又不能让code里面的html等标签产生效果，就需要把尖括号等符号转义
	render(){
		return (
			<div className="comment">
				<div>
					<div className="comment-user">
						<span>{this.props.comment.username}  </span>:   
						
					</div>
					<p dangerouslySetInnerHTML={{
											  __html: this._getProcessedContent(this.props.comment.commentContent)
											}} />
				</div>
				<div className="r-time">{this.state.releaseTime}</div>
				<span className="delete-btn"
					onClick={this.handleDeleteComment.bind(this)}>删除</span>
			</div>
		);
	}
}
