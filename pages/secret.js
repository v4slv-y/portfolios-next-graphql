import withAuth from "../hoc/withAuth";

const Secret = withAuth(() => {
  return (
    <BaseLayout>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="page-title">Secret</h1>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}, ["instructor"]);

export default Secret;
