import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

function Verify() {
  const [searchParams] = useSearchParams()
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const { url } = useContext(StoreContext)
  const navigate = useNavigate()
  const [verificationStatus, setVerificationStatus] = useState('verifying') // 'verifying', 'success', 'failed'

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/verify",
        { success, orderId }
      )

      if (response.data.success) {
        setVerificationStatus('success')
        // Redirect to orders page after 3 seconds
        setTimeout(() => {
          navigate("/myorders")
        }, 3000)
      } else {
        setVerificationStatus('failed')
        setTimeout(() => {
          navigate("/")
        }, 3000)
      }
    } catch (error) {
      setVerificationStatus('failed')
      setTimeout(() => {
        navigate("/")
      }, 3000)
    }
  }

  useEffect(() => {
    verifyPayment()
  }, [])

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 p-6">

      {verificationStatus === 'verifying' && (
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>

          {/* Text */}
          <p className="mt-6 text-lg font-semibold text-orange-700">
            Verifying your payment...
          </p>
        </div>
      )}

      {verificationStatus === 'success' && (
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 transform animate-scale-in">
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Outer Circle with Pulse */}
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>

              {/* Main Circle */}
              <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                {/* Checkmark */}
                <svg
                  className="w-12 h-12 text-white animate-check-draw"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
            Thank You! 🎉
          </h1>

          <p className="text-center text-gray-600 text-lg mb-2">
            Your payment was successful!
          </p>

          <p className="text-center text-gray-500 mb-6">
            Order ID: <span className="font-semibold text-orange-600">{orderId}</span>
          </p>

          {/* Decorative Line */}
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent mb-6"></div>

          {/* Success Details */}
          <div className="bg-orange-50 rounded-2xl p-6 mb-6">
            <p className="text-center text-gray-700 leading-relaxed">
              Your order has been placed successfully! We're preparing your delicious meal with care.
              You'll receive updates on your order status shortly.
            </p>
          </div>

          {/* Redirect Notice */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <p>Redirecting to your orders in a moment...</p>
          </div>

          {/* Manual Navigation Button */}
          <button
            onClick={() => navigate("/myorders")}
            className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
          >
            View My Orders
          </button>
        </div>
      )}

      {verificationStatus === 'failed' && (
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 transform animate-scale-in">
          {/* Error Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
            Payment Failed
          </h1>

          <p className="text-center text-gray-600 text-lg mb-6">
            Unfortunately, we couldn't verify your payment. Please try again.
          </p>

          {/* Redirect Notice */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <p>Redirecting to home page...</p>
          </div>

          {/* Manual Navigation Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105"
          >
            Return to Home
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes check-draw {
          0% {
            stroke-dasharray: 0, 100;
          }
          100% {
            stroke-dasharray: 100, 0;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }

        .animate-check-draw {
          animation: check-draw 0.6s ease-out 0.2s forwards;
        }
      `}</style>
    </div>
  )
}

export default Verify
