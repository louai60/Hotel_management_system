import React from "react";
import { Typography, Button } from "@material-tailwind/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export function Unauthorized() {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <Typography
          variant="h1"
          color="blue-gray"
          className="mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Unauthorized Access <br /> Error 403
        </Typography>
        <Typography className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          You don&apos;t have permission to access this page.
        </Typography>
        <Link to="/">
          <Button color="gray" className="w-full px-4 md:w-[8rem]">
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
