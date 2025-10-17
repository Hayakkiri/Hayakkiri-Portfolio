import LandingSection from "../components/LandingSection";
import AboutSection from "../components/AboutSection";
import MyCertifications from "../components/MyCertifications";
import MySkills from "../components/MySkills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import SocialMediaSticky from "../components/SocialMediaSticky";

function Homepage() {
	return (
		<div className="relative">
			<div className="bg-[#0a0a0a] min-h-screen">
				<LandingSection />
			</div>

			<div className="bg-white min-h-screen">
				<AboutSection />
			</div>

			<div className="bg-white min-h-screen">
				<MySkills />
			</div>

			<div className="bg-white min-h-screen">
				<Experience />
			</div>

			<div className="bg-white min-h-screen">
				<MyCertifications />
			</div>

			<div className="bg-white min-h-screen">
				<Contact />
			</div>

			{/* Footer Section */}
			<Footer />

			{/* Social Media Sticky Component */}
			<SocialMediaSticky />
		</div>
	);
}

export default Homepage;
