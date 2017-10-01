import React,{Component} from 'react';
import Comment from './Comment';

export default class CommentList extends Component{
	
	static defaultProps = {
		comments:[]
	}
	
	handleDeleteComment(index){
		if(this.props.onDeleteComment){
			this.props.onDeleteComment(index);
		}
	}
	
	render(){
		return (
			<div className="comment-list">
				{
					this.props.comments.map(
						(comment,i) => <Comment key={i} index={i} comment={comment} 
													onDeleteComment={this.handleDeleteComment.bind(this)}/>
					)
				}
			</div>
		);
	}
}
