/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { FaTag } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApplicantsByRole } from '@/redux/slices/applicationsSlice';
import { Input } from '@/components/ui/input';
import { IMAGE_API_END_POINT } from '@/utils/constant';
import Link from 'next/link';

const Applicants = ({ roleId }) => {
  const dispatch = useDispatch();
  const { applicants = [], loading, error } = useSelector((state) => state.applications);
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 10;
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (roleId) {
      dispatch(getApplicantsByRole(roleId));
    }
  }, [dispatch, roleId]);

  useEffect(() => {
    // Update filtered applicants based on search term
    const filtered = applicants.filter((applicant) =>
      applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredApplicants(filtered);
  }, [applicants, searchTerm]);

  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
  const currentApplicants = filteredApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);
  const totalPages = Math.ceil(filteredApplicants.length / applicantsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-1xl font-bold mb-8">
        View Applicants <span className="text-gray-500">(Total Applicants - {filteredApplicants.length})</span>
      </h1>

      <div className="flex justify-between mb-8">
        <div className="flex gap-3">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your talent"
            className="p-3 border rounded-lg shadow-md w-full focus:outline-none"
          />
          <Button className="font-semibold py-2 rounded-lg shadow-md transition-all duration-200">
            Search
          </Button>
        </div>
        <Button className="font-semibold py-2 px-5 rounded-lg shadow-md transition-all duration-200">
          Filter By
        </Button>
      </div> 

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {currentApplicants.map((applicant) => (
          <div
            key={applicant.id}
            className="card border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative p-4">
              {applicant.profilePictureUrl ? (
                <img src={`${applicant.profilePictureUrl}`} alt={applicant.fullName} className="object-cover rounded-lg" />
              ) : (
                <div className="bg-gray-300 h-40 w-full rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="absolute top-4 right-4 flex flex-col gap-3">
                <Heart className="w-6 h-6 text-red-500 hover:text-red-600 transition-transform duration-200 cursor-pointer" />
                <FaTag className="w-6 h-6 text-gray-500 hover:text-gray-600 transition-transform duration-200 cursor-pointer" />
              </div>
            </div>
            <div className="card-body p-4 text-center">
              <Link href={`/talent/${applicant.wctId}`} className="font-bold py-2 px-4 w-full rounded-md shadow-md transition-transform transform hover:scale-105">
                View Profile
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredApplicants.length > 0 && (
        <div className="pagination flex justify-center items-center space-x-3 mt-10">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200"
          >
            First
          </Button>
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200"
          >
            Previous
          </Button>

          {/* Display page numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`${
                currentPage === pageNumber ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              } text-gray-700 font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200`}
            >
              {pageNumber}
            </Button>
          ))}

          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200"
          >
            Next
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md shadow-md transition-all duration-200"
          >
            Last
          </Button>
        </div>
      )}
    </div>
  );
};

export default Applicants;
