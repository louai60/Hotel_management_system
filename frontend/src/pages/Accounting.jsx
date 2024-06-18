import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_BASE_URL from "../Config/ApiConfig";

const Accounting = () => {
    const [periodCovered, satPeriodCovered] = useState("");
    const [reportAuthor, satReportAuthor] = useState("");
    const [totalExpenses, satTotalExpenses] = useState("");
    const [errors, setErrors] = useState([]);

    const nav = useNavigate();

    const SubmitHandle = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8080/api/accountings", {
                periodCovered: periodCovered,
                reportAuthor: reportAuthor,
                totalExpenses: totalExpenses,
            })
            .then((res) => {
                console.log("✅✅✅✅✅✅", res);
                nav("/");
            })
            .catch((err) => {
                // console.log(err);
                const errorRes = err.response.data.errors;
                const errArray = [];
                for (const key of Object.keys(errorRes)) {
                    errArray.push(errorRes[key].message);
                }
                setErrors(errArray);
                console.log(setErrors);
            });
    };
    return (
        <form>
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                            First name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>





        </form>


    );






















};