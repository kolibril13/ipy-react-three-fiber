import * as React from "react";
import { createRender, useModelState } from "@anywidget/react";
import "./styles.css";

export const render = createRender(() => {
	const [value, setValue] = useModelState("value");
	return (
		<button
			className="ipy_react_three_fiber-counter-button"
			onClick={() => setValue(value + 1)}
		>
			count is {value}
		</button>
	);
});
