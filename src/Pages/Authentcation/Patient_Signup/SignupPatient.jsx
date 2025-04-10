import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Web3 from "web3";
// import { Buffer } from "buffer";  // Commented out IPFS-related imports
// import axios from "axios";

// Polyfill for Buffer - Commented out
// window.Buffer = Buffer;

function SignupPatient() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  // const [ipfsHash, setIpfsHash] = useState("");  // Commented out IPFS state
  const [patientAddress, setPatientAddress] = useState("");
  const [patientData, setPatientData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  // Commented out dropzone since we're not using IPFS
  // const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
  //   accept: { "image/*": [".jpeg", ".png", ".jpg"] },
  //   maxFiles: 1,
  // });

  // Initialize Web3 and contract
  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          const contractABI = [
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "patientAddress",
                  type: "address",
                },
              ],
              name: "PatientRegistered",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_fullName",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_dob",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_gender",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_contactNo",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_email",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_emergencyContact",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_medicalHistory",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_bloodGroup",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_allergies",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_ipfsHash",
                  type: "string",
                },
              ],
              name: "registerPatient",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_patientAddress",
                  type: "address",
                },
              ],
              name: "getPatient",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPatientCount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "patientAddresses",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "patients",
              outputs: [
                {
                  internalType: "string",
                  name: "fullName",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "dob",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "gender",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "contactNo",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "email",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "emergencyContact",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "medicalHistory",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "bloodGroup",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "allergies",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "ipfsHash",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ];

          const contractAddress = "0x08fD6F544b18F08f31df9c4321bd0995cc0E6b2d";
          const contractInstance = new web3Instance.eth.Contract(
            contractABI,
            contractAddress
          );
          setContract(contractInstance);
          setWeb3(web3Instance);
        } catch (error) {
          console.error("Error initializing Web3:", error);
          alert("Failed to connect to MetaMask. Please try again.");
        }
      } else {
        alert("Please install MetaMask to use this app!");
      }
    };

    initWeb3();
  }, []);

  // Commented out IPFS upload function
  // const uploadToIPFS = async (file) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     const response = await axios.post(
  //       "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           pinata_api_key: "YOUR_PINATA_API_KEY",
  //           pinata_secret_api_key: "YOUR_PINATA_SECRET_KEY",
  //         },
  //       }
  //     );
  //     return response.data.IpfsHash;
  //   } catch (error) {
  //     console.error("Error uploading to IPFS:", error);
  //     return "";
  //   }
  // };

  const onSubmit = async (data) => {
    if (!contract || !account) {
      alert("Please connect to MetaMask first");
      return;
    }

    try {
      setLoading(true);

      // Commented out IPFS upload
      // let ipfsHash = "";
      // if (acceptedFiles[0]) {
      //   ipfsHash = await uploadToIPFS(acceptedFiles[0]);
      //   setIpfsHash(ipfsHash);
      // }

      // Convert date to timestamp
      const dobTimestamp = Math.floor(new Date(data.dob).getTime() / 1000);

      // Register patient on blockchain without IPFS hash
      await contract.methods
        .registerPatient(
          data.fullName,
          dobTimestamp,
          data.gender,
          data.contactNo,
          data.email,
          data.emergencyContact,
          data.medicalHistory || "",
          data.bloodGroup || "",
          data.allergies || "",
          "" // Empty string for ipfsHash parameter
        )
        .send({ from: account });

      alert("Patient registered successfully on blockchain!");
    } catch (error) {
      console.error("Error registering patient:", error);
      alert("Failed to register patient. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatientData = async () => {
    if (!contract || !patientAddress) {
      alert("Please connect to MetaMask and enter a valid patient address.");
      return;
    }

    try {
      const data = await contract.methods.getPatient(patientAddress).call();
      setPatientData({
        fullName: data[0],
        dob: new Date(Number(data[1]) * 1000).toLocaleDateString(), // Convert BigInt to Number
        gender: data[2],
        contactNo: data[3],
        email: data[4],
        emergencyContact: data[5],
        medicalHistory: data[6],
        bloodGroup: data[7],
        allergies: data[8],
      });
    } catch (error) {
      console.error("Error fetching patient data:", error);
      alert(
        "Failed to fetch patient data. Please check the address and try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
      {/* Connection Status */}
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="font-medium">
          {account ? `Connected: ${account}` : "Not connected to MetaMask"}
        </p>
      </div>

      {/* Commented out Profile Photo Upload section */}
      {/* <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
        <div {...getRootProps({ className: "cursor-pointer" })}>
          <input {...getInputProps()} />
          {acceptedFiles[0] ? (
            <img
              src={URL.createObjectURL(acceptedFiles[0])}
              alt="Profile Preview"
              className="mx-auto h-32 w-32 rounded-full object-cover"
            />
          ) : (
            <div className="space-y-2">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Drag & drop profile photo, or click to select (Optional)
              </p>
            </div>
          )}
        </div>
      </div> */}

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <InputField
          label="Full Name"
          name="fullName"
          register={register}
          required
          error={errors.fullName}
        />

        {/* Date of Birth */}
        <InputField
          label="Date of Birth"
          name="dob"
          type="date"
          register={register}
          required
          error={errors.dob}
        />

        {/* Gender */}
        <SelectField
          label="Gender"
          name="gender"
          options={["Male", "Female", "Other"]}
          register={register}
          required
          error={errors.gender}
        />

        {/* Contact No. */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <Controller
            name="contactNo"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PhoneInput
                {...field}
                international
                defaultCountry="IN"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          {errors.contactNo && (
            <span className="text-red-500 text-sm">
              Contact number is required
            </span>
          )}
        </div>

        {/* Email ID */}
        <InputField
          label="Email ID"
          name="email"
          type="email"
          register={register}
          required
          error={errors.email}
        />

        {/* Emergency Contact */}
        <InputField
          label="Emergency Contact"
          name="emergencyContact"
          register={register}
          required
          error={errors.emergencyContact}
        />

        {/* Medical History */}
        <div className="col-span-full">
          <label className="block text-sm font-medium text-gray-700">
            Medical History
          </label>
          <textarea
            {...register("medicalHistory")}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        </div>

        {/* Blood Group */}
        <SelectField
          label="Blood Group"
          name="bloodGroup"
          options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
          register={register}
          error={errors.bloodGroup}
        />

        {/* Allergies */}
        <InputField
          label="Allergies"
          name="allergies"
          register={register}
          error={errors.allergies}
        />
      </div>

      <button
        type="submit"
        disabled={loading || !account}
        className={`w-full py-2 rounded-lg transition-colors ${
          loading || !account
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Registering..." : "Register on Blockchain"}
      </button>

      {/* View Patients Section */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg space-y-4">
        <h2 className="text-lg font-medium">View Patient Data</h2>
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Patient Address
          </label>
          <input
            type="text"
            value={patientAddress}
            onChange={(e) => setPatientAddress(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient address"
          />
        </div>
        <button
          type="button"
          onClick={fetchPatientData}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Fetch Patient Data
        </button>

        {patientData && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium">Patient Details</h3>
            <p>
              <strong>Full Name:</strong> {patientData.fullName}
            </p>
            <p>
              <strong>Date of Birth:</strong> {patientData.dob}
            </p>
            <p>
              <strong>Gender:</strong> {patientData.gender}
            </p>
            <p>
              <strong>Contact No:</strong> {patientData.contactNo}
            </p>
            <p>
              <strong>Email:</strong> {patientData.email}
            </p>
            <p>
              <strong>Emergency Contact:</strong> {patientData.emergencyContact}
            </p>
            <p>
              <strong>Medical History:</strong> {patientData.medicalHistory}
            </p>
            <p>
              <strong>Blood Group:</strong> {patientData.bloodGroup}
            </p>
            <p>
              <strong>Allergies:</strong> {patientData.allergies}
            </p>
          </div>
        )}
      </div>

      {/* Commented out IPFS Hash display */}
      {/* {ipfsHash && (
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Profile Photo IPFS Hash:</span>{" "}
            {ipfsHash}
          </p>
        </div>
      )} */}
    </form>
  );
}

// Reusable Input Component
function InputField({ label, name, type = "text", register, required, error }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      {error && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}
    </div>
  );
}

// Reusable Select Component
function SelectField({ label, name, options, register, required, error }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...register(name, { required })}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-red-500 text-sm">This field is required</span>
      )}
    </div>
  );
}

export default SignupPatient;
