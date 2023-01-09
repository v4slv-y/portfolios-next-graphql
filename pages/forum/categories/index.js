import { useGetForumCategories } from "../../../apollo/actions";
import Link from "next/link";

const ForumCategories = () => {
  const { data } = useGetForumCategories();
  const forumCategories = (data && data.forumCategories) || [];

  return (
    <>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Categories</h1>
          </div>
        </div>
      </section>
      <section className="fj-category-list">
        <div className="row">
          {forumCategories.map((fc) => (
            <div key={fc.slug} className="col-md-4">
              <div className="fj-category-container">
                <Link
                  legacyBehavior
                  href="/forum/categories/[slug]"
                  as={`/forum/categories/${fc.slug}`}
                >
                  <a className="fj-category subtle-shadow no-border">
                    <div className="category-information">
                      <div className="heading gray-90">{fc.title}</div>
                      <div className="description">{fc.subTitle}</div>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ForumCategories;
