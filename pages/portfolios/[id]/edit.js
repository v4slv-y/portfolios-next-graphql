import withAuth from "../../../hoc/withAuth";
import PortfolioForm from "../../../components/forms/PortfolioForm";
import { useGetPortfolio, useUpdatePortfolio } from "../../../apollo/actions";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const PortfolioEdit = () => {
  const router = useRouter();
  const { id } = router.query;
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const { data } = useGetPortfolio({ variables: { id } });

  const errorMessage = (error) =>
    (error.graphQLErrors && error.graphQLErrors[0].message) ||
    "OOps something went wrong in [id]/edit";

  const handlePortfolioUpdate = async (data) => {
    await updatePortfolio({ variables: { id, ...data } }); // (id: $id, input(...data))
    toast.success("Portfolio has been updated!", { autoClose: 2000 });
  };

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1>Edit portfolio</h1>
            {data && (
              <PortfolioForm
                initialData={data.portfolio}
                onSubmit={handlePortfolioUpdate}
              />
            )}
            {error && (
              <div className="alert alert-danger">{errorMessage(error)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(PortfolioEdit, ["admin", "instructor"]);
