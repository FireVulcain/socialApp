import React, { Component } from "react";
import CustomButton from "../../util/CustomButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Icon
import FavIcon from "@material-ui/icons/Favorite";
import UnFavIcon from "@material-ui/icons/FavoriteBorderOutlined";

import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

class LikeButton extends Component {
    likedScream = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find((like) => like.screamId === this.props.screamId)
        ) {
            return true;
        } else {
            return false;
        }
    };
    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    };
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    };
    render() {
        const {
            user: { authenticated }
        } = this.props;

        const likeButton = !authenticated ? (
            <Link to="/login">
                <CustomButton tip="Like">
                    <UnFavIcon />
                </CustomButton>
            </Link>
        ) : this.likedScream() ? (
            <CustomButton tip="" onClick={this.unlikeScream}>
                <FavIcon color="primary" />
            </CustomButton>
        ) : (
            <CustomButton tip="" onClick={this.likeScream}>
                <UnFavIcon color="primary" />
            </CustomButton>
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(LikeButton);
