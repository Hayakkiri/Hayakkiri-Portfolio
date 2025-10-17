import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
	const [isVisible, setIsVisible] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState(null);
	const [submittedEmail, setSubmittedEmail] = useState("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !hasAnimated) {
					setIsVisible(true);
					setHasAnimated(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.1 },
		);

		const contactSection = document.getElementById("contact-section");
		if (contactSection) {
			observer.observe(contactSection);
		}

		return () => observer.disconnect();
	}, [hasAnimated]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus(null);

		try {
			// EmailJS configuration from environment variables
			const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
			const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
			const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

			// Check if all required configuration is available
			if (
				!serviceId ||
				!templateId ||
				!publicKey ||
				serviceId === "your_actual_service_id" ||
				templateId === "template_contact" ||
				publicKey === "your_actual_public_key"
			) {
				throw new Error(
					"EmailJS configuration is missing. Please check your .env file.",
				);
			}

			// Prepare template parameters
			const templateParams = {
				from_name: formData.name,
				from_email: formData.email,
				phone: formData.phone,
				message: formData.message,
				to_email: "mhayakkiri@gmail.com", // Your email
				reply_to: formData.email,
			};

			// Send email using EmailJS
			const response = await emailjs.send(
				serviceId,
				templateId,
				templateParams,
				publicKey,
			);

			if (response.status === 200) {
				setSubmitStatus("success");
				// Store email for success message before resetting form
				setSubmittedEmail(formData.email);
				// Reset form
				setFormData({
					name: "",
					email: "",
					phone: "",
					message: "",
				});
			} else {
				throw new Error("Failed to send email");
			}
		} catch (error) {
			console.error("EmailJS Error:", error);

			// Set more specific error status based on error type
			if (error.message.includes("EmailJS configuration")) {
				setSubmitStatus("config_error");
			} else {
				setSubmitStatus("error");
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const contactInfo = [
		{
			title: "Phone & WhatsApp",
			value: "+91 98941 15608",
			icon: (
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
						d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
					/>
				</svg>
			),
			color: "from-green-500 to-emerald-500",
			link: "tel:+919894115608",
		},
		{
			title: "Email",
			value: "mhayakkiri@gmail.com",
			icon: (
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
						d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/>
				</svg>
			),
			color: "from-blue-500 to-cyan-500",
			link: "mailto:mhayakkiri@gmail.com",
		},
		{
			title: "Location",
			value: "Coimbatore, Tamil Nadu, India",
			icon: (
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
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			),
			color: "from-purple-500 to-pink-500",
			link: null,
		},
	];

	const socialLinks = [
		{
			name: "GitHub",
			url: "https://github.com/hayakkiri",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
				</svg>
			),
			color: "hover:text-gray-800 hover:bg-gray-100",
		},
		{
			name: "LinkedIn",
			url: "https://www.linkedin.com/in/hayakkiri-m-a2a93b336",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
				</svg>
			),
			color: "hover:text-blue-600 hover:bg-blue-50",
		},
		{
			name: "Instagram",
			url: "https://www.instagram.com/hayakkiri",
			icon: (
				<svg
					className="w-6 h-6"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
				</svg>
			),
			color: "hover:text-pink-600 hover:bg-pink-50",
		},
	];

	return (
		<section
			id="contact-section"
			className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden"
		>
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div
					className="absolute inset-0"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
					}}
				></div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
				{/* Section Title */}
				<div
					className={`text-center mb-12 md:mb-16 lg:mb-20 transform transition-all duration-1000 ${
						isVisible
							? "translate-y-0 opacity-100"
							: "translate-y-10 opacity-0"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-3 md:mb-4 leading-tight">
						<span className="block sm:inline">Get In</span>
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block sm:inline sm:ml-2 md:ml-4">
							Touch
						</span>
					</h2>
					<p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-4 md:mb-6 px-4 leading-relaxed">
						Ready to start your next project? Let's collaborate and
						bring your ideas to life
					</p>
					<div className="w-24 sm:w-28 md:w-32 lg:w-36 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
				</div>

				<div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
					{/* Contact Info Section */}
					<div
						className={`space-y-8 transform transition-all duration-1000 delay-300 ${
							isVisible
								? "translate-x-0 opacity-100"
								: "-translate-x-10 opacity-0"
						}`}
					>
						<div className="space-y-6">
							<h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
								Let's Connect
							</h3>

							{/* Contact Information Cards */}
							<div className="space-y-4">
								{contactInfo.map((contact, index) => (
									<div
										key={contact.title}
										className={`group bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-gray-200/50 hover:bg-white hover:border-blue-400/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
											isVisible
												? "translate-y-0 opacity-100"
												: "translate-y-5 opacity-0"
										}`}
										style={{
											transitionDelay: `${
												600 + index * 200
											}ms`,
										}}
									>
										{contact.link ? (
											<a
												href={contact.link}
												className="flex items-center space-x-4"
											>
												<div
													className={`p-3 rounded-full bg-gradient-to-r ${contact.color} text-white`}
												>
													{contact.icon}
												</div>
												<div>
													<h4 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
														{contact.title}
													</h4>
													<p className="text-gray-600 group-hover:text-gray-800 transition-colors">
														{contact.value}
													</p>
												</div>
											</a>
										) : (
											<div className="flex items-center space-x-4">
												<div
													className={`p-3 rounded-full bg-gradient-to-r ${contact.color} text-white`}
												>
													{contact.icon}
												</div>
												<div>
													<h4 className="text-lg font-semibold text-gray-800">
														{contact.title}
													</h4>
													<p className="text-gray-600">
														{contact.value}
													</p>
												</div>
											</div>
										)}
									</div>
								))}
							</div>
						</div>

						{/* Social Media Links */}
						<div
							className={`transform transition-all duration-1000 delay-1200 ${
								isVisible
									? "translate-y-0 opacity-100"
									: "translate-y-5 opacity-0"
							}`}
						>
							<h4 className="text-xl font-semibold text-gray-800 mb-4">
								Follow Me
							</h4>
							<div className="flex space-x-4">
								{socialLinks.map((social, index) => (
									<a
										key={social.name}
										href={social.url}
										target="_blank"
										rel="noopener noreferrer"
										className={`group w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-all duration-300 hover:shadow-xl transform hover:scale-110 hover:-translate-y-1 border border-gray-200/50 hover:border-blue-400/50`}
										title={social.name}
									>
										{social.icon}
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Contact Form Section */}
					<div
						className={`transform transition-all duration-1000 delay-600 ${
							isVisible
								? "translate-x-0 opacity-100"
								: "translate-x-10 opacity-0"
						}`}
					>
						<div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-200/50 shadow-xl">
							<h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
								Send Me A Message
							</h3>

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Your Name *
										</label>
										<input
											type="text"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
											placeholder="Enter your name"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Your Email *
										</label>
										<input
											type="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											required
											className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
											placeholder="Enter your email"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Phone Number
									</label>
									<input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleInputChange}
										className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
										placeholder="Enter your phone number"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Message *
									</label>
									<textarea
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										required
										rows={5}
										className="w-full px-4 py-3 bg-white/50 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
										placeholder="Enter your message"
									/>
								</div>

								<button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
								>
									{isSubmitting ? (
										<span className="flex items-center justify-center">
											<svg
												className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
											>
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													strokeWidth="4"
												></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
												></path>
											</svg>
											Sending...
										</span>
									) : (
										"Send Message"
									)}
								</button>

								{submitStatus === "success" && (
									<div className="p-4 bg-green-500/20 border border-green-400/50 rounded-lg">
										<div className="text-center">
											<div className="flex items-center justify-center mb-2">
												<svg
													className="w-5 h-5 text-green-400 mr-2"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
												<p className="text-green-400 font-medium">
													Message sent successfully!
												</p>
											</div>
											<p className="text-green-600 text-sm">
												Thank you for reaching out. I'll
												get back to you within 24 hours
												at {submittedEmail}.
											</p>
										</div>
									</div>
								)}

								{submitStatus === "error" && (
									<div className="p-4 bg-red-500/20 border border-red-400/50 rounded-lg">
										<p className="text-red-400 text-center">
											Something went wrong. Please try
											again later.
										</p>
									</div>
								)}

								{submitStatus === "config_error" && (
									<div className="p-4 bg-yellow-500/20 border border-yellow-400/50 rounded-lg">
										<p className="text-yellow-600 text-center text-sm">
											EmailJS is not configured yet.
											Please check the EMAILJS_SETUP.md
											file for setup instructions.
											<br />
											<span className="text-xs mt-1 block">
												For now, you can reach me
												directly at:
												<a
													href="mailto:mhayakkiri@gmail.com"
													className="text-blue-600 hover:underline ml-1"
												>
													mhayakkiri@gmail.com
												</a>
											</span>
										</p>
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Contact;
