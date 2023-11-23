// Desc: 404 Not Found page
import { Heading, Typography } from "@/components/shared";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    Link,
    useNavigate
} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();


  return (
    <section className="h-screen flex items-center justify-center">
        <div className="flex-col-center items-center space-y-2">
            <Heading className="font-bold text-5xl lg:text-8xl" level={1}>404</Heading>
            <Heading className="font-semibold" level={2}>
                Oops, the page you're looking for does not exist.
            </Heading>
            <Typography>
                You may want to head back to the homepage. If you think something is broken, report a problem.
            </Typography>
            <div className="flex-center space-x-4 text-sm">
                <Button variant={"brand"} className="rounded-full"  type="button" onClick={() => navigate('/')}>Go Home</Button>
                <Link className={cn(buttonVariants({variant: "outline"}), "rounded-full")} to="/report-problem">Report Problem</Link>
            </div>
        </div>
    </section>
  )
}

export default NotFound