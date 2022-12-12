import withAuth from "../../../hoc/withAuth";
import { useRouter } from "next/router";
import { Card, Button } from "react-bootstrap";
import {
  useGetUserPortfolios,
  useDeletePortfolio,
} from "../../../apollo/actions";
import Link from "next/link";
import { formatDate } from "../../../utils/functions";

const InstructorDashboard = () => {
  const router = useRouter();
  const [deletePtrf] = useDeletePortfolio();
  const { data } = useGetUserPortfolios();
  const userPrt = (data && data.userPortfolios) || [];
  console.log(userPrt);

  return (
    <>
      <div className="bwm-form mt-5">
        <div className="row">
          <div className="col-md-12 ">
            <h1>Instructor Dashboard.</h1>
            {userPrt.map((p) => (
              <Card key={p._id} className="mb-2">
                <Card.Header>{p.jobTitle}</Card.Header>
                <Card.Body>
                  <Card.Title>{p.title}</Card.Title>
                  <Card.Text>
                    {formatDate(p.startDate)} -{" "}
                    {(p.endDate && formatDate(p.endDate)) || "Present day."}
                  </Card.Text>
                  <Link
                    legacyBehavior
                    href={"/portfolios/[id]/edit"}
                    as={`/portfolios/${p._id}/edit`}
                  >
                    <a className="btn btn-warning mr-3">Update</a>
                  </Link>
                  <Button
                    onClick={() => deletePtrf({ variables: { id: p._id } })}
                    variant="danger"
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default withAuth(InstructorDashboard, ["admin", "instructor"]);
