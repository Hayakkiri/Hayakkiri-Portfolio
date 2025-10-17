import { useState, useEffect } from "react";

// Import certificate images
import democracyQuizCert from "../assets/democracy_quiz.jpg";
import bentley1Cert from "../assets/bentley_1.webp";
import bentley2Cert from "../assets/bentley_2.webp";
import bentley3Cert from "../assets/bentley_3.webp";
import ciscoCert from "../assets/cisco.webp";
import thalir from "../assets/thalir.webp";
import harsha from "../assets/harsha.webp";
import gk from "../assets/gk.webp";

// Image Viewer Component
const ImageViewer = ({ isOpen, onClose, certificate }) => {
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen || !certificate) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
			<div
				className="absolute inset-0 cursor-pointer"
				onClick={onClose}
			/>

			<div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-sm"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Certificate Image Only */}
				<div className="w-full">
					<img
						src={certificate.image}
						alt={certificate.name}
						className="w-full h-full object-contain max-h-[85vh]"
					/>
				</div>
			</div>
		</div>
	);
};

function MyCertifications() {
	const [isVisible, setIsVisible] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [selectedCertificate, setSelectedCertificate] = useState(null);
	const [isViewerOpen, setIsViewerOpen] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setIsVisible(true);
					setHasAnimated(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.2 },
		);

		const certSection = document.getElementById("certifications-section");
		if (certSection) {
			observer.observe(certSection);
		}

		return () => observer.disconnect();
	}, [hasAnimated]);

	// Actual certification data with imported images
	const certifications = [
		{
			id: 1,
			name: "Democracy Quiz Certificate",
			image: democracyQuizCert,
			issuer: "Civic Education",
		},
		{
			id: 2,
			name: "Bentley Certificate 1",
			image: bentley1Cert,
			issuer: "Bentley Systems",
		},
		{
			id: 3,
			name: "Bentley Certificate 2",
			image: bentley2Cert,
			issuer: "Bentley Systems",
		},
		{
			id: 4,
			name: "Bentley Certificate 3",
			image: bentley3Cert,
			issuer: "Bentley Systems",
		},
		{
			id: 5,
			name: "Cisco Networking Certificate",
			image: ciscoCert,
			issuer: "Cisco Systems",
		},
	];

	// Duplicate the array to create seamless infinite scroll
	const duplicatedCertifications = [
		...certifications,
		...certifications,
		...certifications,
	];

	const handleImageClick = (cert) => {
		setSelectedCertificate(cert);
		setIsViewerOpen(true);
	};

	const closeViewer = () => {
		setIsViewerOpen(false);
		setSelectedCertificate(null);
	};

	return (
		<section
			id="certifications-section"
			className="min-h-screen bg-gradient-to-br from-blue-50/30 to-purple-50/30 py-20"
		>
			<div className="max-w-7xl mx-auto px-8">
				{/* Section Title */}
				<div
					className={`text-center mb-16 transform transition-all duration-1000 ${
						isVisible
							? "translate-y-0 opacity-100"
							: "translate-y-10 opacity-0"
					}`}
				>
					<h2
						className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 transform transition-all duration-1000 leading-tight ${
							isVisible
								? "scale-100 opacity-100"
								: "scale-95 opacity-0"
						}`}
					>
						<span className="block sm:inline">My</span>
						<span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 sm:ml-4">
							Certifications
						</span>
					</h2>
					<div
						className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full transform transition-all duration-800 delay-200 ${
							isVisible
								? "scale-x-100 opacity-100"
								: "scale-x-0 opacity-0"
						}`}
					></div>
					<p
						className={`text-lg text-gray-600 mt-6 max-w-2xl mx-auto transform transition-all duration-1000 delay-400 ${
							isVisible
								? "translate-y-0 opacity-100"
								: "translate-y-5 opacity-0"
						}`}
					>
						Professional certifications and achievements that
						showcase my expertise and commitment to continuous
						learning
					</p>
				</div>

				{/* Infinite Scrolling Carousel */}
				<div
					className={`relative overflow-hidden transform transition-all duration-1000 delay-600 ${
						isVisible
							? "translate-y-0 opacity-100"
							: "translate-y-10 opacity-0"
					}`}
				>
					{/* Gradient Overlays */}
					<div
						className={`absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-blue-50/80 to-transparent z-10 pointer-events-none transform transition-all duration-800 delay-700 ${
							isVisible
								? "translate-x-0 opacity-100"
								: "-translate-x-10 opacity-0"
						}`}
					></div>
					<div
						className={`absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-purple-50/80 to-transparent z-10 pointer-events-none transform transition-all duration-800 delay-700 ${
							isVisible
								? "translate-x-0 opacity-100"
								: "translate-x-10 opacity-0"
						}`}
					></div>

					{/* Scrolling Container */}
					<div
						className={`flex space-x-8 transform transition-all duration-1000 delay-800 ${
							isVisible
								? "animate-scroll translate-y-0 opacity-100"
								: "translate-y-5 opacity-0"
						}`}
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
						style={{
							width: `${duplicatedCertifications.length * 280}px`,
							animationPlayState: isHovered
								? "paused"
								: "running",
						}}
					>
						{duplicatedCertifications.map((cert, index) => (
							<div
								key={`${cert.id}-${index}`}
								className={`flex-shrink-0 w-64 h-48 cursor-pointer group transform transition-all duration-800 ${
									isVisible
										? "scale-100 opacity-100"
										: "scale-95 opacity-0"
								}`}
								onClick={() => handleImageClick(cert)}
								style={{
									transitionDelay: `${
										900 + (index % 8) * 100
									}ms`,
								}}
							>
								{/* Certificate Image Only */}
								<div className="relative overflow-hidden rounded-xl h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
									<img
										src={cert.image}
										alt={cert.name}
										className="w-full h-full object-cover"
									/>

									{/* Subtle Hover Overlay */}
									<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Additional Info */}
				<div
					className={`text-center mt-16 transform transition-all duration-1000 delay-1200 ${
						isVisible
							? "translate-y-0 opacity-100"
							: "translate-y-5 opacity-0"
					}`}
				>
					<p
						className={`text-gray-600 transform transition-all duration-800 delay-1300 ${
							isVisible
								? "scale-100 opacity-100"
								: "scale-95 opacity-0"
						}`}
					>
						Hover over any certificate to pause the carousel and
						explore details
					</p>
				</div>
			</div>

			{/* Image Viewer Popup */}
			<ImageViewer
				isOpen={isViewerOpen}
				onClose={closeViewer}
				certificate={selectedCertificate}
			/>
		</section>
	);
}

export default MyCertifications;
