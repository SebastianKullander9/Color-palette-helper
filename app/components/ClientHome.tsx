"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ColorInput from "../components/ColorInput";
import GenerateShades from "../components/GenerateShades";
import GenerateCode from "../components/GenerateCode";
import { useLoadProject } from "../hooks/useLoadProject";
import IconDark from "../components/IconDark";
import { useColorsStore } from "../store/colorsStore";
import { Element, scroller } from 'react-scroll';
import SideBar from "../components/SideBar";
import NavigatePage from "./NavigatePage";

export default function Home() {
	const [id, setId] = useState("");
	const searchParams = useSearchParams();
	const { colorsArray } = useColorsStore((state) => state);
	const { loadProject } = useLoadProject();
	const [projectNameState, setProjectNameState] = useState("");

	useEffect(() => {
		const projectId = searchParams.get("projectId");

		if (!projectId) return;

		setId(projectId);

		(async () => {
			const projectName = await loadProject(projectId);
			if (projectName) {
				setProjectNameState(projectName);
			}
		})();
	}, [searchParams]);

	const scrollTo = (element: string, offset?: number) => {
		scroller.scrollTo(element, {
			duration: 500,
			smooth: true,
			offset: offset,
		});
	}

	const scrollToShades = () => scrollTo("section2");

	return (
		<main className="w-full">
			<IconDark />
			<SideBar id={id} projectName={projectNameState} scrollToShades={scrollToShades} />
			
			<Element name="section1" className="relative">
				<section className="bg-indigo-50 h-[calc(100vh-100px)] sm:h-[calc(100vh-200px)] flex justify-center items-center">
					<h2 className="sr-only">Color input section</h2>
					<ColorInput scrollToElement={() => scrollTo("section2")} />
					<NavigatePage downTo="section2" scrollTo={scrollTo} />
				</section>
			</Element>
			
			<Element name="section2" className="relative">
				<section className={`min-h-[100vh] bg-background ${colorsArray.length === 0 ? "hidden" : ""}`}>
					<h2 className="sr-only">Shades display</h2>
					<GenerateShades />
					<div className="flex justify-center">	
						<NavigatePage upTo="section1" downTo="section3" scrollOffset={-200} scrollTo={scrollTo} />
					</div>
				</section>
			</Element>
			
			<Element name="section3" className="relative">
				<section className={`min-h-[100vh] bg-gold-50 ${colorsArray.length === 0 ? "hidden" : ""}`}>
					<h2 className="sr-only">Shades in tailwind and css code</h2>
					<GenerateCode />
					<div className="flex justify-center">
						<NavigatePage upTo="section2" scrollTo={scrollTo} />
					</div>
				</section>
			</Element>
			
		</main>
	);
}