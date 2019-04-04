import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";
import Avatar from "react-avatar";
import moment from "moment";

/*
  Description
*/
class MPComment extends Component {
  render() {
    const { comment } = this.props;

    return (
      <Comment>
        <Comment.Avatar as={Avatar} name={comment.User.name} size={35} />
        <Comment.Content>
          <Comment.Author as="a">{comment.User.name}</Comment.Author>
          <Comment.Metadata>
            <div>{moment(comment.createdAt).calendar()}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.message}</Comment.Text>
        </Comment.Content>
      </Comment>
    );
  }
}

MPComment.propTypes = {
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = () => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MPComment);
