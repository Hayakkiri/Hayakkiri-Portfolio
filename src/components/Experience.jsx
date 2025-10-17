import { useState, useEffect } from "react";

// Images
import brakesImage from "../assets/brakes.webp";
import thalirImage from "../assets/thalir_up.jpg";
import wheelsImage from "../assets/brakes_up.jpg";
import gkImage from "../assets/gk_up.jpg";
import harshaImage from "../assets/harsha_up.jpg";

// Experience Card Component
const ExperienceCard = ({ experience, index, isVisible }) => {
	const isEven = index % 2 === 0;
	const baseDelay = 200 + index * 300;

	return (
		<div
			className={`relative transform transition-all duration-1000 ${
				isVisible
					? "translate-y-0 opacity-100"
					: "translate-y-20 opacity-0"
			}`}
			style={{ transitionDelay: `${baseDelay}ms` }}
		>
			<div
				className={`flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 items-center ${
					isEven ? "lg:flex-row" : "lg:flex-row-reverse"
				}`}
			>
				{/* Image Section */}
				<div
					className={`w-full sm:w-3/4 md:w-2/3 lg:w-1/2 transform transition-all duration-1000 ${
						isVisible
							? (isEven ? "translate-x-0" : "translate-x-0") +
							  " opacity-100"
							: (isEven ? "-translate-x-10" : "translate-x-10") +
							  " opacity-0"
					}`}
					style={{ transitionDelay: `${baseDelay + 200}ms` }}
				>
					<div className="relative group">
						{/* Background decoration */}
						<div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-2xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
						<div className="absolute -inset-4 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-2xl transform -rotate-2 group-hover:-rotate-3 transition-transform duration-300"></div>

						{/* Main image container */}
						<div className="relative bg-white p-2 sm:p-3 md:p-4 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300">
							<div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl overflow-hidden bg-gray-50">
								<img
									src={experience.image}
									alt={experience.company}
									className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
								/>
							</div>

							{/* Experience type badge */}
							<div
								className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${
									experience.type === "work"
										? "bg-gradient-to-r from-green-500 to-emerald-500"
										: "bg-gradient-to-r from-blue-500 to-purple-500"
								}`}
							>
								{experience.type === "work"
									? "Work Experience"
									: "Internship"}
							</div>
						</div>
					</div>
				</div>

				{/* Content Section */}
				<div
					className={`w-full lg:w-1/2 space-y-4 sm:space-y-5 md:space-y-6 transform transition-all duration-1000 ${
						isVisible
							? (isEven ? "translate-x-0" : "translate-x-0") +
							  " opacity-100"
							: (isEven ? "translate-x-10" : "-translate-x-10") +
							  " opacity-0"
					}`}
					style={{ transitionDelay: `${baseDelay + 400}ms` }}
				>
					{/* Company and Role */}
					<div className="space-y-1 sm:space-y-2">
						<h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-gray-800 leading-tight">
							{experience.company}
						</h3>
						<p className="text-lg sm:text-xl md:text-xl text-blue-600 font-semibold">
							{experience.role}
						</p>
						<div className="flex items-center space-x-2 text-gray-500">
							<svg
								className="w-5 h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h12l-1 12a2 2 0 01-2 2H7a2 2 0 01-2-2L6 7z"
								/>
							</svg>
							<span className="font-medium">
								{experience.duration}
							</span>
						</div>
					</div>

					{/* Description */}
					<div className="bg-gray-50/80 rounded-xl p-6 border-l-4 border-blue-500">
						<p className="text-gray-700 leading-relaxed">
							{experience.description}
						</p>
					</div>

					{/* Skills/Technologies */}
					{experience.skills && (
						<div className="space-y-3">
							<h4 className="text-lg font-semibold text-gray-800">
								Key Skills & Technologies:
							</h4>
							<div className="flex flex-wrap gap-2">
								{experience.skills.map((skill, skillIndex) => (
									<span
										key={skillIndex}
										className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-all duration-300"
									>
										{skill}
									</span>
								))}
							</div>
						</div>
					)}

					{/* Department/Location info */}
					{experience.department && (
						<div className="flex items-center space-x-4 text-sm text-gray-600">
							<div className="flex items-center space-x-1">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-1 4h1m1-4h1"
									/>
								</svg>
								<span>{experience.department}</span>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Timeline connector */}
			{index < 4 && (
				<div className="flex justify-center my-8 sm:my-10 md:my-12 lg:my-16">
					<div className="w-px h-12 sm:h-14 md:h-16 lg:h-20 bg-gradient-to-b from-blue-400 to-purple-400 relative">
						<div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1.5 sm:-translate-y-2 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full border-2 sm:border-4 border-white shadow-lg"></div>
						<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1.5 sm:translate-y-2 w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full border-2 sm:border-4 border-white shadow-lg"></div>
					</div>
				</div>
			)}
		</div>
	);
};

function Experience() {
	const [isVisible, setIsVisible] = useState(false);
	const [hasAnimated, setHasAnimated] = useState(false);

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

		const experienceSection = document.getElementById("experience-section");
		if (experienceSection) {
			observer.observe(experienceSection);
		}

		return () => observer.disconnect();
	}, [hasAnimated]);

	const experiences = [
		{
			type: "work",
			company: "Wheels India",
			role: "Quality Inspector",
			duration: "Nov 2022 - May 2023",
			department: "Supplier Quality Assurance (SQA)",
			description:
				"Performed inspections of incoming materials in the Supplier Quality Assurance (SQA) department, utilizing QC tools such as calipers, micrometers, gauges, and other precision instruments for dimensional verification. Maintained accurate QC documentation to ensure compliance with quality standards and requirements.",
			skills: [
				"Quality Control",
				"Dimensional Verification",
				"Precision Instruments",
				"QC Documentation",
				"SQA Standards",
			],
			image: wheelsImage,
		},
		{
			type: "work",
			company: "Brakes India",
			role: "Assembly Line Operator",
			duration: "Sep 2021 - Mar 2022",
			department: "Tandem Master Cylinder (TMC)",
			description:
				"Worked as assembly line operator in the Tandem Master Cylinder (TMC) department, assembling components to precise specifications and conducting functional testing to ensure working standards.",
			skills: [
				"Assembly Operations",
				"Functional Testing",
				"TMC Components",
				"Quality Standards",
				"Precision Assembly",
			],
			image: brakesImage,
		},
		{
			type: "internship",
			company: "Thalir Automations",
			role: "SPM Development Intern",
			duration: "12 May 2025 - 11 Jun 2025",
			department: "Special Purpose Machine Development",
			description:
				"Learned knowledge in various stages of Special Purpose Machine (SPM) development at an automation company, learning about the intricacies of Departments Design, PPC, process, purchase, machine shop, quality control, assembly, and electrical aspects.",
			skills: [
				"SPM Development",
				"Design Process",
				"PPC",
				"Quality Control",
				"Assembly",
				"Electrical Systems",
			],
			image: thalirImage,
		},
		{
			type: "internship",
			company: "Harsha CNC",
			role: "CNC Machining Intern",
			duration: "10 Jul 2024 - 20 Jul 2024",
			department: "Manufacturing / Core",
			description:
				"Enhanced expertise in operating Vertical Machining Centers (VMC) and Horizontal Machining Centers (HMC), focusing on tool setup and machining operations. Developed an understanding of lathe processing and tool usage.",
			skills: [
				"VMC Operation",
				"HMC Operation",
				"Tool Setup",
				"Lathe Processing",
				"Machining Operations",
			],
			image: harshaImage,
		},
		{
			type: "internship",
			company: "G.K Engineering Works",
			role: "Manufacturing Intern",
			duration: "06 Feb 2024 - 20 Feb 2024",
			department: "Manufacturing / Core",
			description:
				"Developed experience in basic CNC machine operation for precision manufacturing processes. Learned and performed machining operations on slotter machines to align the key on shafts.",
			skills: [
				"CNC Operation",
				"Precision Manufacturing",
				"Slotter Machines",
				"Shaft Alignment",
				"Key Alignment",
			],
			image: gkImage,
		},
	];

	return (
		<section
			id="experience-section"
			className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-12 sm:py-16 md:py-20 lg:py-24"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
				{/* Section Title */}
				<div
					className={`text-center mb-12 md:mb-16 lg:mb-20 transform transition-all duration-1000 ${
						isVisible
							? "translate-y-0 opacity-100"
							: "translate-y-10 opacity-0"
					}`}
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800 mb-3 md:mb-4 leading-tight">
						<span className="block sm:inline">Professional</span>
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block sm:inline sm:ml-2 md:ml-4">
							Experience
						</span>
					</h2>
					<p className="text-base sm:text-lg md:text-xl lg:text-xl text-gray-600 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto mb-4 md:mb-6 px-4 leading-relaxed">
						My journey through various roles in quality control,
						manufacturing, and automation
					</p>
					<div className="w-24 sm:w-28 md:w-32 lg:w-36 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
				</div>

				{/* Experience Timeline */}
				<div className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20">
					{experiences.map((experience, index) => (
						<ExperienceCard
							key={index}
							experience={experience}
							index={index}
							isVisible={isVisible}
						/>
					))}
				</div>

				{/* Summary Stats */}
				<div
					className={`mt-12 sm:mt-16 md:mt-20 lg:mt-24 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 transform transition-all duration-1000 ${
						isVisible
							? "translate-y-0 opacity-100"
							: "translate-y-10 opacity-0"
					}`}
					style={{ transitionDelay: "1800ms" }}
				>
					<div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
						<div className="text-2xl sm:text-3xl md:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
							2
						</div>
						<div className="text-gray-700 font-medium text-sm sm:text-base">
							Work Experiences
						</div>
					</div>
					<div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
						<div className="text-2xl sm:text-3xl md:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
							3
						</div>
						<div className="text-gray-700 font-medium text-sm sm:text-base">
							Internships
						</div>
					</div>
					<div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
						<div className="text-2xl sm:text-3xl md:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">
							18+
						</div>
						<div className="text-gray-700 font-medium text-sm sm:text-base">
							Months Experience
						</div>
					</div>
					<div className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 md:p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300">
						<div className="text-2xl sm:text-3xl md:text-3xl font-bold text-orange-600 mb-1 sm:mb-2">
							5
						</div>
						<div className="text-gray-700 font-medium text-sm sm:text-base">
							Companies
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Experience;
