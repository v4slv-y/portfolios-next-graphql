import { useRouter } from "next/router";
import { useState } from "react";
import {
  useCreateTopic,
  useGetTopicsByCategory,
  useGetUser,
} from "../../../apollo/actions";
import Replier from "../../../components/shared/Replier";

const Topics = () => {
  const router = useRouter();
  const [isReplyOpen, setReplyOpen] = useState(false);
  const { slug } = router.query;
  const { data } = useGetTopicsByCategory({ variables: { category: slug } });
  const { data: dataUser } = useGetUser();
  const [createTopicMutation, { error }] = useCreateTopic();

  const topicsByCategory = (data && data.topicsByCategory) || [];
  const user = (dataUser && dataUser.user) || null;

  const createTopic = (topicData, done) => {
    topicData.forumCategory = slug;
    createTopicMutation({ variables: topicData }).then(() => {
      done();
      setReplyOpen(false);
    });
  };

  const goToTopic = (slug) =>
    router.push("/forum/topics/[slug]", `/forum/topics/${slug}`);

  return (
    <>
      <div className="container">
        <section className="section-title">
          <div className="px-2">
            <div className="pt-5 pb-4">
              <h1>Seect topic</h1>
              {user && (
                <button
                  disabled={!user}
                  onClick={() => setReplyOpen(true)}
                  className="btn btn-primary"
                >
                  Create Topic
                </button>
              )}
            </div>
          </div>
        </section>
        <section className="fj-topic-list">
          <table className="table table-hover ">
            <thead>
              <tr>
                <th scope="col">Topic</th>
                <th scope="col">Category</th>
                <th scope="col">Author</th>
              </tr>
            </thead>
            <tbody>
              {topicsByCategory.map((topic) => (
                <tr key={topic._id} onClick={() => goToTopic(topic.slug)}>
                  <th>{topic.title}</th>
                  <td className="category">{topic.forumCategory.title}</td>
                  <td>{topic.user.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <Replier
          onSubmit={createTopic}
          isOpen={isReplyOpen}
          onClose={() => setReplyOpen(false)}
        />
      </div>
    </>
  );
};

export default Topics;
