import { printLocation } from "graphql";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useGetTopicBySlug,
  useGetPostsByTopic,
  useGetUser,
  useCreatePost,
} from "../../../apollo/actions";
import PostItem from "../../../components/forum/PostItem";
import Replier from "../../../components/shared/Replier";
import AppPagination from "../../../components/shared/Pagination";

const useInitialData = (slug, pagination) => {
  const { data: topicData } = useGetTopicBySlug({ variables: { slug } });
  const { data: postData, fetchMore } = useGetPostsByTopic({
    variables: { slug, ...pagination },
    pollInterval: 15000
  });
  const { data: dataUser } = useGetUser();
  const topic = (topicData && topicData.topicBySlug) || {};
  const postDt = (postData && postData.postsByTopic) || { posts: [], count: 0 };
  const user = (dataUser && dataUser.user) || null;

  return { topic, ...postDt, user, fetchMore };
};

const PostsPage = () => {
  const router = useRouter();
  const { slug, pageNum = 1, pageSize = 5 } = router.query;
  const [pagination, setPagination] = useState({
    pageNum: parseInt(pageNum, 10),
    pageSize: parseInt(pageSize, 10),
  });
  const { topic, posts, ...rest } = useInitialData(slug, pagination);
  // debugger;
  return (
    <>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>{topic.title}</h1>
            </div>
          </div>
        </section>
        <Posts
          posts={posts}
          topic={topic}
          {...rest}
          {...pagination}
          onPageChange={(pageNum, pageSize) => {
            router.push(
              "/forum/topics/[slug]",
              `/forum/topics/${slug}?pageNum=${pageNum}&pageSize=${pageSize}`,
              { shallow: true }
            );

            setPagination({ pageNum, pageSize });
          }}
        />
      </div>
    </>
  );
};

const Posts = ({
  posts,
  topic,
  user,
  fetchMore,
  count,
  pageSize,
  pageNum,
  onPageChange,
}) => {
  const [createPost, { error }] = useCreatePost();
  const [isReplierOpen, setReplierOpen] = useState(false);
  const [reply, setReplyTo] = useState(null);
  // const { pageSize, count, pageNum } = pagination;

  const handleCreatePost = async (rpl) => {
    if (reply) {
      console.log(reply.parent);
      rpl.parent = reply.parent._id; // ERROR when reply on post
    }

    rpl.topic = topic._id;
    await createPost({ variables: rpl });
    let lastPage = Math.ceil(count / pageSize);
    if (count === 0) {
      lastPage = 1;
    }
    lastPage === pageNum &&
      (await fetchMore({
        variables: { pageSize, pageNum: lastPage },
        updateQuery: (prevResults, { fetchMoreResult }) => {
          return Object.assign({}, prevResults, {
            postsByTopic: { ...fetchMoreResult.postsByTopic },
          });
        },
      }));
    setReplierOpen(false);
  };

  return (
    <section>
      <div className="fj-post-list">
        {topic._id && pageNum === 1 && (
          <PostItem postData={topic} className="topic-post-lead" />
        )}
        {posts.map((post) => (
          <div key={post._id} className="row">
            <div className="col-md-9">
              <PostItem
                postData={post}
                canCreate={user !== null}
                onReply={(reply) => {
                  setReplyTo(reply);
                  setReplierOpen(true);
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="row mt-2 mx=0">
        <div className="col-md-9">
          <div className="posts-bottom">
            {user && (
              <div className="pt-2 pb-2">
                <button
                  onClick={() => {
                    setReplyTo(null);
                    setReplierOpen(true);
                  }}
                  className="btn btn-lg btn-outline-primary"
                >
                  Create New Post
                </button>
              </div>
            )}
            <div className="pagination-container ml-auto">
              <AppPagination
                pageNum={pageNum}
                onChange={onPageChange}
                pageSize={pageSize}
                count={count}
              />
            </div>
          </div>
        </div>
      </div>
      <Replier
        isOpen={isReplierOpen}
        hasTitle={false}
        onSubmit={handleCreatePost}
        replyTo={(reply && reply.user.username) || topic.title}
        onClose={() => setReplierOpen(false)}
        closeBtn={() => (
          <a
            onClick={() => setReplierOpen(false)}
            className="btn py-2 ttu gray-10"
          >
            Cancel
          </a>
        )}
      />
    </section>
  );
};

export default PostsPage;
