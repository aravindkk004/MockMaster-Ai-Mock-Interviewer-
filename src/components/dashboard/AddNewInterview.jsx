"use client";
import React, { useState } from "react";
import Modal from "../Modal";
import InterviewForm from "../interview/InterviewForm";

const AddNewInterview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div>
        <div
          className="p-10 border rounded-lg bg-gray-100 hover:scale-105 hover:shadow-md cursor-pointer transition-all border-dashed"
          onClick={handleOpenModal}
        >
          <h2 className="text-lg text-center">+ Add New</h2>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <InterviewForm handleCloseModal={handleCloseModal} />
        </Modal>
      </div>
    </>
  );
};

export default AddNewInterview;
