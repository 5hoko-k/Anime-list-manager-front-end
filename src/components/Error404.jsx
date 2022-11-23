import { Link } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Footer from "./Footer";

function Error404() {

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <div className="mx-auto w-3/4 mt-36 h-full">
        <div className="mx-auto h-full p-5 bg-bushGreen-shades-500 border border-green-600">
          <p>Sorry Chaps, Looks like this page isnt a part of our site.</p>
          <p>
            Use these links to go to different <e>REAL</e> parts of our site
          </p>
          <ul>
            <li><Link href="/">Click here to go to the home page</Link></li>
          </ul>
          
        </div>
      </div>
      <Footer />

    </div>
          </>
  );
}

export default Error404;
