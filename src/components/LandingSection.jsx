import { useState } from "react";
import ParticlesBackground from "./ParticlesBackground";
import MobileMenu from "./MobileMenu";
import { handleResumeClick } from "../utils/resumeHandler";
import logoImage from "../assets/landingLogo.jpg";

// Landing Header Component
const LandingHeader = ({ onMobileMenuToggle }) => {
	return (
		<header className="relative z-20 w-full py-4 md:py-6 px-4 md:px-8">
			<nav className="flex items-center justify-between max-w-7xl mx-auto">
				{/* Logo */}
				<div className="flex items-center">
					<img
						src={logoImage}
						alt="Hayakkiri Logo"
						className="h-8 md:h-10 w-auto object-contain hover:scale-105 transition-transform duration-300"
					/>
				</div>

				{/* Navigation Menu */}
				<div className="hidden md:flex items-center space-x-6 lg:space-x-8">
					<button
						onClick={() =>
							window.scrollTo({ top: 0, behavior: "smooth" })
						}
						className="text-white hover:text-blue-400 transition-colors duration-300 font-medium cursor-pointer"
					>
						Home
					</button>
					<button
						onClick={() =>
							document
								.getElementById("about-section")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="text-white hover:text-blue-400 transition-colors duration-300 font-medium cursor-pointer"
					>
						About
					</button>
					<button
						onClick={() =>
							document
								.getElementById("contact-section")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="text-white hover:text-blue-400 transition-colors duration-300 font-medium cursor-pointer"
					>
						Contact
					</button>
					<button
						onClick={() =>
							document
								.getElementById("experience-section")
								?.scrollIntoView({ behavior: "smooth" })
						}
						className="text-white hover:text-blue-400 transition-colors duration-300 font-medium cursor-pointer"
					>
						Experience
					</button>
					<button
						onClick={handleResumeClick}
						className="text-white hover:text-blue-400 transition-colors duration-300 font-medium cursor-pointer"
					>
						My Resume
					</button>
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<button
						onClick={onMobileMenuToggle}
						className="text-white hover:text-blue-400 transition-colors duration-300 p-2"
					>
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
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
			</nav>
		</header>
	);
};

const LandingSection = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<section className="relative min-h-screen flex flex-col overflow-hidden">
			{/* Particles Background */}
			<ParticlesBackground />

			{/* Landing Header */}
			<LandingHeader onMobileMenuToggle={toggleMobileMenu} />

			{/* Mobile Menu */}
			<MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

			{/* Content */}
			<div className="relative z-10 flex-1 flex items-center justify-center text-center px-4 md:px-6 max-w-5xl mx-auto">
				<div className="space-y-4 md:space-y-6">
					{/* Main Intro - Hero Text */}
					<div className="space-y-1 md:space-y-2 animate-fade-in-up">
						<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 font-light tracking-wide opacity-0 animate-slide-in-left animation-delay-300">
							Hey there, I'm
						</p>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-bold tracking-tight opacity-0 animate-scale-in animation-delay-600 leading-tight">
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 drop-shadow-2xl hover:brightness-110 transition-all duration-300">
								Hayakkiri
							</span>
						</h1>
					</div>

					{/* Subtitle */}
					<div className="space-y-3 md:space-y-4 opacity-0 animate-fade-in-up animation-delay-900">
						<p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium hover:text-blue-400 transition-colors duration-300 px-2">
							Quality Control & Design Engineer
						</p>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center opacity-0 animate-fade-in-up animation-delay-1800 px-4">
						<button
							onClick={() =>
								document
									.getElementById("contact-section")
									?.scrollIntoView({ behavior: "smooth" })
							}
							className="px-6 sm:px-8 py-3 border-2 cursor-pointer border-white/30 text-white rounded-full font-semibold hover:bg-white/10 hover:border-white/50 transform hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg animate-float animation-delay-200 text-sm sm:text-base"
						>
							Get In Touch
						</button>
					</div>
				</div>
			</div>

			{/* Scroll Indicator - Hidden on mobile */}
			<div className="absolute bottom-12 right-12 z-10 flex-col items-center hidden md:flex">
				{/* Scroll Text */}
				<p className="text-sm text-white/50 font-light tracking-wider uppercase animate-fade-in animation-delay-2000 mb-4">
					Scroll Down
				</p>

				{/* Mouse Icon */}
				<div className="relative animate-bounce mb-3">
					<div className="w-7 h-12 border-2 border-white/40 rounded-full flex justify-center px-1 py-2">
						<div className="w-1.5 h-4 bg-white/60 rounded-full animate-pulse"></div>
					</div>
				</div>

				{/* Arrow Icon */}
				<div className="animate-bounce animation-delay-300 mb-3">
					<svg
						className="w-5 h-5 text-white/50"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
				</div>

				{/* Decorative Dots */}
				<div className="flex space-x-2">
					<div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse"></div>
					<div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse animation-delay-200"></div>
					<div className="w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse animation-delay-400"></div>
				</div>
			</div>
		</section>
	);
};

export default LandingSection;
