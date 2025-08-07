import { useEffect, useState } from "react";
import { useShadesStore } from "../store/shadesStore";
import CodeBlock from "./CodeBlock";

const steps = [900, 800, 700, 600, 500, 400, 300, 200, 100, 50];

export default function GenerateCode() {
    const { shades } = useShadesStore((state) => state);
    const [ code, setCode ] = useState("");
    const exampleCodeOne = `
:root {
    --color-example-900: hsl(100, 50%, 18%);
    --color-example-800: hsl(100, 50%, 26%);
    /* etc */
}
    `;
    const exampleCodeTwo = `
.element {
    background-color: var(--color-example-800);
}
    `;

    useEffect(() => {
        let cssString = "@theme {\n";
        
        shades.forEach((shade) => {
            shade.shades.forEach((color, index) => {
                cssString += `    --color-${shade.name}-${steps[index]}: hsl(${color[0]}, ${color[1]}%, ${color[2]}%);\n`;
            });
        });

        cssString += "}";

        setCode(cssString);
    }, [shades])

    return (
        <section className="flex flex-col md:flex-row justify-center mx-auto gap-8 py-16 px-8 w-full lg:w-3/5 md:w-full md:px-8 sm:w-4/5">
            <div className="w-full">
                <p className="text-base text-text mb-8">Copy the shades below to use them in your Tailwind project.</p>
                <CodeBlock code={code} />
            </div>
            <div className="w-full">
                <p className="text-base text-text mb-8">
                    If you prefer to use regular CSS instead of Tailwind, simply copy the shades and replace the <code>@theme</code> tag with <code>:root</code>. You can then use the colors as CSS variables, like in the example below.
                </p>
                <CodeBlock code={exampleCodeOne} />
                <div className="mb-8"></div>
                <CodeBlock code={exampleCodeTwo} />
            </div>
        </section>
    );
}