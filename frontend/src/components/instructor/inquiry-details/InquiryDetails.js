import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./inquiry-details.styles.css";

function InquiryDetails() {
	const [receivedInquiry, setReceivedInquiry] = useState(null);
	const { id } = useParams();

	const fetchInquiry = async () => {
		console.log(id);
		try {
			const response = await axios.get(
				`http://localhost:3500/learnup/api/course-management/contact-admin/admin/contacts/${id}`
			);
			if (response.data) {
				setReceivedInquiry(response.data);
			}
		} catch (error) {
			toast.error("data can not be fetched!");
		}
	};

	useEffect(() => {
		fetchInquiry();
	}, []);

	return receivedInquiry !== null ? (
		<div className="inquiry-info-page-container">
		  <div className="inquiry-card">
			<span className="partition-heading">Inquiry Detailed View</span>
			<div className="inquiry-details">
			  <p>
				<span className="label">Instructor Name:</span>{" "}
				{receivedInquiry.instructorId.username}
			  </p>
			  <p>
  				<span className="label">Status:</span>{" "}
  				<span className={`status-badge ${receivedInquiry.status === "pending" ? "pending-status" : "resolved-status"}`}>
    				{receivedInquiry.status}
  				</span>
			  </p>
			  <p>
				<span className="label">Topic: <br/></span> {receivedInquiry.topic}
			  </p>
			  <p>
				<span className="label">Description:<br/></span><span className="rel-data">{" "}
				{receivedInquiry.description}</span>
			  </p>
			  
			  <p
				className={
				  receivedInquiry.adminResponse ? "show-reply" : "hide-reply"
				}
			  >
				<span className="label">Admin Response:<br/></span>{" "}
				{receivedInquiry.adminResponse}
			  </p>
			</div>
			<Link to="/instructor/dashboard/contact-admin">
			  <button>Back</button>
			</Link>
		  </div>
		</div>
	  ) : (
		<></>
	  );
	}
	

export default InquiryDetails;
