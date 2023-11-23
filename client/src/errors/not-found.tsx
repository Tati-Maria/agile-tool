// Desc: 404 Not Found page
import { Heading, Typography } from "@/components/shared";
import {
    Link,
    useNavigate
} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();


  return (
    <section>
        <div className="flex-col-center space-y-4">
            <Heading className="font-bold" level={1}>404</Heading>
            <Heading className="font-semibold" level={2}>
                Oops, the page you're looking for does not exist.
            </Heading>
            <Typography>
                You may want to head back to the homepage. If you think something is broken, report a problem.
            </Typography>
            <div>
                <button type="button" onClick={() => navigate('/')}>Go Home</button>
                <Link to="/report-problem">Report Problem</Link>
            </div>
        </div>
    </section>
  )
}

export default NotFound