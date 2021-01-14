package com.scaiconsulting.scaichat.servicesImplemetations;

import com.scaiconsulting.scaichat.DAOs.FriendShipDAO;
import com.scaiconsulting.scaichat.DAOs.PostDAO;
import com.scaiconsulting.scaichat.configurations.IdExtractor;
import com.scaiconsulting.scaichat.entities.FriendShip;
import com.scaiconsulting.scaichat.entities.Post;
import com.scaiconsulting.scaichat.entities.PostComment;
import com.scaiconsulting.scaichat.entities.PostLike;
import com.scaiconsulting.scaichat.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Service
public class PostServiceImplementation implements PostService {

    private final PostDAO postDAO;
    private final FriendShipDAO friendShipDAO;

    @Autowired
    public PostServiceImplementation(PostDAO postDAO, FriendShipDAO friendShipDAO) {
        this.postDAO = postDAO;
        this.friendShipDAO = friendShipDAO;
    }

    @Override
    @Transactional
    public Post createPost(Post post) {
        return postDAO.createPost(post);
    }

    @Override
    @Transactional
    public List<Post> getPosts(int profileId) {
        return postDAO.getPosts(profileId);
    }

    @Override
    @Transactional
    public Post getPost(int postId) {
        return postDAO.getPost(postId);
    }

    @Override
    @Transactional
    public Post updatePost(Post post) {
        return postDAO.updatePost(post);
    }

    @Override
    @Transactional
    public void deletePost(int postId) {
        postDAO.deletePost(postId);
    }

    @Override
    @Transactional
    public PostComment commentOnPost(PostComment comment) {
        return postDAO.commentOnPost(comment);
    }

    @Override
    @Transactional
    public List<PostComment> getPostComments(int postId) {
        return postDAO.getPostComments(postId);
    }

    @Override
    @Transactional
    public Set<PostLike> likePost(String token, int postId) {
        return postDAO.likePost(new IdExtractor(token).getAuthenticatedUserId(), postId);
    }

    @Override
    @Transactional
    public Set<PostLike> unlikePost(String token, int postId) {
        return postDAO.unlike(new IdExtractor(token).getAuthenticatedUserId(), postId);
    }

    @Override
    @Transactional
    public List<Post> getFriendsPosts(String token) {
        int myId = new IdExtractor(token).getAuthenticatedUserId();
        ArrayList<Integer> myFriendsId = new ArrayList<>();
        List<FriendShip> myFriends = this.friendShipDAO.getFriendShipShipList(myId);
        if (myFriends.size() > 0) {
            for (FriendShip myFriend : myFriends) {
                if (myFriend.getFirstUserId() == myId) {
                    myFriendsId.add(myFriend.getSecondUserId());
                } else {
                    myFriendsId.add(myFriend.getFirstUserId());
                }
            }
            return this.postDAO.getFriendsPosts(myFriendsId, myId);
        } else return null;
    }

    @Override
    @Transactional
    public List<Post> getProfilePosts(int friendId) {
        return this.postDAO.getPosts(friendId) ;
    }



}

