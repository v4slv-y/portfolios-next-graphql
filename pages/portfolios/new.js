import withAuth from "../../hoc/withAuth";
import PortfolioForm from "../../components/forms/PortfolioForm";
import { useCreatePortfolio } from "../../apollo/actions";
import { useRouter } from "next/router";

const PortfolioNew = () => {
  const router = useRouter();
  const [createPortfolio, { error }] = useCreatePortfolio();

  const errorMessage = (error) => {
    return (
      (error.graphQlErrors && error.graphQlErrors[0].message) ||
      "ooops something went wrong!"
    );
  };
  if (error) errorMessage(error);

  const crtPrt = async (data) => {
    await createPortfolio({ variables: data });
    router.push("/portfolios");
  };

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1>Create New portfolio</h1>
            <PortfolioForm onSubmit={crtPrt} />
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(PortfolioNew, ["admin", "instructor"]);
