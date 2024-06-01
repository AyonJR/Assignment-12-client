import { useEffect, useState } from "react";


const Register = () => {
    
    const [districtData , setDistrictData] = useState([])

    useEffect( ()=> {
        fetch('District.json')
        .then(res => res.json())
        .then(data => setDistrictData(data))
    } ,[])
    console.log(districtData)

    return (
        <div>

<section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md ">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2>

            <form>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                        <label className="" htmlFor="username">Username</label>
                        <input id="username" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md   dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="" htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" type="email" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className=""  htmlFor="username">Avatar</label>
                        <input id="username" name="avatar" type="text" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md   dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
             
              <div className="">
                <label  className="">Blood Group</label>
                <select
                    id="bloodGroup"
                    name="bloodGroup"
                   
                    className="block w-full mt-2 px-4 p-2  border border-gray-200 rounded-md   dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select>
            </div>

            <div className="">
                <label  className="">District</label>
                <select
                    id="bloodGroup"
                    name="bloodGroup"
                   
                    className="block w-full mt-2 px-4 p-2  border border-gray-200 rounded-md   dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-400 focus:border-blue-400"
                > 
                {
                    districtData.map(district =>   <option key={district.id} value={district.name}>{district.name}</option>)
                }

                   
                </select>
            </div>


                    <div>
                        <label className="" htmlFor="password">Password</label>
                        <input id="password" type="password" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>

                    <div>
                        <label className="" htmlFor="passwordConfirmation">Password Confirmation</label>
                        <input id="passwordConfirmation" type="password" className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                </div>

                <div className="flex  justify-center mt-6">
                    <button type="submit" className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform 0 rounded-md bg-blue-400 font-semibold hover:bg-blue-600 ">Save</button>
                </div>
            </form>
        </section>
            
        </div>
    );
};

export default Register;