import { Link } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Footer from "../components/Footer";
import { useRouteError } from "react-router-dom";

function Error404() {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="mx-auto w-3/4 mt-36 h-full">
          <div className="mx-auto h-full p-5 bg-bushGreen-shades-500 border border-green-600">
            <p>Sorry Chaps, Looks like this page isnt a part of our site.</p>
            <p>
              Use these links to go to different <em>REAL</em> parts of our site
            </p>
            <ul className="p-2">
              <li>
                <Link href="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Error404;
