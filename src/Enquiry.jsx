import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ToastContainer, toast } from "react-toastify";
const Enquiry = () => {
  let [enquiryData, setEnquiryData] = useState([]);
  let [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // let formData = {
    //     name : e.target.name.value,
    //     email : e.target.email.value,
    //     phone : e.target.phone.value,
    //     message : e.target.message.value
    // }

    if (formData._id) {
      axios
        .put(
          `http://localhost:8000/api/website/userenquiry/update-enquiry/${formData._id}`,
          formData,
        )
        .then((res) => {
          console.log(res.data);
          toast.success("Enquiry Updated Successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getEnquiryData();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to update enquiry. Please try again.");
        });
    } else {
      axios
        .post(`http://localhost:8000/api/website/userenquiry/insert`, formData)
        .then((res) => {
          console.log(res.data);
          toast.success("Enquiry Submitted Successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getEnquiryData();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to submit enquiry. Please try again.");
        });
    }
  };

  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  let getEnquiryData = () => {
    axios
      .get(`http://localhost:8000/api/website/userenquiry/view`)
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status === "success") {
          setEnquiryData(finalData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let deleteRow = (enqId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `http://localhost:8000/api/website/userenquiry/delete/${enqId}`,
          )
          .then((res) => {
            console.log(res.data);
            getEnquiryData();
          })
          .catch((err) => {
            console.log(err);
          });
        Swal.fire({
          title: "Deleted!",
          text: "Your enquiry has been deleted.",
          icon: "success",
        });
      }
    });
  };

  let editRow = (enqId) => {
    axios
      .get(`http://localhost:8000/api/website/userenquiry/update/${enqId}`)
      .then((res) => {
        let data = res.data.data;
        setFormData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getEnquiryData();
  }, []);
  return (
    <div>
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-blue-500">
        User Enquiry
      </h1>
      <div className="grid md:grid-cols-[30%_auto] gap-8 m-2">
        <div className="bg-gray-200 p-4 rounded-md">
          <h2 className="text-2xl font-bold">Enquiry Form</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="block mb-[2px] font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={getValue}
                placeholder="Your Name..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block mb-[2px] font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={getValue}
                placeholder="Your Email..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="block mb-[2px] font-medium">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={getValue}
                placeholder="Your PhoneNo..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="block mb-[2px] font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={getValue}
                placeholder="Your Message..."
                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {formData._id ? "Update" : "Submit"}
            </button>
          </form>
        </div>
        <div className="bg-gray-200 p-4 rounded-md min-w-0">
          <h2 className="text-2xl font-bold mb-3">Enquiry Details</h2>
          <div className="shadow-lg rounded-lg overflow-hidden">
            <div className="overflow-x-auto rounded-lg overflow-y-auto max-h-[420px] scrollbar-hide">
              <table className="w-full min-w-[1000px] rounded-lg border border-gray-200">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Sr No
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Phone
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                      Message
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 border-b">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {enquiryData.data && enquiryData.data.length > 0 ? (
                    enquiryData.data.map((enquiry, index) => (
                      <tr
                        key={enquiry._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm">{index + 1}</td>
                        <td className="px-4 py-3 text-sm">{enquiry.name}</td>
                        <td className="px-4 py-3 text-sm break-all">
                          {enquiry.email}
                        </td>
                        <td className="px-4 py-3 text-sm">{enquiry.phone}</td>
                        <td className="px-4 py-3 text-sm max-w-xs truncate">
                          {enquiry.message}
                        </td>
                        <td className="px-4 py-3 text-center space-x-2">
                          <button
                            onClick={() => editRow(enquiry._id)}
                            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteRow(enquiry._id)}
                            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-3 text-center text-sm text-gray-500"
                      >
                        No enquiries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
