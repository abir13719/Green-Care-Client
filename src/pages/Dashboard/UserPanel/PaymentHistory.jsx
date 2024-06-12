import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import ReactPaginate from "react-paginate";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/payment-info/${user.email}`
        );
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payment history", error);
      }
    };

    fetchPayments();
  }, [user.email]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const filteredPayments = payments.filter((payment) =>
    Object.values(payment)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredPayments.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredPayments.length / itemsPerPage);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Payment History</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Camp Name, Camp Fees, Date, Transaction ID, or Payment Status"
          value={searchQuery}
          onChange={handleSearch}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <td className="py-2 px-4 border-b font-bold">Camp Name</td>
            <td className="py-2 px-4 border-b font-bold">Camp Fees</td>
            <td className="py-2 px-4 border-b font-bold">Date</td>
            <td className="py-2 px-4 border-b font-bold">Transaction ID</td>
            <td className="py-2 px-4 border-b font-bold">Payment Status</td>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((payment) => (
            <tr key={payment._id}>
              <td className="py-2 px-4 border-b">{payment.campName}</td>
              <td className="py-2 px-4 border-b">{payment.campFees}</td>
              <td className="py-2 px-4 border-b">{payment.date}</td>
              <td className="py-2 px-4 border-b">{payment.transactionId}</td>
              <td className="py-2 px-4 border-b">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"flex justify-center my-4 w-full"}
        pageClassName={"mx-1"}
        pageLinkClassName={"px-3 py-1 bg-gray-300 rounded-md"}
        previousClassName={"mx-1"}
        previousLinkClassName={
          "px-3 py-1 bg-green-500 rounded-md hover:bg-green-400"
        }
        nextClassName={"mx-1"}
        nextLinkClassName={
          "px-3 py-1 bg-green-500 rounded-md hover:bg-green-400"
        }
        breakClassName={"mx-1"}
        breakLinkClassName={"px-3 py-1"}
        activeClassName={"bg-gray-300"}
        activeLinkClassName={
          "text-gray-900 font-bold bg-[#000000] text-[#ffff] rounded-md"
        }
      />
    </div>
  );
};

export default PaymentHistory;
