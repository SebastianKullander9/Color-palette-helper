import { useShadesStore } from "../store/shadesStore";
import { useColorsStore } from "../store/colorsStore";
import { useProjectNameContext } from "../context/ProjectNameContext";
import { createClient } from "@/utils/supabase/client";
import isEqual from "lodash.isequal";

type Shade = {
	hue: number;
	saturation: number;
	lightness: number;
};

type Color = {
	name: string;
	original_hex: string;
	shades: Shade[];
};

type ProjectData = {
	name: string;
	colors: Color[];
};

export const useLoadProject = () => {
	const supabase = createClient();
	const { shades, setShades } = useShadesStore((state) => state);
	const { setColors, convertToArray } = useColorsStore((state) => state);
	const { setProjectName } = useProjectNameContext();

	const loadProject = async (projectId: string) => {
		if (!projectId) return;

		const { data, error } = await supabase
			.from("projects")
			.select(
				`
                name,
                colors (
                    name,
                    original_hex,
                    shades (
                        hue,
                        saturation,
                        lightness
                    )
                )
            `
			)
			.eq("id", projectId)
			.single<ProjectData>();

		if (error) {
			console.error("Error loading project: ", error);
			return;
		}

		const shadesData = data.colors.map((color) => ({
			name: color.name,
			original_hex: color.original_hex,
			shades: color.shades.map((s) => [s.hue, s.saturation, s.lightness] as [number, number, number]),
		}));

		if (!isEqual(shades, shadesData)) {
			setShades(shadesData);
		}

		let string = "";
		data.colors.map((c) => string += c.original_hex)
		setColors(string);
		convertToArray(string);
		setProjectName(data.name);

        return data.name;
	};

	return { loadProject };
};