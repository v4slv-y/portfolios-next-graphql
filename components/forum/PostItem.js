import { fromNow } from "../../utils/functions";

const PostItem = ({ postData, canCreate = false, onReply, className = "" }) => {
  const { parent } = postData;
  return (
    <div className={`topic-post ${className}`}>
      <article>
        <div className="row">
          <div className="topic-avatar">
            <div className="main-avatar">
              <img
                className="avatar subtle-shadow"
                src={postData.user.avatar}
              ></img>
            </div>
          </div>
          <div className="topic-body">
            <div className="topic-header">
              <div className="topic-meta">
                <div className="name-container">
                  <span className="name">{postData.user.username}</span>
                </div>
                {postData.createdAt && (
                  <div className="date-container">
                    <span className="date">{fromNow(postData.createdAt)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="topic-content">
              {parent && (
                <div className="topic-parent cooked">
                  <div className="topic-parent-inner cooked">
                    <div className="topic-parent-header">
                      <div className="topic-parent-avatar">
                        <div className="main-avatar">
                          <img
                            className="avatar subtle-shadow"
                            src={parent.user.avatar}
                          ></img>
                        </div>
                      </div>
                      <div className="username">{parent.user.username}</div>
                    </div>
                    <div className="topic-parent-content">
                      <p>{parent.content}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="cooked">
                <p>{postData.content}</p>
              </div>
              <section className="post-menu-area">
                <nav className="post-controls">
                  <div className="actions">
                    {onReply && (
                      <button
                        disabled={!canCreate}
                        onClick={() => onReply({ ...postData })}
                        className="btn"
                      >
                        reply
                      </button>
                    )}
                  </div>
                </nav>
              </section>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostItem;
