import React, { useState } from 'react';
import axios from 'axios';
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { UserIcon, CogIcon } from "@heroicons/react/24/outline";

const CreateBooking = () => {
  const [receptionData, setReceptionData] = useState({
    clientName: '',
    checkInDate: '',
    checkOutDate: '',
    status: '',
    numberOfGuests: 0,
    specialRequests: ''
  });

  const [paymentData, setPaymentData] = useState({
    amount: 0,
    paymentDate: '',
    paymentMethod: '',
    status: ''
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('reception')) {
      setReceptionData({
        ...receptionData,
        [name.split('_')[1]]: value
      });
    } else if (name.startsWith('payment')) {
      setPaymentData({
        ...paymentData,
        [name.split('_')[1]]: value
      });
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (!receptionData.clientName) {
        alert('Please enter client name.');
        return;
      }

      try {
        const receptionResponse = await axios.post('http://localhost:8080/api/receptions', receptionData);
        const createdReception = receptionResponse.data;
        console.log('Reception created:', createdReception);
        setIsFirstStep(false);
        setActiveStep(1);
      } catch (error) {
        console.error('Error creating reception:', error);
        alert('Error creating reception. Please try again.');
      }
    } else if (activeStep === 1) {
      if (paymentData.amount <= 0) {
        alert('Please enter valid payment amount.');
        return;
      }

      try {
        const paymentResponse = await axios.post(`http://localhost:8080/api/receptions/${receptionData.id}/payments`, paymentData);
        const createdPayment = paymentResponse.data;
        console.log('Payment created for reception:', createdPayment);
        setIsLastStep(true);
      } catch (error) {
        console.error('Error creating payment:', error);
        alert('Error creating payment. Please try again.');
      }
    }
  };

  const handlePrev = () => {
    setActiveStep((cur) => cur - 1);
    setIsLastStep(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create Reception
      const receptionResponse = await axios.post('http://localhost:8080/api/receptions', receptionData);
      const createdReception = receptionResponse.data;
      console.log('Reception created:', createdReception);

      // Step 2: Create Payment for the created Reception
      const paymentResponse = await axios.post(`http://localhost:8080/api/receptions/${createdReception.id}/payments`, paymentData);
      const createdPayment = paymentResponse.data;
      console.log('Payment created for reception:', createdPayment);

      alert('Booking successfully created!');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        color="blue"
      >
        <Step onClick={() => setActiveStep(0)} className="relative">
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Typography
              variant="h6"
              color={activeStep === 0 ? "black" : "black"}
              className="font-bold text-lg"
            >
              Step 1
            </Typography>
            <Typography
              color={activeStep === 0 ? "blue-gray" : "gray"}
              className="font-normal text-sm"
            >
              Reception Details
            </Typography>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)} className="relative">
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <Typography
              variant="h6"
              color={activeStep === 1 ? "black" : "black"}
              className="font-bold text-lg"
            >
              Step 2
            </Typography>
            <Typography
              color={activeStep === 1 ? "blue-gray" : "gray"}
              className="font-normal text-sm"
            >
              Payment Details
            </Typography>
          </div>
        </Step>
      </Stepper>
      <div className="mt-12 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep} color="blue" className="px-6 py-2">
          Prev
        </Button>
        {isLastStep && (
          <Button onClick={handleSubmit} color="blue" className="px-6 py-2">
            Submit
          </Button>
        )}
        {!isLastStep && (
          <Button onClick={handleNext} color="blue" className="px-6 py-2">
            Next
          </Button>
        )}
      </div>

      <form className="mt-8">
        {activeStep === 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Reception Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">
                  Client Name:
                  <input type="text" name="reception_clientName" value={receptionData.clientName} onChange={handleChange} className="form-input mt-1 block w-full" required />
                </label>
                <label className="block mb-1">
                  Check-in Date:
                  <input type="datetime-local" name="reception_checkInDate" value={receptionData.checkInDate} onChange={handleChange} className="form-input mt-1 block w-full" required />
                </label>
              </div>
              <div>
                <label className="block mb-1">
                  Check-out Date:
                  <input type="datetime-local" name="reception_checkOutDate" value={receptionData.checkOutDate} onChange={handleChange} className="form-input mt-1 block w-full" required />
                </label>
                <label className="block mb-1">
                  Status:
                  <select name="reception_status" value={receptionData.status} onChange={handleChange} className="form-select mt-1 block w-full" required>
                    <option value="" disabled>Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </label>
              </div>
            </div>
            <label className="block mb-1">
              Number of Guests:
              <input type="number" name="reception_numberOfGuests" value={receptionData.numberOfGuests} onChange={handleChange} className="form-input mt-1 block w-full" required />
            </label>
            <label className="block mb-1">
              Special Requests:
              <textarea name="reception_specialRequests" value={receptionData.specialRequests} onChange={handleChange} className="form-textarea mt-1 block w-full" rows="3"></textarea>
            </label>
          </div>
        )}
        {activeStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Details</h3>
            <label className="block mb-1">
              Amount:
              <input type="number" name="payment_amount" value={paymentData.amount} onChange={handleChange} className="form-input mt-1 block w-full" required />
            </label>
            <label className="block mb-1">
              Payment Date:
              <input type="datetime-local" name="payment_paymentDate" value={paymentData.paymentDate} onChange={handleChange} className="form-input mt-1 block w-full" required />
            </label>
            <label className="block mb-1">
              Payment Method:
              <select name="payment_paymentMethod" value={paymentData.paymentMethod} onChange={handleChange} className="form-select mt-1 block w-full" required>
                <option value="" disabled>Select payment method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash">Cash</option>
              </select>
            </label>
            <label className="block mb-1">
              Payment Status:
              <select name="payment_status" value={paymentData.status} onChange={handleChange} className="form-select mt-1 block w-full" required>
                <option value="" disabled>Select status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Failed">Failed</option>
              </select>
            </label>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateBooking;
